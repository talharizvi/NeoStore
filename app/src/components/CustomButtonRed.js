import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import R from '../R';
import style from '../Styles';

const CustomButtonRed =({title})=> {
    return(

     <TouchableOpacity style={style.buttonRedStyle}>
         <Text style={{fontSize:20,textAlign:'center',color:R.color.textInputBorderColor}}>{title}</Text>
     </TouchableOpacity>
    

 )
 };


export default CustomButtonRed  