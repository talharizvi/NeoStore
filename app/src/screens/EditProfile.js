import React,{Component} from 'react';
import {View,Text,Image,ScrollView} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';
import style from '../Styles';
import Api from '../components/Api';
import CartContext from '../context/CartContext';

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

  updateAccount(firstName,lastName,email,dob,profilePic,phoneNo,contextValue){
    console.log("called update")
    
    console.log("fName:"+firstName+"lName:"+lastName+"email:"+email+"dob"+dob+"propfile"+profilePic+"phone"+phoneNo)
    return Api('users/update','POST',`first_name=${firstName}&last_name=${lastName}&email=${email}&dob=${dob}&profile_pic=${profilePic}&phone_no=${phoneNo}`)
    .then((responseJson)=>{
      contextValue.updateData()
     alert(responseJson.message)
    })
  }

    render(){
        return(
       <ScrollView style={{flex:1,backgroundColor:R.color.backgroundColorDefault,}}> 
        <View style={{flex:1,alignItems: "center"}}>
          <View style={{alignItems:'center', paddingTop:30}}>
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={style.roundImageStyle}></Image>
              
          </View>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue="FirstName" onChangeText={(firstName)=>this.setState({firstName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue="LastName"  onChangeText={(lastName)=>this.setState({lastName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue="Email" onChangeText={(email)=>this.setState({email})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.cellphone} placeholdeValue="Phone" onChangeText={(phoneNo)=>this.setState({phoneNo})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.dob_icon} placeholdeValue="Dob" onChangeText={(dob)=>this.setState({dob})}></CustomTextInput>
            
            <CartContext.Consumer>
              {cv=><CustomButton title='SUBMIT' onPress={()=>{
              this.updateAccount(this.state.firstName,this.state.lastName,this.state.email,
                this.state.dob,null,this.state.phoneNo,cv)}}>
                </CustomButton>}
            </CartContext.Consumer>
            
       </View>
       </ScrollView>
       )
    }
}