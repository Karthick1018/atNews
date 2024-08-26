import React, { useState } from "react";
import { SafeAreaView, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Linking, KeyboardAvoidingView, Platform } from "react-native";
import auth from '@react-native-firebase/auth';
import { Rectangle } from "./image";
import AntDesign from "react-native-vector-icons/AntDesign";

const Forgot = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState('false')
    const [password, setPassword] = useState('');

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(text);
        setIsValidEmail(isValid)
        setEmail(text)
    }

    const handleSignIn = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.replace('Login');
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
                console.log(error, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            });
    };

    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ImageBackground source={Rectangle} style={{ flex: 1 }}>
                    <View
                        style={styles.header_view}>
                        <TouchableOpacity
                            style={{ left: '5%', bottom: '25%' }}
                            onPress={() => {
                                navigation.navigate('Login')
                            }}>
                            <AntDesign name="arrowleft" size={25} color={'#FFFFFF'} />
                        </TouchableOpacity>
                        <Text
                            style={styles.header_text}>
                            Create a new account
                        </Text>
                    </View>
                </ImageBackground>
                <View
                    style={styles.input_view}>
                    {/* <View
                    style={styles.input}>
                    <Text style={styles.input_head_text}>
                        Emp no :
                    </Text>
                    <TextInput placeholder="Enter your name" style={styles.input_feild} />
                </View> */}
                    <View
                        style={{ ...styles.input, marginTop: '5%' }}>
                        <Text style={styles.input_head_text}>
                            Email Address :
                        </Text>
                        <TextInput
                            placeholder="Enter your email address"
                            style={styles.input_feild}
                            onChangeText={validateEmail}
                            value={email}
                        />
                        {!isValidEmail && <Text style={{ left: '30%', color: 'red' }}>Invalid email format</Text>}
                    </View>
                    <View
                        style={{ ...styles.input }}>
                        <Text style={styles.input_head_text}>
                            Password :
                        </Text>
                        <TextInput
                            placeholder="Enter the password"
                            style={styles.input_feild}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.sign_up_view}>
                    <TouchableOpacity style={styles.sign_up} onPress={handleSignIn}>
                        <Text style={styles.sign_up_text}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
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
                            <AntDesign name="earth" size={19} color="#0077B5" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://www.facebook.com/')}>
                            <AntDesign
                                name="facebook-square"
                                size={23}
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
    );
}

export default Forgot;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header_view: {
        height: 250,
        justifyContent: 'center'
    },
    header_text: {
        fontWeight: '800',
        fontSize: 22,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    input_view: {
        height: 300,
        justifyContent: 'space-around',
        padding: 30,
    },
    input: {
        marginLeft: '5%',
    },
    sign_up: {
        backgroundColor: '#2ea0f2',
        height: '50%',
        width: '50%',
        marginTop: '5%',
        borderRadius: 20

    },
    sign_up_view: {
        height: '10%',
        alignItems: 'center',
    },
    sign_up_text: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: "center",
        marginTop: '2%',
        color: '#FFFFFF'
    },
    input_feild: {
        borderWidth: 1,
        width: '80%',
        textAlign: 'center', marginTop: '2%',
        borderRadius: 20, alignSelf: 'center'
    },
    foot_view: {
        height: '20%',
        // backgroundColor: '#000'
        // marginTop: '10%'
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
    input_head_text: {
        fontWeight: '600',
        fontSize: 15,
        color: '#000',
        textAlign: 'center'
    }
})