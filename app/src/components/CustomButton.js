import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import style from '../Styles';
import R from '../R'

const CustomButton =({title})=> {
       return(
   
        <TouchableOpacity style={style.buttonStyle}>
            <Text style={{fontSize:30,textAlign:'center',color:R.color.backgroundColorDefault}}>{title}</Text>
        </TouchableOpacity>
       
   
    )
    };
  

export default CustomButton    
