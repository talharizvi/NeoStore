import React, { Component } from 'react';
import { View, Text,Image,ScrollView,FlatList,TouchableOpacity,StatusBar,YellowBox,Dimensions} from 'react-native';
import R from '../R';
import HamburgerIcon from '../components/HamburgerIcon';
import ShoppingCartButton from '../components/ShoppingCartButton';
import {ImageCarousel} from '../components/ImageCarousel';
import { Header } from 'react-navigation';




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
    const imageWidth=Dimensions.get("window").width
    YellowBox.ignoreWarnings(['Warning: componentWillUpdate']);
    return (
      // <ScrollView >
      <View style={{flex:1}}>
        <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
        <View style={{flex:1}}>
       
          <ImageCarousel images={images}/>
         
        </View>
        
        <View style={{flex:2,justifyContent:'center',alignItems:'center',marginBottom:10,marginHorizontal:4}}>
          
          <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>{
                this.props.navigation.navigate('Item',{productCategoryId:1,itemCategory:'Tables'})}} > 
            <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,alignItems:'center',justifyContent:'center'}}>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'center'}}>Tables</Text>
                 <Image source={R.images.tableicon} style={{margin:6,width:imageWidth/4,height:imageWidth/4,alignSelf:'center'}}></Image>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={()=>{
                this.props.navigation.navigate('Item',{productCategoryId:3,itemCategory:'Sofas'})}}> 
            <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,justifyContent:'center'}}>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'center'}}>Sofas</Text>
                 <Image source={R.images.sofaicon} style={{margin:6,width:imageWidth/4,height:imageWidth/4,alignSelf:'center'}}></Image>
            </View>
            </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>{
                this.props.navigation.navigate('Item',{productCategoryId:2,itemCategory:'Chairs'})}} >  
          <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,alignItems:'center',justifyContent: 'center',}}>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'center'}}>Chairs</Text>
                 <Image source={R.images.chairsicon} style={{margin:6,width:imageWidth/4,height:imageWidth/4,alignSelf:'center'}}></Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={()=>{
                this.props.navigation.navigate('Item',{productCategoryId:4,itemCategory:'Cupboards'})}} >   
            <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,alignItems:'center',justifyContent:'center'}}>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'center'}}>Cupboards</Text>
                 <Image source={R.images.cupboardicon} style={{margin:6,width:imageWidth/4,height:imageWidth/4,alignSelf:'center'}}></Image>
            </View>
            </TouchableOpacity>
          </View>
          {/* <FlatList
             data={[{key:R.images.tableicon,id:1,itemType:'Tables'},{key:R.images.sofaicon,id:3,itemType:'Sofas'},{key:R.images.chairsicon,id:2,itemType:'Chairs'},{key:R.images.cupboardicon,id:4,itemType:'Cupboards'}]}
             renderItem={({item})=>
           

            <View style={{backgroundColor:R.color.backgroundColorDefault,borderRadius:6,width:width/3,height:width/3,marginTop:8,marginHorizontal:4}}>
              <TouchableOpacity onPress={()=>{
                
               this.props.navigation.navigate('Item',{productCategoryId:item.id,itemCategory:item.itemType})}}>
                 <View style={{alignItems:'center',justifyContent:'center'}}>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold}}>{item.itemType}</Text>
                 <Image source={item.key} style={{margin:6,width:width/3,height:width/3}}></Image>
                 </View>
              </TouchableOpacity>
             </View>
          }
             numColumns={2}
             keyExtractor={(item,index)=>index.toString()}
          /> */}

       </View>

      </View>
      // </ScrollView>
    );
  }
}
