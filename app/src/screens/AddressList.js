import React,{Component} from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import R from '../R';
import CustomButtonRed from '../components/CustomButtonRed';
import Api from '../components/Api';

export default class AddressList extends Component{

   
    
    constructor(props){
        super(props)
        this.state={
            addressName:'',
            addressObj:'',
            accessToken:''
        }
    
        this.getAddress()
    }
  
    placeOrder(address){
        console.log(address)
        
        return Api('order','POST',`address=${address}`)
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status==200){
               alert(responseJson.message)
               
               setTimeout(() => {
                this.props.navigation.navigate('Home')
            }, 3000);
            }
        }).catch((error)=>{
            console.error(error)
        })
    }

    async getAddress(){
            try{
                let addressArr = await AsyncStorage.getItem("@Address:key")
                
                if (addressArr !== null) {
                  
                    console.log(addressArr)
                    this.setState({addressObj:JSON.parse(addressArr)})
                    const address = this.state.addressObj.address+' '+this.state.addressObj.city+' '+this.state.addressObj.zipCode+' '+this.state.addressObj.country
                    this.setState({addressName:address})
                    console.log(this.state.addressName)
                }
            }catch(error){
        
            }
        }
    

    render(){
      
        return(
            
            <SafeAreaView>
                
                <View style={{margin:5,borderColor:R.color.blackColor,borderWidth:2,}}>
                    <Text style={{fontFamily:R.fonts.GothamBlack}}>{this.state.addressObj.address}</Text>
                    <Text style={{fontFamily:R.fonts.GothamBlack}}>{this.state.addressObj.city}</Text>
                    <View style={{flexDirection:'row'}}> 
                    <Text style={{marginRight:10}}>{this.state.addressObj.zipCode}</Text>
                    <Text style={{fontFamily:R.fonts.GothamBlack}}>{this.state.addressObj.country}</Text>
                    </View>
                </View>
                
                <CustomButtonRed title='Place Order' onPress={()=>{
                    this.placeOrder(this.state.addressName)
                    }}>
                </CustomButtonRed>
          </SafeAreaView>
    )}    
}

