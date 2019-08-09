import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput';
import CustonButton from '../components/CustomButton';
import Api from '../components/Api';


export default class ForgotPasswordScreen extends Component {
  
  static navigationOptions={
        
    title:'Forgot Password',
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTitleStyle:{
      fontSize: 20,
      color:R.color.textInputBorderColor,
      // fontFamily: 'gotham_medium' 
    },

}

  state={
    email:''
  }

  forgotPassword(email){
    return Api('users/forgot','POST',`email=${email}`)
    .then((responseJson)=>{
      console.log(responseJson)
    })
  }

  render() {
    return (
      
         <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center",}}>
     

     <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue='Email' onChangeText={(email)=>{this.setState({email})}}></CustomTextInput>
     
     
     <CustonButton title='OK' onPress={()=>{
       this.forgotPassword(this.state.email)
     }}/>

   </View>
      
    );
  }
}
