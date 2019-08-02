import React,{Component} from 'react';
import {View,Image,Text} from 'react-native';
import R from '../R';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import style from '../Styles';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../components/Api';

export default class MyAccount extends Component{

  

  state={
    firstName:'FirstName',
    dataSource:'',
    accessToken:''
  }

  componentDidMount(){
    this.getAccessTokenData()
  }

  getUserData(){
  
    const endPoint='users/getUserData';
    return Api(endPoint,'GET',this.state.accessToken,null).then((responseJson)=>{
      console.log(responseJson)
      this.setState({dataSource:responseJson.data.user_data})
    })
    
  
    
    
  }

  getAccessTokenData=async()=>{
    try{
        let accessToken = await AsyncStorage.getItem('access_token')
        this.setState({accessToken:accessToken})
       
        this.getUserData()        
      }catch(error){
        console.log(error)
      }
}

    render(){
        return(
        <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center"}}>
          <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
          </View>
          <CustomText sourceImage={R.images.username_icon} textTitle={this.state.dataSource.first_name} />
          <CustomText sourceImage={R.images.username_icon} textTitle={this.state.dataSource.last_name}  />
          <CustomText sourceImage={R.images.email_icon} textTitle={this.state.dataSource.email} />
          <CustomText sourceImage={R.images.cellphone} textTitle={this.state.dataSource.phone_no} />
          <CustomText sourceImage={R.images.dob_icon} textTitle={this.state.dataSource.dob} />
          <CustomButton title='Edit Profile' onPress={()=>{
            this.props.navigation.navigate('EditProfile')
          }}/>
          <CustomButton title='Reset Password' onPress={()=>{
              this.props.navigation.navigate('ChangePassword')
          }}/>

        </View>)
    }
}