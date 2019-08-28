import React,{Component,useState} from 'react';
import {View,Button,Image,TextInput,Text,ActivityIndicator,ScrollView} from 'react-native';
import R from '../R';
import style from '../Styles';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import CustomTextInputSecure from '../components/CustomTextInputSecure';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../components/Api';
import CartContext from '../context/CartContext';

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
 
      
    loginUser(userName,password,cartContext){
       
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
                    
                    cartContext.displayData()
                     

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
                    
                    <CartContext.Consumer>
                        {cc=><CustomButton title='LOGIN' onPress={()=>{               
                        this.loginUser(this.state.userName,this.state.password,cc)
                    }}/>}
                    </CartContext.Consumer>
                   
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

 

   

//   const multiSet = async(userName,email,accessToken)=>{
//         const name = ["user_name",userName]
//         const userEmail = ["user_email",email]
//         const aToken=["access_token",accessToken]
       
//         try{
//             await AsyncStorage.multiSet([name,userEmail,aToken])
//         }catch(e){

//         }
        
//     }

//     LoginScreen.navigationOptions = {
//         header: null ,
//       };

// export default function LoginScreen(props){

//     const [userName,setUserName]=useState('');
//     const [password,setPassword]=useState('');
//     const [showIndicator,setShowIndicator]=useState(false);

//     function indicatorShow(){
//         setShowIndicator(showIndicator=>!showIndicator)
//     }

//     const loginUser=(props,userName,password,cartContext)=>{
//         console.log("test state")    
       
//             return Api('users/login','POST',`email=${userName}&password=${password}`)
//             .then((responseJson)=>{
//                 console.log(responseJson)
               
//                 let status = responseJson.status
//                 // this.setState({showIndicator: !this.state.showIndicator})
//                     // setShowIndicator({showIndicator:!showIndicator})
                    
//                     if(status==200){
//                         let accessToken = responseJson.data.access_token
//                         let userEmail = responseJson.data.email
//                         let fName = responseJson.data.first_name
//                         let lName = responseJson.data.last_name
//                         let userName = fName+lName
//                         console.log("username from login "+userName)
//                         multiSet(userName,userEmail,accessToken)
//                         props.navigation.navigate("HomeStack")
                        
//                         cartContext.displayData()
                         
    
//                     }else if(status==401){
//                         setTimeout(()=>{
//                             //this.setState({showIndicator: false})
//                             // setShowIndicator({showIndicator:false})
//                             {indicatorShow}
//                         },1000)
//                         alert(responseJson.message)
//                     }
//                     console.log(accessToken)
        
//             })
//         }
//     return(
//                    <ScrollView style={{flex:1,backgroundColor:R.color.backgroundColorDefault}}>
//                     <View style={ {flex: 1,alignItems: "center", }}>
//                     <Text style={[style.headerTitleStyle]}>{R.strings.AppName}</Text>
//                     <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='UserName' onChangeText={(userName)=>{setUserName(userName)}}/>
//                     <CustomTextInputSecure sourceImage={R.images.password_icon} placeholdeValue='Password' onChangeText={(password)=>{setPassword(password)}}/>
                    
//                     <CartContext.Consumer>
//                         {cc=><CustomButton title='LOGIN' onPress={()=>{               
//                         loginUser(props,userName,password,cc)
//                     }}/>}
//                     </CartContext.Consumer>
                   
//                     <Text style={{marginTop:10,color:R.color.textInputBorderColor,fontSize:20,fontFamily:R.fonts.GothamBlack}} onPress={()=>{props.navigation.navigate('ForgotPassWord')}}>Forgot Password?</Text>
//         {showIndicator && (<ActivityIndicator size='large' color={R.color.textInputBorderColor}/>)}
//                     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:140}}>
//                         <Text style={{color:R.color.textInputBorderColor,fontSize:20,fontFamily:R.fonts.GothamBlack}} onPress={()=>{
//                             props.navigation.navigate('Register')
//                             }}
//                         >DONT HAVE Account?</Text>
//                         <Image source={R.images.Plus}   style={{marginLeft:140,}}></Image>
//                     </View>
        
//                 </View>
//         </ScrollView> 
//     )
// }



