import React, { Component } from 'react';
import {View,Text,Image,FlatList,Button,Picker,TouchableOpacity} from 'react-native';
import R from '../R';
import CustomButtonRed from '../components/CustomButtonRed';
import Api from '../components/Api';


export default class CartScreen extends Component{
    
   

    constructor(props){
        super(props)
        this.state={
            itemList:[],
            pickerValueHolder:'4',
            pickValue0: 1,
            totalAmount:'',
            accessToken:'',
        }
        
    }



    componentDidMount(){
        this.getCartItemsFromApi() 
    }

    getCartItemsFromApi(){
       
        return Api('cart','GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState({itemList:responseJson.data,totalAmount:responseJson.total})
        }).catch((error)=>{
            console.error(error)
        }) 
    }

    editCart(productId,quantity){
        console.log("productId:"+productId)
        console.log("quantity:"+quantity)
       
        return Api('editCart','POST',`product_id=${productId}&quantity=${quantity}`)
        .then((responseJson)=>{
            console.log(responseJson)
            this.getCartItemsFromApi()
        })
       
        
    }

    deleteItem(productId){
        
        return Api('deleteCart','POST',this.state.accessToken,`product_id=${productId}`)
        .then((responseJson)=>{
            console.log(responseJson)
            this.getCartItemsFromApi()
        })
       
         
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
                                <Text style={{fontFamily:"gotham_medium"}}>{item.product.name}</Text>
                                <Text style={{fontFamily:"gotham_medium"}}>{item.product.product_category}</Text>
                    
                                 {this.renderPickerData(item.product_id,index)}
                            </View>
                            <View style={{marginLeft:40,marginRight:5}}>
                                <TouchableOpacity onPress={()=>{
                                    this.deleteItem(item.product_id)
                                }}>
                                    <Image source={R.images.delete} style={{width:50,height:50}}></Image>    
                                </TouchableOpacity>
                                <Text style={{fontFamily:"gotham_medium"}}>Rs{item.product.sub_total}</Text>
                            </View> 
                        
                    </View>
            }
            >

            </FlatList>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
            <Text style={{fontFamily:"gotham_bold"}}>Total</Text>
            <Text style={{color:R.color.backgroundColorDefault,fontFamily:"gotham_bold"}}>Rs {this.state.totalAmount}</Text>
            </View>
            
            <CustomButtonRed title="Order Now" onPress={()=>{
                this.props.navigation.navigate('Address')
            }}/>

           

        </View>)
        
    }
}