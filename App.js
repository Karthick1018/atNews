import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import Root from "./root";
import auth from '@react-native-firebase/auth';

const App = () => {
  // useEffect(() => {
  //   // Initialize Firebase
  //   if (!auth().apps.length) {
  //     auth().initializeApp({
  //       // Your Firebase config here
  //     });
  //   }
  // }, []);


  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  )
}

export default App;