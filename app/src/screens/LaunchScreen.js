import React,{Component} from 'react';
import {View,Text,ActivityIndicator,StatusBar} from 'react-native';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';



    const getAccessTokenData=async(props)=>{
        try{
            let accessToken = await AsyncStorage.getItem('access_token')
            console.log(accessToken)        
            if(accessToken!=null ){
                 props.navigation.navigate("HomeStack")   
            }else{
                props.navigation.navigate("SessionStack")
            }
    
          }catch(error){
            console.log(error)
          }
    }


        LaunchScreen.navigationOptions={
        title:'',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
       
    
    }

export default function LaunchScreen(props){
    
    getAccessTokenData(props)
    return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:R.color.backgroundColorDefault}}>
                    <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
                    <Text style={{fontSize:30,color:R.color.textInputBorderColor,fontFamily:R.fonts.GothamBold}}> NeoSTORE</Text>
                    <ActivityIndicator size='large' color={R.color.textInputBorderColor}></ActivityIndicator>
                </View>
            )
}