import React,{Component} from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';

export default class LaunchScreen extends Component{

    static navigationOptions={
        
        title:'',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
         headerTintColor:R.color.textInputBorderColor
    
    }

    constructor(props){
        super(props);
    
    }


    getAccessTokenData=async()=>{
        try{
            let accessToken = ''
            let testToken = await AsyncStorage.getItem('access_token')

            console.log(testToken)        
            if(testToken!=null ){
                 this.props.navigation.navigate("HomeStack")   
            }else{
                this.props.navigation.navigate("SessionStack")
            }
    
          }catch(error){
            console.log(error)
          }
    }

    render(){
        this.getAccessTokenData()
      
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:R.color.backgroundColorDefault}}>
                    <Text style={{fontSize:30,color:R.color.textInputBorderColor,fontFamily:'gotham_bold'}}> NeoSTORE</Text>
                    <ActivityIndicator size='large' color={R.color.textInputBorderColor}></ActivityIndicator>
                </View>
            )
    }
}