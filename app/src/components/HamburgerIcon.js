import React,{Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import R from '../R';


export default class HamburgerIcon extends Component {

    toggleDrawer = () => {
  
      console.log(this.props.navigationProps);
  
      this.props.navigationProps.toggleDrawer();
  
    }
  
    render() {
  
      return (
  
        <View style={{ flexDirection: 'row' }}>
  
          <TouchableOpacity onPress={()=>{
              this.toggleDrawer()
          }} >
  
            <Image
              source={R.images.menu_icon}
              style={{ width: 25, height: 25, marginLeft: 10 }}
            />
  
          </TouchableOpacity>
  
        </View>
  
      );
  
  
    }
  }