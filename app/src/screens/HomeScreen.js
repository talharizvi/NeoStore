import React, { Component } from 'react';
import { View, Text,Image,ScrollView,FlatList,TouchableOpacity,StatusBar,YellowBox} from 'react-native';
import R from '../R';
import HamburgerIcon from '../components/HamburgerIcon';
import ShoppingCartButton from '../components/ShoppingCartButton';
import {ImageCarousel} from '../components/ImageCarousel';



const images=[
  R.images.slider_img1,
  R.images.slider_img2,
  R.images.slider_img3,
  R.images.slider_img4
]

export default class HomeScreen extends Component {
  

  static navigationOptions=({navigation})=>({
    title:'NeoStore',
    headerStyle:{
      backgroundColor:R.color.backgroundColorDefault
  },
    headerLeft:
     <HamburgerIcon navigationProps={navigation} />,
     headerRight:(
      <ShoppingCartButton onPress={()=>{navigation.navigate('MyCart')}}/>
    )
  }) 

    state={
      productCategoryId:1
    }


  render() {
    YellowBox.ignoreWarnings(['Warning: componentWillUpdate']);
    return (
      <ScrollView style={{flex:1}}>
      <View style={{flex:1}}>
        <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
        <View style={{flex:2}}>
       
          <ImageCarousel images={images}/>
       
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
             keyExtractor={(item,index)=>index.toString()}
          />

       </View>

      </View>
      </ScrollView>
    );
  }
}
