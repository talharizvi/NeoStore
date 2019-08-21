import React,{Component} from 'react';
import {View,Button,Image,TextInput,Text,ActivityIndicator,ScrollView} from 'react-native';
import R from '../R';
import style from '../Styles';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import CustomTextInputSecure from '../components/CustomTextInputSecure';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../components/Api';

export default class LoginScreen extends Component{

    static navigationOptions = {
        header: null ,
      };

      constructor(){
        super()
        this.state={  
            userName:'',
            password:'',
            showIndicator: false,
          }
      }
 
      
    loginUser(userName,password){
        // fetch('http://staging.php-dev.in:8844/trainingapp/api/users/login',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //       },
        //     body:`email=${userName}&password=${password}`  
        // }).then((response)=>response.json())
        return Api('users/login','POST',`email=${userName}&password=${password}`)
        .then((responseJson)=>{
            console.log(responseJson)
           
            let status = responseJson.status
            this.setState({showIndicator: !this.state.showIndicator})
                if(status==200){
                    let accessToken = responseJson.data.access_token
                    let userEmail = responseJson.data.email
                    let fName = responseJson.data.first_name
                    let lName = responseJson.data.last_name
                    let userName = fName+lName
                    console.log("username from login "+userName)
                    this.multiSet(userName,userEmail,accessToken)
                    this.props.navigation.navigate("HomeStack")
                   
                }else if(status==401){
                    setTimeout(()=>{
                        this.setState({showIndicator: false})
                    },1000)
                    alert(responseJson.message)
                }
                console.log(accessToken)
    
        })
    }

   

    multiSet = async(userName,email,accessToken)=>{
        const name = ["user_name",userName]
        const userEmail = ["user_email",email]
        const aToken=["access_token",accessToken]
       
        try{
            await AsyncStorage.multiSet([name,userEmail,aToken])
        }catch(e){

        }
        
    }
  
   
    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:R.color.backgroundColorDefault}}>
                <View style={ {flex: 1,alignItems: "center", }}>
                    <Text style={[style.headerTitleStyle]}>{R.strings.AppName}</Text>
                    <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='UserName' onChangeText={(userName)=>{this.setState({userName})}}/>
                    <CustomTextInputSecure sourceImage={R.images.password_icon} placeholdeValue='Password' onChangeText={(password)=>{this.setState({password})}}/>
                    <CustomButton title='LOGIN' onPress={()=>{               
                        this.loginUser(this.state.userName,this.state.password)
                    }}/>
                    <Text style={{marginTop:10,color:R.color.textInputBorderColor,fontSize:20,fontFamily:R.fonts.GothamBlack}} onPress={()=>{this.props.navigation.navigate('ForgotPassWord')}}>Forgot Password?</Text>
        {this.state.showIndicator && (<ActivityIndicator size='large' color={R.color.textInputBorderColor}/>)}
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:140}}>
                        <Text style={{color:R.color.textInputBorderColor,fontSize:20,fontFamily:R.fonts.GothamBlack}} onPress={()=>{
                            this.props.navigation.navigate('Register')
                            }}
                        >DONT HAVE Account?</Text>
                        <Image source={R.images.Plus}   style={{marginLeft:140,}}></Image>
                    </View>
        
                </View>
        </ScrollView>
        )
    }
}



