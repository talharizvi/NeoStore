import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import R from '../R';
import Api from '../components/Api';

export default class OrderDetail extends Component{

    static navigationOptions=({navigation})=>({
        
        title:"Order ID : "+navigation.getParam('orderId',1),
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTitleStyle:{
            fontSize: 20,
            color:R.color.textInputBorderColor,
            // fontFamily: 'gotham_medium' 
          },
    })

    constructor(props){
        super(props)
        this.state={
            itemArr:[],
            accessToken:''
        }
    }
    

    componentDidMount(){
        this.getOrderDetail()
    }

    getOrderDetail(){
        const id = this.props.navigation.getParam('orderId',1)
      
        return Api(`orderDetail?order_id=${id}`,'GET',null)
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
                    {/* style={{fontFamily:"gotham_book"}} */}
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>{item.prod_name}</Text>
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>{item.prod_cat_name}</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:20}}>
                    {/* style={{fontFamily:"gotham_book"}} */}
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>QTY : {item.quantity}</Text>
                        <Text style={{fontFamily:R.fonts.GothamBlack}}>Rs{item.total}</Text>
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