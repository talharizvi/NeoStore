import React from 'react';
import { View, Text,Image,TouchableOpacity,StatusBar,YellowBox,Dimensions} from 'react-native';
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


  HomeScreen.navigationOptions=({navigation})=>({
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

  

export default function HomeScreen(props){
  const imageWidth=Dimensions.get("window").width
  YellowBox.ignoreWarnings(['Warning: componentWillUpdate']);
  console.disableYellowBox = true;
  return(
          <View style={{flex:1}}>
            <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
            <View style={{flex:1}}>
       
            <ImageCarousel images={images}/>
         
            </View>
        
        <View style={{flex:2,justifyContent:'center',alignItems:'center',marginBottom:10,marginHorizontal:4}}>
          
          <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>{
                props.navigation.navigate('Item',{productCategoryId:1,itemCategory:'Tables'})}} > 
            <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,alignItems:'center',justifyContent:'center'}}>
                 <Text style={{alignSelf:'flex-end',color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,marginEnd:10}}>Tables</Text>
                 <Image source={R.images.tableicon} style={{margin:6,width:imageWidth/5,height:imageWidth/5,alignSelf:'flex-start'}}></Image>
            </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={()=>{
                props.navigation.navigate('Item',{productCategoryId:3,itemCategory:'Sofas'})}}> 
            <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,justifyContent:'center'}}>
                 <Image source={R.images.sofaicon} style={{margin:6,width:imageWidth/5,height:imageWidth/5,alignSelf:'flex-end'}}></Image>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'flex-start',marginLeft:10}}>Sofas</Text>
                
            </View>
            </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>{
                props.navigation.navigate('Item',{productCategoryId:2,itemCategory:'Chairs'})}} >  
          <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,justifyContent: 'center',}}>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'flex-start',marginLeft:10}}>Chairs</Text>
                 <Image source={R.images.chairsicon} style={{margin:6,width:imageWidth/5,height:imageWidth/5,alignSelf:'flex-end'}}></Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={()=>{
                props.navigation.navigate('Item',{productCategoryId:4,itemCategory:'Cupboards'})}} >   
            <View style={{flex:1,backgroundColor:R.color.backgroundColorDefault,borderRadius:6,marginTop:8,marginHorizontal:4,justifyContent:'center'}}>
                 <Image source={R.images.cupboardicon} style={{margin:6,width:imageWidth/5,height:imageWidth/5,alignSelf:'flex-start'}}></Image>
                 <Text style={{color:R.color.textInputBorderColor,fontSize: 20,fontFamily:R.fonts.GothamBold,alignSelf:'flex-end',marginRight:10}}>Cupboards</Text>
                
            </View>
            </TouchableOpacity>
          </View>
        

       </View>

      </View>
  )
}
