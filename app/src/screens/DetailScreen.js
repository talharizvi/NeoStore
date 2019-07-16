import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from '../R';


export default class DetailScreen extends Component {
  
    static navigationOptions={
        
        title:'Detail',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    
    }

    state={itemDetail:[]}
    id = 0
    
    componentDidMount(){
        
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${this.id}`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                itemDetail:responseJson.data
                
            })
        })
        .catch((error)=>{
            console.error(error)
        })

    }

    
    renderProductDetail(){
        this.state.itemDetail.map(item=>{
            return(<View>
                <Text> DetailScreen: {item.name} </Text>
            </View>)   
        });
    }

  render() {

        id = this.props.navigation.getParam('productId',0)  


        
 
    
  }
}
