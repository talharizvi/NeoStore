import React,{Component} from 'react';
import {View,Image,TextInput,Text,TouchableOpacity} from 'react-native';
import R from '../R';

export default class MyOrder extends Component{

  static navigationOptions={
        
    title:'My Orders',
    headerStyle:{
        backgroundColor:R.color.backgroundColorDefault
    },
    headerTintColor:R.color.textInputBorderColor
}

    state={
      orderArr:[],
      
    }

    componentDidMount(){
      fetch('http://staging.php-dev.in:8844/trainingapp/api/orderList',{
        method:'GET',
        headers:{
          access_token:'5d31b3f1ef96b',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then((response)=>response.json())
      .then((responseJson)=>{
        this.setState({orderArr:responseJson.data})
        console.log(responseJson)
      })
    }

    renderOrderList(){
      return(
      this.state.orderArr.map((item)=>
      <TouchableOpacity onPress={()=>{
        this.props.navigation.navigate('OrderDetail',{orderId:item.id})
      }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
              <View >
                  <Text style={{marginLeft:10}}>OrderID :{item.id}</Text>
                  <Text style={{marginLeft:10}}>Ordered Date :{item.created}</Text>
              </View>

              <View>
                  <Text style={{marginRight:10}}>Rs {item.cost}</Text>
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