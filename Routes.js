import { createStackNavigator, createAppContainer ,createDrawerNavigator} from "react-navigation";
import LoginScreen from "./app/src/screens/LoginScreen";
import ForgotPasswordScreen from "./app/src/screens/ForgotPasswordScreen";
import RegisterScreen from "./app/src/screens/RegisterScreen";
import HomeScreen from "./app/src/screens/HomeScreen";
import TableScreen from "./app/src/screens/TableScreen";
import DetailScreen from "./app/src/screens/DetailScreen";
import CartScreen from "./app/src/screens/CartScreen";
import AddressScreen from "./app/src/screens/AddressScreen"; 
import Sofas from "./app/src/screens/Sofas";
import Tables from "./app/src/screens/Tables";
import CustomDrawer from "./app/src/components/CustomDrawer";
import Chair from "./app/src/screens/Chairs";
import Cupboard  from "./app/src/screens/Cupboards";
import StoreLocator from "./app/src/screens/StoreLocator";
import MyAccount from "./app/src/screens/MyAccount";
import MyOrder from "./app/src/screens/MyOrders";


const MainNavigator= createStackNavigator({
  Register:{screen:RegisterScreen},  
  Login:{screen:LoginScreen},
    Home:{screen:HomeScreen},
    Address:{screen:AddressScreen},
    
    Table:{screen:TableScreen},
    MyCart:{screen:CartScreen},
   
    ForgotPassWord:{screen:ForgotPasswordScreen},
    Detail:{screen:DetailScreen},
    Address:{screen:AddressScreen},
    Sofa:{screen:Sofas},
    Tables:{screen:Tables},
    Chair:{screen:Chair},
    Cupboard:{screen:Cupboard},
    StoreLocator:{screen:StoreLocator},
    MyAccount:{screen:MyAccount},
    MyOrder:{screen:MyOrder},
},
);

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

 //const AppNavigator=createAppContainer(MainNavigator)
const AppNavigator=createAppContainer(DrawerNavigator)
export default AppNavigator