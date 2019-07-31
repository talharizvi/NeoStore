import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import R from '../R';

export default class OrderDetail extends Component{

    static navigationOptions=({navigation})=>({
        
        title:"Order ID : "+navigation.getParam('orderId',1),
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    })

    state={
        itemArr:[]
    }

    componentDidMount(){
        const id = this.props.navigation.getParam('orderId',1)
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${id}`,{
            method:'GET',
            headers:{
              access_token:'5d31b3f1ef96b',
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson.data)
            console.log(responseJson.data.order_details)
            this.setState({itemArr:responseJson.data.order_details})
           
          })
    }

    renderItems(){
        console.log("itemArray"+this.state.itemArr)
        return(
        this.state.itemArr.map((item)=>
            <View style={{flexDirection:'row',margin:10}}>
                <View>
                    <Image source={{uri:item.prod_image}} style={{width:100,height:100}}/> 
                </View>

                <View>
                    <View style={{marginHorizontal:10}}>
                        <Text>{item.prod_name}</Text>
                        <Text>{item.prod_cat_name}</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:20}}>
                        <Text>QTY : {item.quantity}</Text>
                        <Text>Rs{item.total}</Text>
                    </View>
                </View>
            </View>
        ))        
    }
    
    render(){
        return(<View>
            {this.renderItems()}
        </View>)
    }
}