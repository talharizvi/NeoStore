import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';
import style from '../Styles';

export default class EditProfile extends Component{

  constructor(props){
    super(props)
    this.state={
      firstName:'',
      lastName:'',
      email:'',
      phoneNo:'',
      dob:'',

    }
  }

  static navigationOptions={
        
    title:'EditProfile',
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTintColor:R.color.textInputBorderColor

}

  updateAccount(firstName,lastName,email,dob,profilePic,phoneNo){
    console.log("called update")
    fetch('http://staging.php-dev.in:8844/trainingapp/api/users/update',{
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        access_token:'5d31b3f1ef96b',
      },
      body:`first_name=${firstName}&last_name=${lastName}&email=${email}&dob=${dob}&profile_pic=${profilePic}&phone_no=${phoneNo}`
    }).then((response)=>response.json())
    .then((responseJson)=>{
      alert(responseJson.message)
    })
  }

    render(){
        return(<View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center"}}>
          <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
              
          </View>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='First Name' onChangeText={(firstName)=>this.setState({firstName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue='Last Name'  onChangeText={(lastName)=>this.setState({lastName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue='Email' onChangeText={(email)=>this.setState({email})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.cellphone} placeholdeValue='Phone Number' onChangeText={(phoneNo)=>this.setState({phoneNo})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.dob_icon} placeholdeValue='DOB' onChangeText={(dob)=>this.setState({dob})}></CustomTextInput>
            <CustomButton title='SUBMIT' onPress={()=>{
              this.updateAccount(this.state.firstName,this.state.lastName,this.state.email,
                this.state.dob,this.state.profilePic,this.state.phoneNo)
            }        
              }></CustomButton>
       </View>)
    }
}