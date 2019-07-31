import React, { Component } from 'react';
import { View, Text,ScrollView,TouchableOpacity } from 'react-native';
import ItemDetail from '../components/ItemDetail';
import R from '../R';


export default class ItemScreen extends Component {
  
  static navigationOptions=({navigation})=>({
      
    title:navigation.getParam('itemCategory',"Table"),
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTintColor:R.color.textInputBorderColor

})

    state={items:[]}
    
    componentDidMount(){
      
        categoryId=this.props.navigation.getParam("productCategoryId",1)
        return fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${categoryId}`)
            .then((response)=>response.json())
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
       
          <TouchableOpacity key={item.id} onPress={()=>{
            this.props.navigation.navigate('Detail',{productId:item.id,productName:item.name})
            }}>  
           <ItemDetail itemImage={item.product_images} itemName={item.name} itemProducer={item.producer} itemCost={item.cost} itemRating={item.rating} />
           </TouchableOpacity>
     
        )
      )
    }

  render() {
    console.log(this.state)
    return(
      <ScrollView>
       
        {this.renderItems()}
      </ScrollView>
    )
  }
}
