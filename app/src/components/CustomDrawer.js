import React, { Component } from 'react';
import {View,Text,FlatList,TouchableOpacity,Image,SafeAreaView} from 'react-native';
import R from '../R';
import style from "../Styles";
import AsyncStorage from '@react-native-community/async-storage';
import Api from './Api';
import CartContext from '../context/CartContext';

export default class CustomDrawer extends Component{

   state={
       userName:'Default',
       userEmail:"default@gmail.com",
      
   }

   componentDidMount(){
    this.displayData()
   }

      displayData=async()=>{
      try{
          const value= await AsyncStorage.getItem('user_name')
          const userEmail = await AsyncStorage.getItem('user_email')
          console.log("asyncValue"+value+userEmail)
          this.setState({
            userName:value,
            userEmail:userEmail
          })
        console.log(this.state.userName+this.state.userEmail)
    
        }catch(error){
          console.log(error)
        }
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

  displayCount(count){
     
    if(count==1){
        return( <CartContext.Consumer>
            {contextValue=> <Text style={{color:R.color.textInputBorderColor,marginLeft:80,fontFamily:R.fonts.GothamBlack}}>{contextValue.state.count}</Text> }
        </CartContext.Consumer>)
    }else{

    }
  }
   

    render(){
     
        return(
            <SafeAreaView style={{flex:1,backgroundColor:R.color.drawerBackground}}>
                <View style={{alignItems:'center', paddingTop:30,}}>
                    
                    <CartContext.Consumer>
                               {contextValue=> <View style={{justifyContent:'center',alignItems:'center'}}>
                               <Image source={{uri:contextValue.state.profilePic}} style={style.roundImageStyle}></Image>
                                   <Text style={{color:R.color.textInputBorderColor,fontSize:20,fontFamily:R.fonts.GothamBlack}}>{contextValue.state.userName}</Text>
                                               <Text style={{color:R.color.textInputBorderColor,fontSize:20,fontFamily:R.fonts.GothamBlack}}>{contextValue.state.userEmail}</Text> 
                                               </View>
                               }
                           </CartContext.Consumer>
         
                </View>


                <FlatList 
                   data={[{image:R.images.shopping_cart,title:"My Cart",screen:"MyCart",cartCount:1},
                            {image:R.images.tables_icon,title:"Tables",screen:"Item",itemId:1,itemType:'Tables',cartCount:0},
                            {image:R.images.sofa_icon,title:"Sofas",screen:"Item",itemId:3,itemType:'Sofas',cartCount:0},
                            {image:R.images.chair_icon,title:"Chairs",screen:"Item",itemId:2,itemType:'Chairs',cartCount:0},
                            {image:R.images.cupboard_icon,title:"Cupboard",screen:"Item",itemId:4,itemType:'Cupboard',cartCount:0},
                            {image:R.images.username_icon,title:"My Account",screen:"MyAccount",cartCount:0},
                            {image:R.images.storelocator_icon,title:"Store Locator",screen:"StoreLocator",cartCount:0},
                            {image:R.images.myorders_icon,title:"My Orders",screen:"MyOrder",cartCount:0},
                            {image:R.images.logout_icon,title:"Logout",screen:'',cartCount:0}
                ]}
    
                renderItem={({item})=>
                
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate(item.screen,{productCategoryId:item.itemId,itemCategory:item.itemType})
                    if(item.title=="Logout"){
                         {this.clearTokenData()}
                    }
        
                }}>
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                           <Image source={item.image} style={{width:30,height:30,marginLeft:10}}/>
                           <Text style={{color:R.color.textInputBorderColor,fontSize:20,padding:10,marginLeft:10,fontFamily:R.fonts.GothamBlack}}>{item.title}</Text>
                            {this.displayCount(item.cartCount)}
                     </View>
                     </TouchableOpacity>
                     }
                >
                </FlatList>
                
            </SafeAreaView>
        )
    }
    
}
