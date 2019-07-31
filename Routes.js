import { createStackNavigator, createAppContainer ,createDrawerNavigator, createSwitchNavigator} from "react-navigation";
import LoginScreen from "./app/src/screens/LoginScreen";
import ForgotPasswordScreen from "./app/src/screens/ForgotPasswordScreen";
import RegisterScreen from "./app/src/screens/RegisterScreen";
import HomeScreen from "./app/src/screens/HomeScreen";
import ItemScreen from "./app/src/screens/ItemScreen";
import DetailScreen from "./app/src/screens/DetailScreen";
import CartScreen from "./app/src/screens/CartScreen";
import AddressScreen from "./app/src/screens/AddressScreen"; 
import CustomDrawer from "./app/src/components/CustomDrawer";
import StoreLocator from "./app/src/screens/StoreLocator";
import MyAccount from "./app/src/screens/MyAccount";
import MyOrder from "./app/src/screens/MyOrders";
import LaunchScreen from "./app/src/screens/LaunchScreen";
import EditProfile from "./app/src/screens/EditProfile";
import AddressList from "./app/src/screens/AddressList";
import OrderDetail from "./app/src/screens/OrderDetail";


const MainNavigator= createStackNavigator({
  Home:{screen:HomeScreen},
  Address:{screen:AddressScreen}, 
  AddressList:{screen:AddressList},
   
  MyCart:{screen:CartScreen},
    
    
    EditProfile:{screen:EditProfile},
    Item:{screen:ItemScreen},
   
    Detail:{screen:DetailScreen},
    StoreLocator:{screen:StoreLocator},
    MyAccount:{screen:MyAccount},
    MyOrder:{screen:MyOrder},
    OrderDetail:{screen:OrderDetail}
},
);


const SessionNavigator=createStackNavigator({
  Login:{screen:LoginScreen},
  Register:{screen:RegisterScreen},
  ForgotPassWord:{screen:ForgotPasswordScreen},  
})

const DrawerNavigator = createDrawerNavigator({

    Drawer:{
        screen:MainNavigator
    },  
  },{
    initialRouteName:"Drawer",
    contentComponent:CustomDrawer,
    drawerWidth: 250
  }
  );



const switchNavigator = createSwitchNavigator({
    Launch:{
      screen:LaunchScreen
    },
    HomeStack:{
      screen:DrawerNavigator
    },
    SessionStack:{
      screen:SessionNavigator
    }
})

 

const AppNavigator=createAppContainer(switchNavigator)
export default AppNavigator