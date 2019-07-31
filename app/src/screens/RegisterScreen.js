import React, { Component } from 'react';
import { View, Text, Image,TouchableOpacity} from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput';
import CustonButton from '../components/CustomButton';

import AsyncStorage from '@react-native-community/async-storage';


export default class RegisterScreen extends Component {
  

    static navigationOptions={
        
        title:'Register',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor

    }

    state={
      isSelected:true,
      isChecked:false,
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmPassword:'',
      gender:'M',
      phoneNo:123
    }
     
    registerUser(firstName,lastName,email,password,confirmPassword,gender,phoneNo){
      fetch('http://staging.php-dev.in:8844/trainingapp/api/users/register',{
        method:'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          `first_name=${firstName}&last_name=${lastName}&email=${email}&password=${password}&confirm_password=${confirmPassword}&gender=${gender}&phone_no=${phoneNo}`
      }).then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson)
        const msg = responseJson.message
        alert(msg)
      })
    }

  render() {
    var imageSourceMale = this.state.isSelected? R.images.chky:R.images.chkn ;
    var imageSourceFemale = this.state.isSelected? R.images.chkn:R.images.chky ;
    var imageSourceCheckBox = this.state.isChecked?R.images.checked_icon:R.images.uncheck_icon; 
    return (
      <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center",}}>
     
        <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='First Name' onChangeText={(firstName)=>this.setState({firstName})}></CustomTextInput>
        <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='Last Name'  onChangeText={(lastName)=>this.setState({lastName})}></CustomTextInput>
        <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue='Email' onChangeText={(email)=>this.setState({email})}></CustomTextInput>
        <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Password' onChangeText={(password)=>this.setState({password})}></CustomTextInput>
        <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='Confirm Password' onChangeText={(confirmPassword)=>this.setState({confirmPassword})}></CustomTextInput>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:25,color:R.color.textInputBorderColor}} >Gender</Text>
            <View style={{flexDirection:'row',alignItems:'center',marginLeft:20,marginRight:20}}>
              <TouchableOpacity onPress={()=>{
                if(this.state.isSelected){
                  this.setState({isSelected:false,gender:'F'})
                  
                }else{
                  this.setState({isSelected:true,gender:'M'})
                }
              }}>
                <Image source={imageSourceMale} style={{width:20,height:20,marginRight:5}}></Image>
              </TouchableOpacity>
              <Text style={{fontSize:20,color:R.color.textInputBorderColor}}>Male</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{
                if(this.state.isSelected){
                  this.setState({isSelected:false,gender:'F'})
                }else{
                  this.setState({isSelected:true,gender:'M'})
                }
              }}>
                <Image source={imageSourceFemale} style={{width:20,height:20,marginRight:5}}></Image>
                </TouchableOpacity>
                <Text style={{fontSize:20,color:R.color.textInputBorderColor}}>Female</Text>
              
            </View>

        </View>
        <CustomTextInput sourceImage={R.images.cellphone} placeholdeValue='Phone Number' onChangeText={(phoneNo)=>this.setState({phoneNo})}></CustomTextInput>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{
              if(this.state.isChecked){
                this.setState({isChecked:false})
              }else{
                this.setState({isChecked:true})
              }
            }}>
              <Image source={imageSourceCheckBox}></Image>
            </TouchableOpacity>
              <Text style={{fontSize:20,marginLeft:20,color:R.color.textInputBorderColor}}>I agree the Terms & Conditions</Text>
        </View>
        <CustonButton title='REGISTER' onPress={()=>{
            
         this.registerUser(this.state.firstName,this.state.lastName,this.state.email,this.state.password,this.state.confirmPassword,this.state.gender,this.state.phoneNo)
        }}/>

      </View>
    );
  }
}