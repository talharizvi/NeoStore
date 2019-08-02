import React,{Component} from 'react';
import {View,Image,TextInput,Text,TouchableOpacity} from 'react-native';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../components/Api';

export default class MyOrder extends Component{


    constructor(props){
      super(props)
      this.state={
        orderArr:[],
        accessToken:'',
      }
    }

    

    componentDidMount(){
      this.getAccessTokenData()
    }

    getOrderList(){
      
      return Api('orderList','GET',this.state.accessToken,null)
      .then((responseJson)=>{
        this.setState({orderArr:responseJson.data})
        console.log(responseJson)
      })
    }

    getAccessTokenData=async()=>{
      try{
          let accessToken = await AsyncStorage.getItem('access_token')
          this.setState({accessToken:accessToken})
          this.getOrderList()
          console.log(accessToken)        
        }catch(error){
          console.log(error)
        }
    }

    renderOrderList(){
      return(
      this.state.orderArr.map((item)=>
      <TouchableOpacity onPress={()=>{
        this.props.navigation.navigate('OrderDetail',{orderId:item.id})
      }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,fontFamily:'gotham_bold'}}>
              <View >
                  <Text style={{marginLeft:10,fontFamily:'gotham_medium'}}>OrderID :{item.id}</Text>
                  <Text style={{marginLeft:10,fontFamily:'gotham_medium'}}>Ordered Date :{item.created}</Text>
              </View>

              <View>
                  <Text style={{marginRight:10,fontFamily:'gotham_medium'}}>Rs {item.cost}</Text>
              </View>
        </View>

      </TouchableOpacity>
      ))
    }

    render(){
        return(<View>
          {this.renderOrderList()}
            
        </View>)
    }
}