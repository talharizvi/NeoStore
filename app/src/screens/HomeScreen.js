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

   
    state={
      productCategoryId:1
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
             data={[{key:R.images.tableicon,id:1,itemType:'Tables'},{key:R.images.sofaicon,id:3,itemType:'Sofas'},{key:R.images.chairsicon,id:2,itemType:'Chairs'},{key:R.images.cupboardicon,id:4,itemType:'Cupboards'}]}
             renderItem={({item})=>
             <View>
              <TouchableOpacity onPress={()=>{
                
               this.props.navigation.navigate('Item',{productCategoryId:item.id,itemCategory:item.itemType})}}>
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
