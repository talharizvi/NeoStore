import React,{Component} from 'react';
import {View,Text,ActivityIndicator,StatusBar} from 'react-native';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';

export default class LaunchScreen extends Component{

    static navigationOptions={
        
        title:'',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
       
    
    }

    constructor(props){
        super(props);
    
    }


    getAccessTokenData=async()=>{
        try{
            let accessToken = await AsyncStorage.getItem('access_token')
            console.log(accessToken)        
            if(accessToken!=null ){
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
                    <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
                    <Text style={{fontSize:30,color:R.color.textInputBorderColor,fontFamily:'gotham_bold'}}> NeoSTORE</Text>
                    <ActivityIndicator size='large' color={R.color.textInputBorderColor}></ActivityIndicator>
                </View>
            )
    }
}