import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';
import style from '../Styles';
import Api from '../components/Api';

export default class EditProfile extends Component{

  constructor(props){
    super(props)
    this.state={
      firstName:'',
      lastName:'',
      email:'',
      phoneNo:'',
      dob:'',
      accessToken:'',
      profilePic:null,
      dataSource:'',
    }
  }

  componentDidMount(){
    this.getUserData()
  }

  getUserData(){
    const endPoint='users/getUserData';
    return Api(endPoint,'GET',null).then((responseJson)=>{
      console.log(responseJson)
      this.setState({firstName:responseJson.data.user_data.first_name , lastName:responseJson.data.user_data.last_name , email:responseJson.data.user_data.email ,dob:responseJson.data.user_data.dob , phoneNo:responseJson.data.user_data.phone_no , dataSource:responseJson.data.user_data})
      console.log(this.state)
    })
  }

  updateAccount(firstName,lastName,email,dob,profilePic,phoneNo){
    console.log("called update")
    console.log("fName:"+firstName+"lName:"+lastName+"email:"+email+"dob"+dob+"propfile"+profilePic+"phone"+phoneNo)
    return Api('users/update','POST',`first_name=${firstName}&last_name=${lastName}&email=${email}&dob=${dob}&profile_pic=${profilePic}&phone_no=${phoneNo}`)
    .then((responseJson)=>{
      alert(responseJson.message)
    })
  }

    render(){
        return(<View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,alignItems: "center"}}>
          <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
              
          </View>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue={this.state.dataSource.first_name} onChangeText={(firstName)=>this.setState({firstName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue={this.state.dataSource.last_name}  onChangeText={(lastName)=>this.setState({lastName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue={this.state.dataSource.email} onChangeText={(email)=>this.setState({email})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.cellphone} placeholdeValue={this.state.dataSource.phone_no} onChangeText={(phoneNo)=>this.setState({phoneNo})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.dob_icon} placeholdeValue={this.state.dataSource.dob} onChangeText={(dob)=>this.setState({dob})}></CustomTextInput>
            <CustomButton title='SUBMIT' onPress={()=>{
              this.updateAccount(this.state.firstName,this.state.lastName,this.state.email,
                this.state.dob,null,this.state.phoneNo)
            }        
              }></CustomButton>
       </View>)
    }
}