import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity,ScrollView,Button,Modal ,TextInput} from 'react-native';
import R from '../R';
import StarRating from '../components/StarRating';
import style from '../Styles';


export default class DetailScreen extends Component {
  
    static navigationOptions=({navigation})=>({
        title:navigation.getParam('productName','Center Cofee Table'),
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    });

    constructor(props){
        super(props)
        this.state={
            itemDetail:[],
            productImages:[],
            modalItemVisible: false,
            modelItemRatingVisible:false,
            itemQuantity:''
            }    
    }

    
    componentDidMount(){
        const id = this.props.navigation.getParam('productId',1)
         
        console.log(`component id :${id}`)
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${id}`)
        .then((response)=>response.json())
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
        
        // console.log(this.state.productImages)
        return(this.state.productImages.map((item)=>
        (
            <TouchableOpacity onPress={()=>{this.setState({bigImage:item.image})}}> 
                <Image source = {{uri:item.image}} style={{width:150,height:150}}></Image>       
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
    
    addItemToCart(productId,quantity){
      
      fetch('http://staging.php-dev.in:8844/trainingapp/api/addToCart',{
        method:'POST',
        headers:{
          //Accept:'application/x-www-form-urlencoded',
          access_token:'5d31b3f1ef96b',
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

    // const lapsList = this.state.productImages.map((item) => {
    //     return (
    //       <View><Image source={{uri : item.image}} style={{width:150,height:150}}></Image></View>
    //     )
    //   } 
       const productId = this.props.navigation.getParam('productId',1)
        return(<View>

                
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalItemVisible}
            onRequestClose={() => {
              ;
            }} >
            {/* <View style={{backgroundColor:R.color.backgroundColorDefault,margin:30,justifyContent:'center',alignItems:'center'}}> */}
              
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor: '#fff', padding: 20,borderRadius:4}}>
                
                <View style={{alignItems:'center'}}>
                <Text>{this.props.navigation.getParam('productName','Center Cofee Table')}</Text>
                </View>
                
                <View style={{borderWidth:2}}>
                <Image source={{uri:this.state.bigImage}} style={{width:350,height:350,borderWidth:4}}></Image>
                </View>

                <View style={{alignItems:'center'}}>
                <TextInput style={{alignItems:'center',justifyContent:'center'}} placeholder='Enter Qty' onChangeText={(itemQuantity)=>this.setState({itemQuantity})}></TextInput>
                </View>

                <View style={style.buttonModalStyle}>
                <TouchableOpacity
                  onPress={() => {
                     this.setModalItemVisible(!this.state.modalItemVisible);
                     this.addItemToCart(productId,this.state.itemQuantity)
                      this.props. navigation.navigate('MyCart')
                  }} >

                <View style={{alignItems:'center'}}>        
                  <Text style={{color:R.color.textInputBorderColor}} >Submit</Text>
                </View>  
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>




          <Modal
           animationType="fade"
           transparent={true}
           visible={this.state.modelItemRatingVisible}
          >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <View style={{backgroundColor: '#fff', padding: 20,borderRadius:4}}>  
                  <Text>
                      {this.props.navigation.getParam('productName','Center Cofee Table')}
                  </Text>

                  <Image source={{uri:this.state.bigImage}} style={{width:350,height:350,borderWidth:4}}></Image>
        
                  <StarRating/>
                 
            <View style={style.buttonModalStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModelItemRatingVisible(!this.state.modelItemRatingVisible);
                  }} >

                  <View style={{alignItems:'center'}}>        
                    <Text style={{color:R.color.textInputBorderColor}} >Submit</Text>
                  </View>  
                </TouchableOpacity>
            </View>

                </View>
                </View>
          </Modal>
        
                <Text> {this.state.itemDetail.name}</Text>
                <Text> {this.state.itemDetail.description}</Text>
                <Text>Rs. {this.state.itemDetail.cost}</Text>
                <Image source={{uri:this.state.bigImage}} style={{width:250,height:250}}></Image>
                <ScrollView horizontal={true}>
                {this.renderProductDetail()}
                </ScrollView>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Button title='BuyNow' onPress={()=>{
                        this.setModalItemVisible(true);
                        }}/>

                    <Button title='Rate' onPress={()=>{
                        this.setModelItemRatingVisible(true);
                        }}/>
       
                </View>
                {/* {lapsList} */}
        </View>) 
    
  }

  
}
