import React, { Component } from 'react';
import {View,Text,Image,FlatList,Button} from 'react-native';
import R from '../R';
import CustomButton from '../components/CustomButton';


export default class CartScreen extends Component{
    
    static navigationOptions={
        
        title:'My Cart',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    }

    state={
        itemList:[]
    }

    componentDidMount(){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/cart',{
            method:'GET',
            headers:{
                access_token:'5d31b3f1ef96b',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState({itemList:responseJson.data})
        })

    }

    editCart(productId,quantity){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/editCart',{
            method:'POST',
            headers:{
                access_token:'5d31b3f1ef96b',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 
                `product_id=${productId}&quantity=${quantity}`    

        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
        })
        this.componentDidMount()
    }

    deleteItem(productId){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/deleteCart',{
            method:'POST',
            headers:{
                access_token:'5d31b3f1ef96b',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
        })
        this.componentDidMount()
    }
   
    
    render(){  
        
        return(<View style={{flex:1}}>
            <FlatList
            data={this.state.itemList}
            renderItem={({item}) => 
                    <View style={{flexDirection:'row',paddingBottom:5,borderBottomColor: R.color.blackColor,borderBottomWidth: 1}}>

                        <View style={{padding:10}}>
                        <Image source={{uri:item.product.product_images}} style={{width:100,height:100}}></Image>  
                        </View>

                        <View style={{paddingLeft:10}}>
                        <Text>{item.product.name}</Text>
                        <Text>{item.product.product_category}</Text>
                        <Text>{item.quantity}</Text>
                        <Text>{item.product.sub_total}</Text>
                        {/* editCart(item.product_id,1)          */}
                        <Button title="Edit" onPress={()=>{this.editCart(item.product_id,1)}}></Button>
                        <Button title="Delete" onPress={()=>{this.deleteItem(item.product_id)}}></Button>    
                        </View>
                        
                        
                    </View>
            }
            >

            </FlatList>
          
           
            <Button title="Order Now" onPress={()=>{
                this.props.navigation.navigate('Address')
            }}/>

        </View>)
        
    }
}