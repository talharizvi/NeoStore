import React,{Component} from 'react';
import {View,Image,Text} from 'react-native';
import R from '../R';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import style from '../Styles';

export default class MyAccount extends Component{

  static navigationOptions={
        
    title:'MyAccount',
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTintColor:R.color.textInputBorderColor

}

  state={
    firstName:'FirstName',

  }

    render(){
        return(
        <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center"}}>
          <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
              <Text style={{color:R.color.textInputBorderColor,fontSize:20}}>{this.state.userName}</Text>  
              <Text style={{color:R.color.textInputBorderColor}}>{this.state.userEmail}</Text>
          </View>
          <CustomText sourceImage={R.images.username_icon} textTitle='First Name' />
          <CustomText sourceImage={R.images.username_icon} textTitle='Last Name'  />
          <CustomText sourceImage={R.images.email_icon} textTitle='Email' />
          <CustomText sourceImage={R.images.cellphone} textTitle='Phone Number' />
          <CustomText sourceImage={R.images.dob_icon} textTitle='Birth' />
          <CustomButton title='Edit Profile' onPress={()=>{
            this.props.navigation.navigate('EditProfile')
          }}/>

        </View>)
    }
}