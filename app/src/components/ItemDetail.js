import React, { Component } from 'react';
            <Text>Table type</Text>
import {View,Image,Text,} from "react-native";
import StarFilled from './StarFilled';
import StarUnfilled from './StarUnfilled';




const ItemDetail=({itemImage,itemName,itemProducer,itemCost,itemRating})=>{
    
    
   

    return(   
    
    <View  style={{flexDirection: 'row',margin:10}}>
        <View>
            <Image source={{uri:itemImage}} style={{height:80,width:80}}></Image>
        </View>

        <View>    
            <View style={{marginLeft:10}}>
                <Text>{itemName}</Text>
                <Text>{itemProducer}</Text>
            </View>

            <View style={{margin:10,flexDirection:'row',}}>
                <Text>{itemCost}</Text>
                <View style={{flexDirection:'row',marginLeft:150}}>{renderRating(itemRating)}</View>
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
            elements.map((item)=>{
                return(
                <View >
                {item}
                </View>
                    )
            }) 
            
        )
        
    }

export default ItemDetail