import React, { Component } from 'react';
import {View,Text,Image,FlatList,Button,Picker,TouchableOpacity,ActivityIndicator} from 'react-native';
import R from '../R';
import CustomButtonRed from '../components/CustomButtonRed';
import Api from '../components/Api';
import InputSpinner from "react-native-input-spinner";
import CartContext from '../context/CartContext';

export default class CartScreen extends Component{
    
   

    constructor(props){
        super(props)
        this.state={
            itemList:null,
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
            const itemCount = responseJson.count
            
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
        
        return Api('deleteCart','POST',`product_id=${productId}`)
        .then((responseJson)=>{
            console.log(responseJson)
            this.getCartItemsFromApi()
        })  
    }

    

      renderPickerData (itemId,iVal,itemQuantity) {
     
        return (<View key={itemId.toString()}>
          {this.renderPicker(itemId,iVal,itemQuantity)}
        </View>)
      };

      renderPicker(itemId,iVal,itemQuantity){
        return (
        
      <InputSpinner
	    max={10}
	    min={1}
	    step={1}
	    colorMax={"#f04048"}
	    // colorMin={"#40c5f4"}
        value={itemQuantity}
        
	    onChange={(num) => {
        this.setState({['pickValue' + iVal]: num})
        this.editCart(itemId,num)    
		console.log(num);
        
	}}
        style={{marginTop:10}}
        />
        );
      }
      
    //   showAlertWithDelay=()=>{
 
    //     setTimeout(function(){
    //       alert("Alert Shows After 5 Seconds of Delay.")
    //     }, 6000);
     
    //   }
   
    
    render(){  
       
            if(this.state.itemList==null){
            return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size='large' color={R.color.backgroundColorDefault}/>
            {/* {this.showAlertWithDelay()} */}
            </View>
            )
        }
        return(<View style={{flex:1}}>
            {/* style={{marginTop:1}} */}
            <FlatList 
            data={this.state.itemList}
            extraData={ {value : [this.state.pickValue0]} }
            renderItem={({item,index}) => 
            // borderBottomColor: R.color.blackColor,borderBottomWidth: 1,borderTopColor:R.color.blackColor,borderTopWidth:1
                    <View style={{flexDirection:'row',paddingBottom:5,borderColor:R.color.blackColor,borderWidth:1,justifyContent:'space-between',alignItems:'center'}}>

                        <View style={{padding:10}}>
                        <Image source={{uri:item.product.product_images}} style={{width:100,height:100}}></Image>  
                        </View>

                            <View>
                                <Text style={{fontFamily:R.fonts.GothamBlack}}>{item.product.name}</Text>
                                <Text style={{fontFamily:R.fonts.GothamBlack}}>{item.product.product_category}</Text>
                                 {this.renderPickerData(item.product_id,index,item.quantity)}
                            </View>
                            <View style={{marginLeft:40,marginRight:5}}>
                                <CartContext.Consumer>
                                    {contextValue=>(<TouchableOpacity onPress={()=>{this.deleteItem(item.product_id);
                                    contextValue.minusCount();}
                                    }>
                                        <Image source={R.images.delete} style={{width:50,height:50}}></Image>
                                    </TouchableOpacity>)}
                                </CartContext.Consumer>
                               
                                <Text style={{fontFamily:R.fonts.GothamBold}}>Rs{item.product.sub_total}</Text>
                            </View> 
                        
                    </View>
            }
            keyExtractor={(item,index)=>index.toString()}
            >

            </FlatList>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
           
            <Text style={{fontFamily:R.fonts.GothamBold}}>Total</Text>
          
            <Text style={{color:R.color.backgroundColorDefault,fontFamily:R.fonts.GothamBold}}>Rs {this.state.totalAmount}</Text>
            </View>
            
            <CustomButtonRed title="Order Now" onPress={()=>{
                this.props.navigation.navigate('Address')
            }}/>

           

        </View>)
        
    }
}