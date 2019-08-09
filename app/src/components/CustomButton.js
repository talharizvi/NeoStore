import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import style from '../Styles';
import R from '../R'

const CustomButton =({title,onPress})=> {
       return(
   
        <TouchableOpacity style={style.buttonStyle} onPress={onPress}>
            {/* fontFamily:"gotham_medium" */}
            <Text style={{fontSize:30,textAlign:'center',color:R.color.backgroundColorDefault,}}>{title}</Text>
        </TouchableOpacity>
       
   
    )
    };
  

export default CustomButton    
