import React, { Component } from 'react';
import {View,Image} from 'react-native';
import R from '../R';

const StarUnfilled=()=>{
    return (
        <View>
          <Image source={R.images.star_unchek} style={{height:20,width:20}}/> 
        </View>
      );
}

export default StarUnfilled