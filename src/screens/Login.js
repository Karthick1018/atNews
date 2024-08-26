import React, { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, StyleSheet, Text, Linking, View, KeyboardAvoidingView, Platform } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import ReactNativeBiometrics from 'react-native-biometrics'
import { Rectangle, } from "./image";
import auth from '@react-native-firebase/auth'
import Entypo from 'react-native-vector-icons/Entypo'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(text);
        setIsValidEmail(isValid)
        setEmail(text)
    }

    const validatePass = () => {
        return password.length >= 6
    }

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Warning!', 'Please enter the values');
                return;
            }

            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // if (email === "Test@gmail.com" && password === "Test123") {
            if (email === "Admin@gmail.com" && password === "Admin123") {
                navigation.replace('Home');
            } else {
                navigation.replace('UserScreen');
            }
        } catch (error) {
            Alert.alert('Try again', 'The password or email incorrect')
        }
    };

    useEffect(() => {
        validateBio()
    }, [])

    const validateBio = () => {
        try {
            const rnBiometrics = new ReactNativeBiometrics()

            rnBiometrics.simplePrompt({ promptMessage: 'Unlock atNews' })
                .then((resultObject) => {
                    const { success } = resultObject
                    if (success) {
                        navigation.replace('UserScreen')
                        console.log('successful biometrics provided')
                    } else {
                        console.log('user cancelled biometric prompt')
                    }
                })
                .catch(() => {
                    console.log('biometrics failed')
                })

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ImageBackground
                    source={Rectangle} style={{ flex: 1 }}>
                    <View
                        style={styles.header_view}>
                        <Text
                            style={styles.welcome_text}>
                            Welcome Back
                        </Text>
                    </View>
                </ImageBackground>

                <View
                    style={styles.body_view}>
                    <View
                        style={styles.input_view}>
                        <AntDesign
                            name="user"
                            size={20}
                            color={'#FFF'}
                            style={{ marginLeft: '10%' }} />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'#FFF'}
                            underlineColorAndroid='#FFF'
                            style={{ marginLeft: '10%', width: '50%', color: '#000000' }}
                            value={email}
                            onChangeText={validateEmail}
                        />
                    </View>
                    {!isValidEmail && <Text style={{ color: 'red', fontSize: 12, marginTop: 10, top: 10, left: '35%' }}>Invalid email format</Text>}

                    <View style={{ ...styles.input_view, bottom: '10%' }}>
                        <Entypo
                            name={showPassword ? 'eye' : 'eye-with-line'}
                            size={20}
                            color={'#FFF'}
                            style={{ marginLeft: '10%' }}
                            onPress={togglePasswordVisibility}
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            placeholderTextColor={'#FFF'}
                            underlineColorAndroid='#FFF'
                            style={{ marginLeft: '10%', width: '50%' }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    {!validatePass() && password.length > 0 && (
                        <Text style={{ color: 'red', fontSize: 12, left: '20%', justifyContent: 'center', bottom: 18 }}>
                            Password must be at least 6 characters long.
                        </Text>
                    )}
                    <TouchableOpacity
                        style={{ ...styles.input_view, width: '30%', bottom: '20%', justifyContent: 'center' }}
                        onPress={handleLogin} >
                        <Text
                            style={{ textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', bottom: '5%' }}>
                        <TouchableOpacity>
                            <Text>
                                Forgot password ?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.replace('Forgot')
                        }}>
                            <Text>
                                Sign up !
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={styles.foot_view}>
                    <Text
                        style={styles.social_text}>
                        Follow our social media
                    </Text>
                    <View
                        style={styles.social_view}>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://aaludra.com/')}>
                            <AntDesign name="earth" size={22} color="#0077B5" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://www.facebook.com/')}>
                            <Entypo
                                name="facebook-with-circle"
                                size={25}
                                color={'#1877f2'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://www.linkedin.com/company/aaludratech/')}>
                            <AntDesign
                                name="linkedin-square"
                                size={23}
                                color={'#0077B5'} />
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Login;


const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header_view: {
        height: 230,
    },
    body_view: {
        height: 300,
        justifyContent: 'space-evenly',
        marginTop: '10%'
    },
    foot_view: {
        height: '20%',
        marginTop: '10%'
    },
    singin: {
        height: '20%',
        backgroundColor: '#4ae0ed',
        width: '75%',
        alignSelf: 'center',
        borderRadius: 30,
        justifyContent: 'center'
    },
    signin_text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    signup_text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    social_text: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center'
    },
    social_view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '5%',
        paddingHorizontal: 100
    },
    input_view: {
        flexDirection: 'row',
        marginTop: '20%',
        height: '14%',
        alignItems: 'center',
        alignSelf: 'center',
        width: '62%',
        backgroundColor: '#2ea0f2',
        borderRadius: 30,
        opacity: .80
    },
    welcome_text: {
        fontSize: 30,
        fontWeight: '800',
        color: '#FFF',
        textAlign: 'center',
        marginTop: '15%',
        fontFamily: 'Helvetica'
    }

})