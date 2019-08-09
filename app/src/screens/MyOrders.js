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
     
      this.getOrderList()
    }

    getOrderList(){
      
      return Api('orderList','GET',null)
      .then((responseJson)=>{
        this.setState({orderArr:responseJson.data})
        console.log(responseJson)
      })
    }

    // getAccessTokenData=async()=>{
    //   try{
    //       let accessToken = await AsyncStorage.getItem('access_token')
    //       this.setState({accessToken:accessToken})
    //       this.getOrderList()
    //       console.log(accessToken)        
    //     }catch(error){
    //       console.log(error)
    //     }
    // }

    renderOrderList(){
      return(
      this.state.orderArr.map((item)=>
      <TouchableOpacity onPress={()=>{
        this.props.navigation.navigate('OrderDetail',{orderId:item.id})
      }}>
        {/* fontFamily:'gotham_bold' */}
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
              <View >
              {/* fontFamily:'gotham_medium' */}
                  <Text style={{marginLeft:10,}}>OrderID :{item.id}</Text>
                  <Text style={{marginLeft:10,}}>Ordered Date :{item.created}</Text>
              </View>

              <View>
              {/* fontFamily:'gotham_medium' */}
                  <Text style={{marginRight:10,}}>Rs {item.cost}</Text>
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