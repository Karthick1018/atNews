import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC_v0MvyIQp7U8Hkf27I4BAkPe_yebvfZ0",
    authDomain: "atnews-1810.firebaseapp.com",
    projectId: "atnews-1810",
    storageBucket: "atnews-1810.appspot.com",
    messagingSenderId: "205461655074",
    appId: "1:205461655074:web:81f7c1f2b2fab32abd047b",
    measurementId: "G-5TH3JEFKMZ"
};
initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
