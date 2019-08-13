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
        {/* fontFamily:'gotham_bold' */}
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomColor: R.color.blackColor,borderBottomWidth: 1}}>
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
    }else{
      // return(
      //   <View>
      //     <Text>No Orders yet</Text>
      //   </View>
      // )
    }
    }

    render(){
        return(<View>
          {this.renderOrderList()}
            
        </View>)
    }
}