import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput';
import CustonButton from '../components/CustomButton';


export default class RegisterScreen extends Component {
  

    static navigationOptions={
        
        title:'Register',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor

    }

  render() {
    return (
      <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center",}}>
     
        <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='First Name'></CustomTextInput>
        <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='Last Name'></CustomTextInput>
        <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue='Email'></CustomTextInput>
        <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Password'></CustomTextInput>
        <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='Confirm Password'></CustomTextInput>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20}}>Gender</Text>
            <View style={{flexDirection:'row'}}>
              <Image source={R.images.chkn} style={{width:20,height:20}}></Image>
              <Text style={{fontSize:20}}>Male</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Image source={R.images.chky} style={{width:20,height:20}}></Image>
              <Text style={{fontSize:20}}>Female</Text>
            </View>

        </View>
        <CustomTextInput sourceImage={R.images.cellphone} placeholdeValue='Phone Number'></CustomTextInput>
        <CustonButton title='REGISTER'/>

      </View>
    );
  }
}
