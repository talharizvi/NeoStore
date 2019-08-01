import React,{Component} from 'react';
import {View,StyleSheet,Image,Text} from 'react-native';
import style from '../Styles'
import R from '../R'

const CustomText=({sourceImage,textTitle})=>{
    return(
    <View style={style.textInputStyle}>
         <Image style={{justifyContent:'center',marginHorizontal:10} } source={sourceImage}
         />

         <Text style ={{flex:1,fontSize:30,color:R.color.textInputBorderColor,font_family:"gotham_book"}}
         >
             {textTitle}
         </Text>   
    </View>
    )
}

export default CustomText
