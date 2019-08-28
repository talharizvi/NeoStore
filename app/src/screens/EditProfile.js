import React,{Component} from 'react';
import {View,Text,Image,ScrollView,Button} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import R from '../R';
import CustomButton from '../components/CustomButton';
import style from '../Styles';
import Api from '../components/Api';
import CartContext from '../context/CartContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
      profilePic:'',
      dataSource:'',
      base64:''
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
      if(responseJson.data.user_data.profile_pic==""){
      
       }else{
         this.setState({profilePic:responseJson.data.user_data.profile_pic})
       }
     // console.log(this.state)
    })
  }

  updateAccount(firstName,lastName,email,dob,profilePic,phoneNo,contextValue){
    console.log("called update")
    
    console.log("fName:"+firstName+"lName:"+lastName+"email:"+email+"dob"+dob+"profile:"+profilePic+"phone"+phoneNo)
    console.log("called")
    console.log(profilePic)
    
    return Api('users/update','POST',`first_name=${firstName}&last_name=${lastName}&email=${email}&dob=${dob}&profile_pic=${profilePic}&phone_no=${phoneNo}`)
    .then((responseJson)=>{
      console.log("Update="+responseJson)
      contextValue.updateData()
     alert(responseJson.message)
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
      console.log("else")
      return(
        <View style={{alignItems:'center', paddingTop:30}}>
          <Image source={{uri:this.state.profilePic}} style={style.roundImageStyle}></Image>
        </View>
      )
    }
    
  }

    render(){
        return(
       <ScrollView style={{flex:1,backgroundColor:R.color.backgroundColorDefault,}}> 
        <View style={{flex:1,alignItems: "center"}}>
        <CartContext.Consumer>{
          cv=> <TouchableOpacity onPress={()=>{
            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);
              const baseImage64 = 'data:image/jpeg;base64,' + response.data
              this.setState({base64:baseImage64})
              console.log(baseImage64)
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };
                console.log(response.uri)
                this.setState({
                  
                  profilePic:baseImage64,
                });
                cv.state.profilePic = baseImage64
             
              }
            });
            
          }}>

            {this.displayImage()}
          {/* <View style={{alignItems:'center', paddingTop:30}}>

            <Image source={this.state.profilePic} style={style.roundImageStyle}></Image>
              
          </View> */}
          </TouchableOpacity>
        }         
          
          </CartContext.Consumer>

          {/* {<CartContext.Consumer>
                  {contextValue=>{
                     <Button title="test" onPress={()=> contextValue.updateData()}></Button>
                    
                  }}
                </CartContext.Consumer>}   */}
         
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue="FirstName" onChangeText={(firstName)=>this.setState({firstName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.username_icon} placeholdeValue="LastName"  onChangeText={(lastName)=>this.setState({lastName})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.email_icon} placeholdeValue="Email" onChangeText={(email)=>this.setState({email})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.cellphone} placeholdeValue="Phone" onChangeText={(phoneNo)=>this.setState({phoneNo})}></CustomTextInput>
            <CustomTextInput sourceImage={R.images.dob_icon} placeholdeValue="Dob" onChangeText={(dob)=>this.setState({dob})}></CustomTextInput>
            
            <CartContext.Consumer>
              {cv=><CustomButton title='SUBMIT' onPress={()=>{
                  
              this.updateAccount(this.state.firstName,this.state.lastName,this.state.email,
                this.state.dob,this.state.base64,this.state.phoneNo,cv)}}>
                </CustomButton>}
            </CartContext.Consumer>
            
       </View>
       </ScrollView>
       )
    }
}