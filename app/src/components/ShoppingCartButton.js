
import React from 'react';
import { View, Image,TouchableOpacity} from 'react-native';
import R from '../R'


const ShoppingCartButton =({onPress})=> {
       return(
            <TouchableOpacity onPress={onPress}>
            <Image source={R.images.header_shopping_cart} style={{width:20,height:20,marginRight:10}} />
            </TouchableOpacity>
    )
    };
  

export default ShoppingCartButton    
