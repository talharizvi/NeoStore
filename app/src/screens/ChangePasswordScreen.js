import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';

export default class ChangePasswordScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            oldPassword:'',
            newPassword:'',
            confirmPassword:''
        }
    }

    static navigationOptions={
        
        title:'ChangePassword',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    
    }

    changePassword(oldPassword,newPassword,confirmPassword){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/change',{
          method:'POST',
          headers:{
            access_token:'5d31b3f1ef96b',
            'Content-Type': 'application/x-www-form-urlencoded',
          },body:`old_password=${oldPassword}&password=${newPassword}&confirm_password=${confirmPassword}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson)
        })
      }
    
    render(){
        return(<View style={{flex:1,backgroundColor:R.color.backgroundColorDefault}}>
            
           
            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Old Password' onChangeText={(oldPassword)=>{this.setState({oldPassword})}}/>
            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='New Password' onChangeText={(newPassword)=>{this.setState({newPassword})}}/>
            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Confirm Password' onChangeText={(confirmPassword)=>{this.setState({confirmPassword})}}/> 
            <CustomButton title="Reset Password" onPress={()=>{
                this.changePassword(this.state.oldPassword,this.state.newPassword,this.state.confirmPassword)
            }}/>
           
        </View>)
    }
} 