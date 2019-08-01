import React,{Component} from 'react';
import {View,StyleSheet,Image,TextInput} from 'react-native';
import style from '../Styles'
import R from '../R'

const CustomTextInput=({sourceImage,placeholdeValue,onChangeText})=>{
    return(
    <View style={style.textInputStyle}>
         <Image style={{justifyContent:'center',marginHorizontal:10} } source={sourceImage}
         />

         <TextInput style ={{flex:1,fontSize:30,color:R.color.textInputBorderColor,fontFamily:"gotham_book"}} underlineColorAndroid={"transparent"} placeholderTextColor={R.color.textInputBorderColor} placeholder={placeholdeValue}
            onChangeText={onChangeText} 
         >

         </TextInput>   
    </View>
    )
}



export default CustomTextInput