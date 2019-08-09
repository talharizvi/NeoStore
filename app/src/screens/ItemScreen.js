import React, { Component } from 'react';
import { View, Text,ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import ItemDetail from '../components/ItemDetail';
import R from '../R';
import Api from '../components/Api';


export default class ItemScreen extends Component {
  
  static navigationOptions=({navigation})=>({
      
    title:navigation.getParam('itemCategory',"Table"),
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTitleStyle:{
      fontSize: 20,
      color:R.color.textInputBorderColor,
      // fontFamily: 'gotham_medium' 
    },
})

    constructor(){
      super()
      this.state={
        items:[],
      }
    }

    
    
    componentDidMount(){
      
        categoryId=this.props.navigation.getParam("productCategoryId",1)
        Api(`products/getList?product_category_id=${categoryId}`,'GET',null)    
        .then((responseJson)=>{
                this.setState({
                  items : responseJson.data
                })    
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    renderItems(){
      return(
        
        this.state.items.map((item)=>
       
          <TouchableOpacity key={item.name} onPress={()=>{
            this.props.navigation.navigate('Detail',{productId:item.id,productName:item.name})
            }}>    
           <ItemDetail itemImage={item.product_images} itemName={item.name} itemProducer={item.producer} itemCost={item.cost} itemRating={item.rating} />
           </TouchableOpacity>
          
        )
        )      
    }


  render() {
    
    if(this.state.items.length==0){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size='large' color={R.color.backgroundColorDefault}/>
        </View>
      )
    }

    return(
    
      <ScrollView 
      >

        {this.renderItems()}
        
      </ScrollView>
     
    )
    }
  
}
