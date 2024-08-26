import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, PermissionsAndroid, Platform, Image, Alert } from 'react-native'
import { Card } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Rectangle } from "./image";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const ProfileEdit = () => {
    const [imageUri, setImageUri] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [id, setId] = useState('')
    const [contact, setContact] = useState('')
    const [image, setImage] = useState('')
    const [profileDetails, setProfileDetails] = useState('')
    const [isValidEmail, setIsValidEmail] = useState('false')

    const placeholderImage = require('../assets/Images/Profile_placeholder.jpg');

    const navigation = useNavigation();

    const captureImage = async (isCamera) => {
        let options = {
            mediaType: 'photo',
        };

        let isPermissionGranted = false;

        if (isCamera) {
            isPermissionGranted = await requestCameraPermission();
            if (!isPermissionGranted) return;
        }

        let imagePickerFunction = isCamera ? launchCamera : launchImageLibrary;

        imagePickerFunction(options, (response) => {
            console.log(JSON.parse(JSON.stringify(response)));
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
            } else {
                setImage(response.assets[0].uri);
                setImageUri(response.assets[0].uri);
                setModalVisible(false);
            }
        });
    };
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const handleConsole = () => {
        const values = {
            name,
            mail,
            id,
            contact,
            image
        };

        console.log(handleConsole);

        if (Object.values(values).every(value => value)) {
            setProfileDetails(values);
            navigation.navigate('Profile', { profileDetails: { add: values } });
        } else {
            Alert.alert('Invalid values', 'Please fill in all fields correctly.');
        }
    };

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(text);
        setIsValidEmail(isValid)
        setMail(text);
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile_view}>
                <ImageBackground source={Rectangle} style={{ height: '80%' }}>
                    <TouchableOpacity
                        style={{ left: '5%', top: '5%' }}
                        onPress={() => {
                            navigation.navigate('Profile')
                        }}>
                        <AntDesign name="arrowleft" size={25} color={'#FFFFFF'} />
                    </TouchableOpacity>
                    <View
                        style={{ height: '100%', flexDirection: '' }}>
                        <TouchableOpacity
                            style={{ marginTop: '10%', width: '50%', alignSelf: 'center', left: '10%' }}
                            onPress={() => setModalVisible(true)}>
                            <Image
                                source={imageUri ? { uri: imageUri } : placeholderImage}
                                style={{
                                    height: 150,
                                    width: "80%",
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    left: '30%',
                                    // top: '20%',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={{ left: '60%', position: 'absolute', bottom: '67%', flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity
                                    onPress={() => captureImage(true)}>
                                    <AntDesign name="camera" size={25} color={'#000'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginLeft: '20%' }}
                                    onPress={() => captureImage(false)}>
                                    <FontAwesome name="file-photo-o" color='#000' size={20} />
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.details_view}>
                <View>
                    <Text style={styles.Text}>
                        Name :
                    </Text>
                    <TextInput placeholder='Name'
                        placeholderTextColor={'#000'}
                        style={styles.input_view}
                        underlineColorAndroid={'#4ae0ed'}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        maxLength={20} />

                </View>
                <View>
                    <Text style={styles.Text}>
                        Email Address :
                    </Text>
                    <TextInput
                        placeholder='abc@aaludra.com'
                        placeholderTextColor={'#000'}
                        style={styles.input_view}
                        keyboardType='email-address'
                        underlineColorAndroid={'#4ae0ed'}
                        // value={mail}
                        onChangeText={validateEmail}
                    />
                    {!isValidEmail && <Text style={{ color: 'red', fontSize: 12, marginTop: 10, left: '35%' }}>Invalid email format</Text>}
                </View>
                <View>
                    <Text style={styles.Text}>
                        Emp_ID :
                    </Text>
                    <TextInput
                        placeholder='4600'
                        placeholderTextColor={'#000'}
                        style={styles.input_view}
                        keyboardType='phone-pad'
                        underlineColorAndroid={'#4ae0ed'}
                        value={id}
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, '');
                            setId(numericText.substring(0, 10));
                        }} maxLength={10} />
                </View>
                <View>
                    <Text style={styles.Text}>
                        Contact :
                    </Text>
                    <TextInput
                        placeholder='999-999-9999'
                        placeholderTextColor={'#000'}
                        style={styles.input_view}
                        keyboardType='phone-pad'
                        underlineColorAndroid={'#4ae0ed'}
                        value={contact}
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, '');
                            setContact(numericText.substring(0, 10));
                        }} maxLength={10} />
                </View>

            </View>
            <View style={styles.update_view}>
                <TouchableOpacity
                    style={{ backgroundColor: '#4ae0ed', width: '50%', marginLeft: '23%', height: 40, borderRadius: 20 }}
                    onPress={handleConsole}>
                    <Text style={{ textAlign: 'center', top: 9 }}>
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default ProfileEdit;




const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile_view: {
        // backgroundColor: 'red',
        height: '40%'
        // height: 300
    },
    details_view: {
        // backgroundColor: 'blue',
        height: '60%',
        padding: 50,
        paddingTop: -10

    },
    update_view: {
        position: 'absolute',
        bottom: '2%',
        height: 40,
        width: '100%'
    },
    input_view: {
        left: '5%',
        opacity: 0.5
    },
    Text: {
        fontSize: 15,
        fontWeight: '600'
    },
})