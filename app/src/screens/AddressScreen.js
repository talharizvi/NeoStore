import React,{Component}  from 'react';
import {View,Text} from 'react-native';
import R from '../R';
import { TextInput } from 'react-native-gesture-handler';
import CustomButtonRed from '../components/CustomButtonRed';
import AsyncStorage from '@react-native-community/async-storage';


export default class AddressScreen extends Component{
    
    static navigationOptions={
        
        title:'Add Address',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    }

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
            <View>
                <Text> Address</Text>
                <TextInput placeholder={"Neosoft Technologies 4th floor,\nThe Ruby,29,Senapati Bapat Marg,\nDadar (West) Mumbai-400028.INDIA"} onChangeText={(address)=>{this.setState({address})

                }}></TextInput>
                <Text>CITY</Text>
                <TextInput placeholder="LANDMARK" onChangeText={(city)=>{this.setState({city})}}></TextInput>
                
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:150}}>
                        <Text>CITY</Text>
                        <TextInput placeholder="MUMBAI"/>
                    </View>

                    <View>
                        <Text>STATE</Text>
                        <TextInput placeholder="MAHARASHTRA"/>
                    </View>
                </View>
                
               

                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:150}}>
                        <Text>ZIP CODE</Text>
                        <TextInput placeholder="10066" onChangeText={(zipCode)=>{this.setState({zipCode})}}/>
                    </View>

                    <View>
                        <Text >COUNTRY</Text>
                        <TextInput placeholder="INDIA" onChangeText={(country)=>{this.setState({country})}}/>
                    </View>
                </View>

                <CustomButtonRed title="SAVE ADDRESS" onPress={()=>{
                    
                    this.saveAddress()
                    this.props.navigation.navigate("AddressList")
                    }}/>

            </View>
        )
        
    }
}