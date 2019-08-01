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
    dataSource:''
  }

  componentDidMount(){
    fetch('http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',{
      method:'GET',
      headers:{
        access_token:'5d31b3f1ef96b',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({dataSource:responseJson.data.user_data})
      console.log(responseJson)
    })
  }

    render(){
        return(
        <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center"}}>
          <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
              <Text style={{color:R.color.textInputBorderColor,fontSize:20}}>{this.state.userName}</Text>  
              <Text style={{color:R.color.textInputBorderColor}}>{this.state.userEmail}</Text>
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