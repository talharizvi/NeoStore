import React,{Component} from 'react';
import {View,StyleSheet,Image,TextInput} from 'react-native';
import style from '../Styles'
import R from '../R'

const CustomTextInput=({sourceImage,placeholdeValue})=>{
    return(
    <View style={style.textInputStyle}>
         <Image style={{justifyContent:'center',marginHorizontal:10} } source={sourceImage}
         />

         <TextInput style ={{flex:1,fontSize:30}} placeholderTextColor={R.color.textInputBorderColor} placeholder={placeholdeValue}
         >

         </TextInput>   
    </View>
    )
}



export default CustomTextInput