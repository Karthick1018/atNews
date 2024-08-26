import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import News from "./src/screens/News";
import ProfileEdit from "./src/screens/ProfileEdit";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";
import Landing from "./src/screens/Landing";
import Upload from "./src/screens/Upload";
import Forgot from "./src/screens/Forgot";
import UserScreen from "./src/screens/UserScreen";
import ResetPassword from "./src/screens/ResetPassword";

const Stack = createNativeStackNavigator();

const Root = () => {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Splash" component={Splash} /> */}
            {/* <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_bottom' }} /> */}
            <Stack.Screen name="Home" component={Home} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="News" component={News} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ animation: 'slide_from_left' }} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Upload" component={Upload} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="UserScreen" component={UserScreen} />
            {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
        </Stack.Navigator>
    )
}
export default Root;