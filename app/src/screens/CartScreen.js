import React, { Component } from 'react';
import {View,Text,Image,FlatList,Button,Picker,TouchableOpacity} from 'react-native';
import R from '../R';
import CustomButton from '../components/CustomButton';
import CustomButtonRed from '../components/CustomButtonRed';



export default class CartScreen extends Component{
    
    static navigationOptions={
        
        title:'My Cart',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    }

    state={
        itemList:[],
        pickerValueHolder:'4',
        pickValue0: 1,
        totalAmount:'',
       
    }


    componentDidMount(){
      
        this.getCartItemsFromApi()

    }

    getCartItemsFromApi(){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/cart',{
            method:'GET',
            headers:{
                access_token:'5d31b3f1ef96b',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState({itemList:responseJson.data,totalAmount:responseJson.total})
        }) 
    }

    editCart(productId,quantity){
        console.log("productId:"+productId)
        console.log("quantity:"+quantity)
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
       
        this.getCartItemsFromApi()
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
       
         this.getCartItemsFromApi()
    }

    

      renderPickerData (itemId,iVal) {
     
        return (<View key={iVal.toString()}>
          {this.renderPicker(itemId,iVal)}
        </View>)
      };

      renderPicker(itemId,iVal){
        return (
        <Picker style={{ width: 100,
            height: 40}} 
            selectedValue={this.state['pickValue' + iVal]
        } 
            onValueChange={(value) => {this.setState({['pickValue' + iVal]: value})
            console.log("selected value"+value)
            console.log("itemid:"+itemId)
            
            this.editCart(itemId,value)
        
        }
        }>
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item  label="4" value={4} />
          <Picker.Item  label="5" value={5} />
          <Picker.Item  label="6" value={6} />
        </Picker>);
      }  
   
    
    render(){  
        
        return(<View style={{flex:1}}>
            <FlatList 
            data={this.state.itemList}
            extraData={ {value : [this.state.pickValue0]} }
            renderItem={({item,index}) => 
                    <View style={{flexDirection:'row',paddingBottom:5,borderBottomColor: R.color.blackColor,borderBottomWidth: 1,justifyContent:'space-between',alignItems:'center'}}>

                        <View style={{padding:10}}>
                        <Image source={{uri:item.product.product_images}} style={{width:100,height:100}}></Image>  
                        </View>

                            <View>
                                <Text>{item.product.name}</Text>
                                <Text>{item.product.product_category}</Text>
                    
                                 {this.renderPickerData(item.product_id,index)}
                            </View>
                            <View style={{marginLeft:40,marginRight:5}}>
                                <TouchableOpacity onPress={()=>{
                                    this.deleteItem(item.product_id)
                                }}>
                                    <Image source={R.images.delete} style={{width:50,height:50}}></Image>    
                                </TouchableOpacity>
                                <Text>Rs{item.product.sub_total}</Text>
                            </View> 
                        
                    </View>
            }
            >

            </FlatList>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
            <Text>Total</Text>
            <Text style={{color:R.color.backgroundColorDefault}}>Rs {this.state.totalAmount}</Text>
            </View>
            
            <CustomButtonRed title="Order Now" onPress={()=>{
                this.props.navigation.navigate('Address')
            }}/>

           

        </View>)
        
    }
}