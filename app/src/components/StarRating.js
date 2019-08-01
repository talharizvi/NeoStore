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
  constructor(props) {
    super(props);
    this.state = {
      Default_Rating: 1,
      Max_Rating: 5,
    };
   
    this.Star = R.images.star_check
    this.Star_With_Border = R.images.star_unchek
}
  updateRating(key) {
    this.setState({ Default_Rating: key });
    this.callRatingApi(this.props.productId,key)
  }

  callRatingApi(id,rate){
    fetch('http://staging.php-dev.in:8844/trainingapp/api/products/setRating',{
            method:'POST',
            headers:{
               
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
                `product_id=${id}rating=${rate}`
            
        }).then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson)
        })
  }

  render() {
    let ratingArray = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      ratingArray.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.updateRating.bind(this, i)
            
          }
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
      <View >
        <View style={styles.childView}>{ratingArray}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
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