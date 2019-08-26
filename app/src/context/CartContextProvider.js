import React,{Component} from 'react';
import CartContext from './CartContext';
import Api from '../components/Api';
import AsyncStorage from '@react-native-community/async-storage';

export default class CartContextProvider extends Component{

    constructor(){
        super()
        this.state={
            count:0,
            userName:'',
            userEmail:''
        }
        this.displayData()
    }

    getCartItemsFromApi(){
        return Api('cart','GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            console.log("cartcontextProvider"+responseJson.count)
            this.setState({count:responseJson.count})
        }).catch((error)=>{
            console.error(error)
        }) 
    }

    displayData=async()=>{
        try{
            const value= await AsyncStorage.getItem('user_name')
            const userEmail = await AsyncStorage.getItem('user_email')
            console.log("displayData"+value+userEmail)
            this.setState({
              userName:value,
              userEmail:userEmail
            })
            this.getCartItemsFromApi()
            
      
          }catch(error){
            console.log(error)
          }
      }

    updateData=()=>{
        const endPoint='users/getUserData';
        return Api(endPoint,'GET',null).then((responseJson)=>{
            console.log('updatedata')
            console.log(responseJson)
            const fullName = responseJson.data.user_data.first_name+responseJson.data.user_data.last_name
            this.setState({userName:fullName,userEmail:responseJson.data.user_data.email})
            console.log(this.state)
        })
        
        }
     
    

    increaseCount=()=>{
        this.setState({count:this.state.count+1})
    }


    decreaseCount=()=>{
        this.setState({count:this.state.count-1})
    }
    

    render(){
       
        return(<CartContext.Provider value={
                {
                    state: this.state,
                    plusCount:this.increaseCount,
                    minusCount:this.decreaseCount,
                    updateData:this.updateData,
                    displayData:this.displayData
                 
                }
        }>
            {this.props.children}
        </CartContext.Provider>)
    
    }
}
       

    





