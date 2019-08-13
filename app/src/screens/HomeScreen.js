import React, { Component } from 'react';
import { View, Text,Image,ScrollView,FlatList,TouchableOpacity,StatusBar,YellowBox } from 'react-native';
import R from '../R';
import HamburgerIcon from '../components/HamburgerIcon';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import ShoppingCartButton from '../components/ShoppingCartButton';

export default class HomeScreen extends Component {
  

  static navigationOptions=({navigation})=>({
    title:'NeoStore',
    headerStyle:{
      backgroundColor:R.color.backgroundColorDefault
  },
    headerLeft:
     <HamburgerIcon navigationProps={navigation} />,
     headerRight:(
    //   <TouchableOpacity>
    //  <Image source={R.images.header_shopping_cart} style={{width:20,height:20,marginRight:10}} />
    //  </TouchableOpacity>
      <ShoppingCartButton onPress={()=>{navigation.navigate('MyCart')}}/>
    )
    //  <Image source={R.images.header_shopping_cart} style={{width:20,height:20,marginRight:10}}  onPress={()=>{alert("Hi")}}/>,
   
     
  }) 

    state={
      productCategoryId:1
    }

    renderDotIndicator() {
      return <PagerDotIndicator pageCount={4} />;
  }

  render() {
    YellowBox.ignoreWarnings(['Warning: componentWillUpdate']);
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={R.color.backgroundColorDefault}></StatusBar>
        <View style={{flex:2}}>
          {/* <ScrollView horizontal={true} >
            <Image source={R.images.slider_img1} style={{width:393,height:'100%'}}></Image>
            <Image source={R.images.slider_img2} style={{width:393,height:'100%'}}></Image>
            <Image source={R.images.slider_img3} style={{width:393,height:'100%'}}></Image>
            <Image source={R.images.slider_img4} style={{width:393,height:'100%'}}></Image>
          </ScrollView> */}
          <IndicatorViewPager
                     style={{height:260}}
                    indicator={this.renderDotIndicator()}
          >
            <View>
            <Image source={R.images.slider_img1} style={{width:'100%',height:'100%'}}></Image>
            </View>
            <View>
            <Image source={R.images.slider_img2} style={{width:'100%',height:'100%'}}></Image>
            </View>
            <View>
            <Image source={R.images.slider_img3} style={{width:'100%',height:'100%'}}></Image>
            </View>
            <View>
            <Image source={R.images.slider_img4} style={{width:'100%',height:'100%'}}></Image>
            </View>
        </IndicatorViewPager>
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
    );
  }
}
