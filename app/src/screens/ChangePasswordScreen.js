import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';

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

    static navigationOptions={
        
        title:'ChangePassword',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    
    }

    componentDidMount(){
        this.getAccessTokenData()
    }

    getAccessTokenData=async()=>{
        try{
            let accessToken = await AsyncStorage.getItem('access_token')
            this.setState({accessToken:accessToken})
            console.log(accessToken)
               
          }catch(error){
            console.log(error)
          }
    }

    changePassword(oldPassword,newPassword,confirmPassword){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/change',{
          method:'POST',
          headers:{
            access_token:this.state.accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
          },body:`old_password=${oldPassword}&password=${newPassword}&confirm_password=${confirmPassword}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status==200){
                alert(responseJson.message)
            }
          
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