import React, { Component } from 'react';
import {View,Text,FlatList,TouchableOpacity,Image} from 'react-native';
import R from '../R';
import style from "../Styles";
import AsyncStorage from '@react-native-community/async-storage';
import Api from './Api';

export default class CustomDrawer extends Component{

   state={
       userName:'Default',
       userEmail:"default@gmail.com",
       cartItemQuantity:0
   }

   componentDidMount(){
    this.getCartCount()
   }

      displayData=async()=>{
      try{
          const value= await AsyncStorage.getItem('user_name')
          const userEmail = await AsyncStorage.getItem('user_email')
          this.setState({
            userName:value,
            userEmail:userEmail
          })
        
    
        }catch(error){
          console.log(error)
        }
    }

    getCartCount(){
        return Api('cart','GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState({cartItemQuantity:responseJson.data.length})
        }).catch((error)=>{
            console.log(error)
        })
    }

    
  clearTokenData=async()=>{
      
    try{
        await AsyncStorage.removeItem("access_token")
        await AsyncStorage.removeItem("user_name")
        await AsyncStorage.removeItem("user_email")
        this.props.navigation.navigate("SessionStack")
    }catch(e){

    }
  }
   

    render(){
        this.displayData()
        return(
            <View style={{flex:1,backgroundColor:R.color.drawerBackground}}>
                <View style={{alignItems:'center', paddingTop:30,}}>
                    <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
                    {/* fontFamily:'gotham_medium' */}
                    <Text style={{color:R.color.textInputBorderColor,fontSize:20,}}>{this.state.userName}</Text>  
                    <Text style={{color:R.color.textInputBorderColor,}}>{this.state.userEmail}</Text>
                </View>

                <FlatList 
            
                   data={[{image:R.images.shopping_cart,title:"My Cart",screen:"MyCart",itemQuantity:this.state.cartItemQuantity},
                            {image:R.images.tables_icon,title:"Tables",screen:"Item",itemId:1,itemType:'Tables'},
                            {image:R.images.sofa_icon,title:"Sofas",screen:"Item",itemId:3,itemType:'Sofas'},
                            {image:R.images.chair_icon,title:"Chairs",screen:"Item",itemId:2,itemType:'Chairs'},
                            {image:R.images.cupboard_icon,title:"Cupboard",screen:"Item",itemId:4,itemType:'Cupboard'},
                            {image:R.images.username_icon,title:"My Account",screen:"MyAccount"},
                            {image:R.images.storelocator_icon,title:"Store Locator",screen:"StoreLocator"},
                            {image:R.images.myorders_icon,title:"My Orders",screen:"MyOrder"},
                            {image:R.images.logout_icon,title:"Logout",screen:''}
                ]}
    
                renderItem={({item})=>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate(item.screen,{productCategoryId:item.itemId,itemCategory:item.itemType})
                    if(item.title=="Logout"){
                        
                         {this.clearTokenData()}   
                    }
                }}>
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                        
                           <Image source={item.image} style={{width:30,height:30,marginLeft:10}}/>
                           {/* fontFamily:'gotham_medium' */}
                           <Text style={{color:R.color.textInputBorderColor,fontSize:20,padding:10,marginLeft:10,}}>{item.title}</Text>
                           <Text style={{color:R.color.textInputBorderColor,marginLeft:80,}}>{item.itemQuantity}</Text> 
                     </View>
                     </TouchableOpacity>
                     }
                >
                </FlatList>
            </View>
        )
    }
    
}
