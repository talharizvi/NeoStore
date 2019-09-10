import React,{Component} from 'react';
import {View,Image,Text,ScrollView,SafeAreaView} from 'react-native';
import R from '../R';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import style from '../Styles';
import Api from '../components/Api';

export default class MyAccount extends Component{

  

  state={
    firstName:'FirstName',
    dataSource:'',
    accessToken:'',
    profilePic:'',
  }

  componentDidMount(){
   this.getUserData() 
  }

  getUserData(){
    const endPoint='users/getUserData';
    return Api(endPoint,'GET',null).then((responseJson)=>{
      console.log(responseJson)
      if(responseJson.data.user_data.profile_pic==""){
       // this.setState({profile_pic:R.images.app_icon})
      }else{
        this.setState({profilePic:responseJson.data.user_data.profile_pic})
      }
      this.setState({dataSource:responseJson.data.user_data})
    })
  }

  displayImage(){
    console.log(this.state.profilePic)
    if(this.state.profilePic==''){
      return(
        <View style={{alignItems:'center', paddingTop:30}}>
        <Image source={R.images.app_icon} style={style.roundImageStyle}></Image>
      </View>)
    }else{
    
      return(
        <View style={{alignItems:'center', paddingTop:30}}>
          <Image source={{uri:this.state.profilePic}} style={style.roundImageStyle}></Image>
        </View>
      )
    }
    
  }


    render(){
      console.log(this.state)
        return(
         <SafeAreaView style={{flex:1,backgroundColor:R.color.backgroundColorDefault}}> 
        <ScrollView >  
        <View style={{flex:1,alignItems: "center"}}>
          {/* <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={this.state.profilePic} style={style.roundImageStyle}></Image>
          </View> */}
          {this.displayImage()}
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

        </View>
        </ScrollView>
        </SafeAreaView>
        )
    }
}