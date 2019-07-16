import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput';
import CustonButton from '../components/CustomButton';


export default class ForgotPasswordScreen extends Component {
  
  static navigationOptions={
        
    title:'Forgot Password',
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTintColor:R.color.textInputBorderColor

}

  render() {
    return (
      
         <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center",}}>
     

     <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue='Email'></CustomTextInput>
     
     
     <CustonButton title='OK'/>

   </View>
      
    );
  }
}
