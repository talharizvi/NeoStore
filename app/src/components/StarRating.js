import React, { Component } from 'react';
import R from '../R';
 
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';


export default class StarRating extends Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 1,
      Max_Rating: 5,
    };
   
    this.Star = R.images.star_check
    this.Star_With_Border = R.images.star_unchek
}
  updateRating(key) {
    this.setState({ Default_Rating: key });
  }
  render() {
    let ratingArray = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      ratingArray.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.updateRating.bind(this, i)}
          >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                    ?this.Star
                    :this.Star_With_Border
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <View style={styles.childView}>{ratingArray}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    
    
   // paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
 
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
 
});