import React,{Component} from 'react';
import {View,Button,Image,TextInput,Text} from 'react-native';
import R from '../R';
import style from '../Styles';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput'


export default class LoginScreen extends Component{

    static navigationOptions = {
        header: null ,
      };
   
    render(){
        return(
        <View style={ {flex: 1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center", }}>

            <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
          
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='Login'></CustomTextInput>

            <CustomTextInput sourceImage={R.images.password_icon} placeholdeValue='Password'></CustomTextInput>

            <CustomButton title='LOGIN'></CustomButton>


            <Text style={{marginTop:10,color:R.color.textInputBorderColor,fontSize:20}} onPress={()=>{this.props.navigation.navigate('ForgotPassWord')}}>Forgot Password?</Text>
            
            <View style={{flex:1 ,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:140}}>
                <Text style={{color:R.color.textInputBorderColor,fontSize:20}} onPress={()=>{
                    this.props.navigation.navigate('Register')
                }}
                >DONT HAVE Account?</Text>
                <Image source={R.images.Plus}   style={{marginLeft:140,}}></Image>
            </View>


        </View>
        )
    }
}



