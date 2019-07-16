import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./app/src/screens/LoginScreen";
import ForgotPasswordScreen from "./app/src/screens/ForgotPasswordScreen";
import RegisterScreen from "./app/src/screens/RegisterScreen";
import HomeScreen from "./app/src/screens/HomeScreen";
import TableScreen from "./app/src/screens/TableScreen";
import DetailScreen from "./app/src/screens/DetailScreen";



const MainNavigator= createStackNavigator({
    Home:{screen:HomeScreen},

    Table:{screen:TableScreen},
    Login:{screen:LoginScreen},
    ForgotPassWord:{screen:ForgotPasswordScreen},
    Detail:{screen:DetailScreen},
    Register:{screen:RegisterScreen,   
    }
},

);

const AppNavigator=createAppContainer(MainNavigator)
export default AppNavigator