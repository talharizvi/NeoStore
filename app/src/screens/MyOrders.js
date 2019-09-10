import React,{Component} from 'react';
import {View,Image,TextInput,Text,TouchableOpacity,SafeAreaView} from 'react-native';
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
        this.setState({orderArr:responseJson.data.reverse()})       
      })
      
    }

    renderOrderList(){
     
      if(this.state.orderArr.length!=0){
      return(
      this.state.orderArr.map((item)=>
      <TouchableOpacity key={'mykey'+item.id} onPress={()=>{
        this.props.navigation.navigate('OrderDetail',{orderId:item.id})
      }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomColor: R.color.blackColor,borderBottomWidth: 1}}>
              <View >
                  <Text style={{marginLeft:10,fontFamily:R.fonts.GothamBlack}}>OrderID :{item.id}</Text>
                  <Text style={{marginLeft:10,fontFamily:R.fonts.GothamBlack}}>Ordered Date :{item.created}</Text>
              </View>

              <View>
                  <Text style={{marginRight:10,fontFamily:R.fonts.GothamBlack}}>Rs {item.cost}</Text>
              </View>
        </View>

      </TouchableOpacity>
      ))
    }else{
      return(
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text>No Orders yet</Text>
        </View>
      )
    }
    }

    render(){
        return(
        <SafeAreaView>
        <View>
          {this.renderOrderList()}
            
        </View>
       </SafeAreaView>
        )
    }
}