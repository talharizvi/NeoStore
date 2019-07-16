import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from '../Styles';
import R from '../R'

const CustomButton =({title})=> {
       return(
    <View style={style.buttonStyle}>
        <TouchableOpacity >
            <Text style={{fontSize:30,textAlign:'center',color:R.color.backgroundColorDefault}}>{title}</Text>
        </TouchableOpacity>
       
    </View>
    )
    };
  

export default CustomButton    
