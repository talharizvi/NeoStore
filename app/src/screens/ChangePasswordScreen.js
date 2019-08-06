import React,{Component} from 'react';
import {View,Text,Image,StatusBar} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../components/Api';

export default class ChangePasswordScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            accessToken:'',
            
        }
    }

    

    componentDidMount(){
      
    }

    

    changePassword(oldPassword,newPassword,confirmPassword){
      
        return Api('users/change','POST',`old_password=${oldPassword}&password=${newPassword}&confirm_password=${confirmPassword}`)
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status==200){
                alert(responseJson.message)
            }
          
        }).catch((error)=>{
            console.error(error)
        })
      }
    
    render(){
        return(<View style={{flex:1,backgroundColor:R.color.backgroundColorDefault}}>
            
            <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Old Password' onChangeText={(oldPassword)=>{this.setState({oldPassword})}}/>
            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='New Password' onChangeText={(newPassword)=>{this.setState({newPassword})}}/>
            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Confirm Password' onChangeText={(confirmPassword)=>{this.setState({confirmPassword})}}/> 
            <CustomButton title="Reset Password" onPress={()=>{
                this.changePassword(this.state.oldPassword,this.state.newPassword,this.state.confirmPassword)
            }}/>
           
        </View>)
    }
} 