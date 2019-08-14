import React,{Component} from 'react';
import {View,StyleSheet,Image,TextInput} from 'react-native';
import style from '../Styles'
import R from '../R'

const CustomTextInputSecure=({sourceImage,placeholdeValue,onChangeText})=>{
    return(
    <View style={style.textInputStyle}>
         <Image style={{justifyContent:'center',marginHorizontal:10} } source={sourceImage}
         />
{/* fontFamily:"gotham_book" */}
         <TextInput style ={{flex:1,fontSize:30,color:R.color.textInputBorderColor,fontFamily:R.fonts.GothamBlack}} underlineColorAndroid={"transparent"} placeholderTextColor={R.color.textInputBorderColor} placeholder={placeholdeValue}
            onChangeText={onChangeText} 
            secureTextEntry={true}
         >

         </TextInput>   
    </View>
    )
}



export default CustomTextInputSecure