import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import R from '../R';
import style from '../Styles';

const CustomButtonRed =({title,onPress})=> {
    return(

     <TouchableOpacity style={{
        marginHorizontal:20, 
        padding:5,
        borderRadius: 5,
        backgroundColor: R.color.backgroundColorDefault,alignItems:'center'}} onPress={onPress}>
            {/* font_family:"gotham_book" */}
         <Text style={{fontSize:20,padding:5,color:R.color.textInputBorderColor,fontFamily:R.fonts.GothamBlack}}>{title}</Text>
     </TouchableOpacity>
    

 )
 };


export default CustomButtonRed  