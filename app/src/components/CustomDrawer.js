import React, { Component } from 'react';
import {View,Text,FlatList,TouchableOpacity,Image} from 'react-native';
import R from '../R';
import style from "../Styles";

export default class CustomDrawer extends Component{
    render(){
        return(
            <View>
                <View style={{alignItems:'center', paddingTop:30,}}>
                    <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
                    <Text>UserName</Text>
                    <Text>user@gmail.com</Text>
                </View>

                <FlatList style={{backgroundColor:R.color.blackColor}}
            
                   data={[{image:R.images.shopping_cart,title:"My Cart",screen:"MyCart"},
                            {image:R.images.tables_icon,title:"Tables",screen:"Tables"},
                            {image:R.images.sofa_icon,title:"Sofas",screen:"Sofa"},
                            {image:R.images.chair_icon,title:"Chairs",screen:"Chair"},
                            {image:R.images.cupboard_icon,title:"Cupboard",screen:"Cupboard"},
                            {image:R.images.username_icon,title:"My Account",screen:"MyAccount"},
                            {image:R.images.storelocator_icon,title:"Store Locator",screen:"StoreLocator"},
                            {image:R.images.myorders_icon,title:"My Orders",screen:"MyOrder"},
                ]}
    
                renderItem={({item})=>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate(item.screen)}}>
                    <View style={{flexDirection:"row"}}>
                        
                           <Image source={item.image}/>
                           <Text style={{color:R.color.textInputBorderColor}}>{item.title}</Text> 
                     </View>
                     </TouchableOpacity>
                     }
                >
                </FlatList>
            </View>
        )
    }
    
}
