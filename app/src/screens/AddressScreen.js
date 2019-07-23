import React,{Component}  from 'react';
import {View,Text} from 'react-native';
import R from '../R';
import { TextInput } from 'react-native-gesture-handler';
import CustomButtonRed from '../components/CustomButtonRed';

export default class AddressScreen extends Component{
    
    static navigationOptions={
        
        title:'Add Address',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    }

    render(){
        return(
            <View>
                <Text> Address</Text>
                <TextInput placeholder={"Neosoft Technologies 4th floor,\nThe Ruby,29,Senapati Bapat Marg,\nDadar (West) Mumbai-400028.INDIA"}></TextInput>
                <Text>CITY</Text>
                <TextInput placeholder="LANDMARK"></TextInput>
                
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
                        <TextInput placeholder="10066"/>
                    </View>

                    <View>
                        <Text >COUNTRY</Text>
                        <TextInput placeholder="INDIA"/>
                    </View>
                </View>

                <CustomButtonRed title="SAVE ADDRESS"/>

            </View>
        )
        
    }
}