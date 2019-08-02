import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity,ScrollView,Button,Modal ,TextInput} from 'react-native';
import R from '../R';
import StarRating from '../components/StarRating';
import style from '../Styles';
import StarFilled from '../components/StarFilled';
import StarUnfilled from '../components/StarUnfilled';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../components/Api';

export default class DetailScreen extends Component {
  
    static navigationOptions=({navigation})=>({
        title:navigation.getParam('productName','Center Cofee Table'),
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTitleStyle:{
          fontSize: 20,
          color:R.color.textInputBorderColor,
          fontFamily: 'gotham_medium' 
        },
    });

    constructor(props){
        super(props)
        this.state={
            itemDetail:[],
            productImages:[],
            modalItemVisible: false,
            modelItemRatingVisible:false,
            itemQuantity:'',
            accessToken:''
            }    
    }

    
    componentDidMount(){

        this.getAccessTokenData()
        const id = this.props.navigation.getParam('productId',1)
         
        console.log(`component id :${id}`)
        // fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${id}`)
        // .then((response)=>response.json())
        Api(`products/getDetail?product_id=${id}`,'GET',null,null)
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState({
                itemDetail: responseJson.data,
                productImages:responseJson.data.product_images,
                bigImage:responseJson.data.product_images[0].image
            })
        })
        .catch((error)=>{
            console.error(error)
        })

    }

   

    renderProductDetail(){
        return(this.state.productImages.map((item)=>
        (
            <TouchableOpacity key={item.id} onPress={()=>{this.setState({bigImage:item.image})}}> 
                <Image source = {{uri:item.image}} style={{width:180,height:120,margin:10}}></Image>       
            </TouchableOpacity> 
        )
        )) 
        
    }

    setModalItemVisible(visible) {
        this.setState({modalItemVisible: visible});
      }
    
    setModelItemRatingVisible(visible){
        this.setState({modelItemRatingVisible:visible});
    }
    
    getAccessTokenData=async()=>{
      try{
          let accessToken = await AsyncStorage.getItem('access_token')
          this.setState({accessToken:accessToken})
          console.log(accessToken)
             
        }catch(error){
          console.log(error)
        }
  }
    
    addItemToCart(productId,quantity){
      
      fetch('http://staging.php-dev.in:8844/trainingapp/api/addToCart',{
        method:'POST',
        headers:{
          access_token:this.state.accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          `product_id=${productId}&quantity=${quantity}`
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson)
      
      })
    }

  render() {

       const productId = this.props.navigation.getParam('productId',1)
        return(
        <View style={{flex:1}}>
          <ScrollView style={{flex:1}}>    
             <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalItemVisible}
              onRequestClose={() => {
              this.setModalItemVisible(false)
            }} 
            >
              
                <TouchableOpacity 
                  style={{flex:1}} 
                  activeOpacity={1} 
                  onPressOut={() => {this.setModalItemVisible(false)}}
                > 
              
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor: '#fff', padding: 20,borderRadius:4}}>
                
                      <View style={{alignItems:'center'}}>
                        <Text style={{fontFamily:'gotham_medium'}}>{this.props.navigation.getParam('productName','Center Cofee Table')}</Text>
                      </View>
                
                  <View style={{borderWidth:2}}>
                    <Image source={{uri:this.state.bigImage}} style={{width:350,height:350,borderWidth:4}}></Image>
                  </View>

                  <View style={{alignItems:'center'}}>
                    <TextInput style={{alignItems:'center',justifyContent:'center',fontFamily:"gotham_book"}} placeholder='Enter Qty' onChangeText={(itemQuantity)=>this.setState({itemQuantity})} ></TextInput>
                  </View>

                  <View style={style.buttonModalStyle}>
                    <TouchableOpacity
                     onPress={() => {
                     this.setModalItemVisible(!this.state.modalItemVisible);
                     this.addItemToCart(productId,this.state.itemQuantity)
                     this.props. navigation.navigate('Home')
                  }} >

                      <View style={{alignItems:'center'}}>        
                      <Text style={{color:R.color.textInputBorderColor,fontFamily:"gotham_book"}} >Submit</Text>
                      </View>  
                    </TouchableOpacity>
                  </View>
                  </View>
                  </View>
                </TouchableOpacity>
              </Modal>

              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modelItemRatingVisible}
              >
                <TouchableOpacity 
                  style={{flex:1}} 
                  activeOpacity={1} 
                  onPressOut={() => {this.setModelItemRatingVisible(false)}}
                > 
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <View style={{backgroundColor: '#fff', padding: 20,borderRadius:4}}>  
                  <Text style={{fontFamily:'gotham_medium'}}>
                      {this.props.navigation.getParam('productName','Center Cofee Table')}
                  </Text>

                  <Image source={{uri:this.state.bigImage}} style={{width:350,height:350,borderWidth:4}}></Image>
        
                  <StarRating productId={this.state.itemDetail.id}/>
                 
                  <View style={style.buttonModalStyle}>
                    <TouchableOpacity
                      onPress={() => {
                      this.setModelItemRatingVisible(!this.state.modelItemRatingVisible);
                  }} >

                      <View style={{alignItems:'center'}}>        
                      <Text style={{color:R.color.textInputBorderColor,fontFamily:"gotham_book"}} >Submit</Text>
                      </View>  
                    </TouchableOpacity>
                  </View>

                  </View>
                  </View>
                </TouchableOpacity>
              </Modal>
        
              <Text style={{fontFamily:'gotham_medium',fontSize:20}}> {this.state.itemDetail.name}</Text>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontFamily:'gotham_medium',marginLeft:20}}> {this.state.itemDetail.producer}</Text>
                <View style={{flexDirection:'row'}}>{renderRating(this.state.itemDetail.rating)}</View>
              </View>  
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:R.color.backgroundColorDefault,marginLeft:20,fontFamily:'gotham_bold'}}>Rs. {this.state.itemDetail.cost}</Text>
                <Image source={R.images.share} style={{width:20,height:20,marginRight:20}}></Image>
              </View>
                
              <View style={{alignItems:'center'}}>
                <Image source={{uri:this.state.bigImage}} style={{width:350,height:250}}></Image>
              </View>
                
              <ScrollView horizontal={true}>
                {this.renderProductDetail()}
              </ScrollView>
              <Text style={{fontFamily:'gotham_bold',fontSize:15}}>Description :</Text>
              <Text style={{fontFamily:'gotham_medium'}}> {this.state.itemDetail.description}</Text>
                
          </ScrollView>
          {/* for horizontal buttons    */}
          <View style={{flexDirection:'row',justifyContent:'center',height:20,marginBottom:20}}>
              <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                  <TouchableOpacity style={{backgroundColor:R.color.backgroundColorDefault,justifyContent: 'center',borderRadius: 5,marginRight:10,alignItems:'center',paddingVertical:10}} onPress={()=>{
                     this.setModalItemVisible(true)
                  }}>
                     <Text style={{fontSize:20,color:R.color.textInputBorderColor,fontFamily:'gotham_medium'}}>Buy Now</Text>
                  </TouchableOpacity>
             </View>
             <View style={{flex:1,justifyContent:'center',marginRight:10}}>
                  <TouchableOpacity style={{backgroundColor:"#bfbfbf",justifyContent: 'center',borderRadius: 5,marginLeft:10,alignItems:'center',paddingVertical:10}} onPress={()=>{
                      this.setModelItemRatingVisible(true)
                  }}>
                  <Text style={{fontSize:20,color:R.color.drawerBackground,fontFamily:'gotham_medium'}}>Rate</Text>
                  </TouchableOpacity>
             </View>
          </View>
               
        </View>) 
    
  }

  
}

function renderRating(count){
  var elements=[]    
  for(i=0;i<count;i++){
      elements.push(<StarFilled/>)         
  }

  for(j=count;j<5;j++){
      elements.push(<StarUnfilled/>)      
  } 
  
  return(
      elements.map((item)=>{
          return(
          <View >
          {item}
          </View>
              )
      }) 
      
  )
  
}
