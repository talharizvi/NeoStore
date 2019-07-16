import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import R from '../R'

const StarFilled=()=>{

    return (
      <View>
        <Image source={R.images.star_check} style={{height:20,width:20}}/> 
      </View>
    );
  
}

export default StarFilled
