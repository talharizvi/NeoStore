import {StyleSheet} from 'react-native';
import R from './R';

const style=StyleSheet.create({
    
    textInputStyle:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: R.color.textInputBorderColor,
      margin: 10,
      marginHorizontal:20  
    },
    headerTitleStyle:{
        fontSize:40,
        marginTop:150,
        textAlign:'center',
        color:R.color.textInputBorderColor,
    },
    buttonStyle:{
         flexDirection: 'column',
         justifyContent: 'center',
         borderRadius: 5,
         backgroundColor: R.color.textInputBorderColor,
         marginBottom: 20,
         paddingLeft:120,
         paddingRight: 120,
         paddingTop: 10, 
         paddingBottom:10,
         marginTop:20  
    },
    toolbarTitleStyle:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 28
    }


})

export default style