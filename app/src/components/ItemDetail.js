import React, { Component } from 'react';
import {View,Image,Text,} from "react-native";
import StarFilled from './StarFilled';
import StarUnfilled from './StarUnfilled';
import R from '../R';

const ItemDetail=({itemImage,itemName,itemProducer,itemCost,itemRating})=>{

    return(   

    <View  style={{flex:1,flexDirection: 'row',margin:10,alignSelf:'center',justifyContent:'center',backgroundColor:R.color.cardBackground,borderRadius:8,paddingVertical:10}} >
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Image source={{uri:itemImage}} style={{height:80,width:80}}></Image>
    </View>

    <View style={{flex:2,alignSelf:'center'}}>    
        <View style={{flex: 2,marginLeft:10}}>
            <Text style={{fontFamily:R.fonts.GothamBlack}}>{itemName}</Text>
            <Text style={{fontFamily:R.fonts.GothamBlack}}>{itemProducer}</Text>
        </View>

        <View style={{flex:2,margin:10,flexDirection:'row',justifyContent:'center' ,alignItems:'center'}}>
            

            <Text style={{flex:1,color:R.color.backgroundColorDefault,fontFamily:R.fonts.GothamBlack,}}>Rs {itemCost}</Text>
            <View style={{flexDirection:'row',}}>{renderRating(itemRating)}</View>
        </View>

    </View>
</View>

    )


}

    function renderRating(count){
        var elements=[]    
        for(i=0;i<count;i++){
            elements.push(<StarFilled/>)         
        }

        for(j=count;j<5;j++){
            elements.push(<StarUnfilled/>)      
        } 

        return(
            elements.map((item,i)=>{
                return(
                <View key={item}  keyExtractor={(item,index)=>index.toString()}>
                {item}
                </View>)
            }) 
        )
    }

export default ItemDetail 

