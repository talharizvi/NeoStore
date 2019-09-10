import React,{Component}  from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import R from '../R';
import { TextInput } from 'react-native-gesture-handler';
import CustomButtonRed from '../components/CustomButtonRed';
import AsyncStorage from '@react-native-community/async-storage';


export default class AddressScreen extends Component{
    
   

    state=[
        address='',
        city='',
        zipCode='',
        country=''   
    ]

    saveAddress=async()=>{
        var addressObj = {
            address:this.state.address,
            city:this.state.city,
            zipCode:this.state.zipCode,
            country:this.state.country    
        }
        try{
           
           await AsyncStorage.setItem('@Address:key', JSON.stringify(addressObj))
           console.log(addressObj)
        }catch(error){

        }
        
    }

   

    render(){

      
       
        return(
            <SafeAreaView>
                <Text style={{fontFamily:R.fonts.GothamBlack}}> Address</Text>
                <TextInput placeholder={"Neosoft Technologies 4th floor,\nThe Ruby,29,Senapati Bapat Marg,\nDadar (West) Mumbai-400028.INDIA"} onChangeText={(address)=>{this.setState({address})

                }}></TextInput>
                <Text style={{fontFamily:R.fonts.GothamBlack}}>CITY</Text>
                <TextInput placeholder="LANDMARK" onChangeText={(city)=>{this.setState({city})}}></TextInput>
                
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:150}}>
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>CITY</Text>
                        <TextInput placeholder="MUMBAI"/>
                    </View>

                    <View>
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>STATE</Text>
                        <TextInput placeholder="MAHARASHTRA"/>
                    </View>
                </View>
                
               

                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:150}}>
                        <Text style={{fontFamily:R.fonts.GothamBlack}} >ZIP CODE</Text>
                        <TextInput placeholder="10066" onChangeText={(zipCode)=>{this.setState({zipCode})}}/>
                    </View>

                    <View>
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>COUNTRY</Text>
                        <TextInput placeholder="INDIA" onChangeText={(country)=>{this.setState({country})}}/>
                    </View>
                </View>

                <CustomButtonRed title="SAVE ADDRESS" onPress={()=>{
                    
                    this.saveAddress()
                    this.props.navigation.navigate("AddressList")
                    }}/>

            </SafeAreaView>
        )
        
    }
}