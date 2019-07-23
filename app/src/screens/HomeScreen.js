import React, { Component } from 'react';
import { View, Text,Image,ScrollView,FlatList,TouchableOpacity } from 'react-native';
import R from '../R';



export default class HomeScreen extends Component {
  
    static navigationOptions={
        
        title:'NeoSTORE',
        headerStyle:{
            backgroundColor:R.color.backgroundColorDefault
        },
        headerTintColor:R.color.textInputBorderColor
    
    }

    

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:2}}>
          <ScrollView horizontal={true} >
            <Image source={R.images.slider_img1} style={{width:393,height:'100%'}}></Image>
            <Image source={R.images.slider_img2} style={{width:393,height:'100%'}}></Image>
            <Image source={R.images.slider_img3} style={{width:393,height:'100%'}}></Image>
            <Image source={R.images.slider_img4} style={{width:393,height:'100%'}}></Image>
          </ScrollView>
        </View>
        
        <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
          <FlatList
             data={[{key:R.images.cupboardicon},{key:R.images.sofaicon},{key:R.images.tableicon},{key:R.images.chairsicon}]}
             renderItem={({item})=>
             <View>
              <TouchableOpacity onPress={()=>{
                
               this.props.navigation.navigate('Table')}}>
                  {/* this.props.navigation.toggleDrawer()}}> */}
                 <Image source={item.key} style={{margin:6}}></Image>
              </TouchableOpacity>
             </View>}
             numColumns={2}
          />

       </View>

      </View>
    );
  }
}
