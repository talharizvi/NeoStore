import React,{Component} from 'react';
import {View} from 'react-native';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';

 const Api=async(endPoint,method,body)=>{
    const commonUrl = "http://staging.php-dev.in:8844/trainingapp/api/"
    let accessToken = await AsyncStorage.getItem('access_token')
   
    console.log(accessToken)
    console.log(method)
    console.log(endPoint)
    

    const url = commonUrl+endPoint
    console.log(url)
     return fetch(url,{
        method:method,
        headers:{
          
            access_token:accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:body
    }).then((response)=>response.json())
    
}



export default Api;