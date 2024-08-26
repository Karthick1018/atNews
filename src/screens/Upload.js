
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, ImageBackground, } from 'react-native';
import { Rectangle, upload } from './image';
import { TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';



const Upload = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [event_date, setEvent_Date] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('')
    const [imageUri, setImageUri] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const categories = ['HBD', 'OnBoarding', 'Event'];

    const handleAddNews = async () => {
        try {
            // Send a POST request to add news
            await axios.post('http://192.168.0.193:1810/add', {
                title,
                description,
                imageUrl,
                event_date,
                category
            });

            setTitle('');
            setDescription('');
            setImageUrl('');
            setEvent_Date('');
            setCategory('');
        } catch (error) {
            console.error('Error adding news:', error);
            // Log additional error details
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request made but no response was received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    const captureImage = async () => {
        let options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            console.log(JSON.parse(JSON.stringify(response)));
            if (response.didCancel) {
                console.log('User cancelled image picker');
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

    return (

        <SafeAreaView style={Styles.container}>
            <ImageBackground source={Rectangle} style={{ height: '50%' }}>
                <TouchableOpacity
                    style={{ left: '5%', top: '5%' }}
                    onPress={() => {
                        navigation.navigate('Home')
                    }}>
                    <AntDesign name="arrowleft" size={25} color={'#FFFFFF'} />
                </TouchableOpacity>
                <View style={Styles.header_text_view}>
                    <Text
                        style={Styles.header_text}>
                        Aaludrites are waiting....!!!!
                    </Text>
                </View>
                <View style={Styles.header_view}>
                    <View style={Styles.image_upload_view}>
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => captureImage(false)}>
                                <Image
                                    source={upload}
                                    style={{
                                        height: '50%',
                                        width: '10%',
                                        alignSelf: 'center',
                                        top: '60%',
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={Styles.Input_view}>
                    <Text
                        style={Styles.lable_text}>
                        Title
                    </Text>
                    <TextInput
                        placeholder='Title of the post'
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        style={Styles.input_box} />
                </View>
                <View
                    style={{ ...Styles.Input_view, marginTop: '10%' }}>
                    <Text
                        style={Styles.lable_text}>
                        Description
                    </Text>
                    <TextInput
                        placeholder='Description of the post'
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        style={Styles.input_box} />
                </View>
                <View style={{ ...Styles.Input_view, marginTop: '10%' }}>
                    <Text style={Styles.lable_text}>Category</Text>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={Styles.input_box}
                    >
                        <Picker.Item label="Select a category" value="" />
                        {categories.map((cat, index) => (
                            <Picker.Item key={index} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>
                <View
                    style={{ ...Styles.Input_view, marginTop: '10%' }}>
                    <Text
                        style={Styles.lable_text}>
                        Date
                    </Text>
                    <TextInput
                        placeholder='Date of the post'
                        value={event_date}
                        onChangeText={(text) => setEvent_Date(text)}
                        style={Styles.input_box} />
                </View>
                <View
                    style={{ ...Styles.Input_view, marginTop: '10%' }}>
                    <Text
                        style={Styles.lable_text}>
                        Image URL
                    </Text>
                    <TextInput
                        placeholder='Image URL of the post'
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        style={Styles.input_box} />
                </View>
                <View style={{ marginBottom: '5%', height: '10%' }}>

                </View>
            </ScrollView>
            <View
                style={{ height: '5%', width: '100%', justifyContent: 'center', alignSelf: 'center', }}>
                <TouchableOpacity
                    onPress={handleAddNews}
                    style={Styles.upload_touch}>
                    <Text
                        style={{ textAlign: 'center', fontSize: 15, fontWeight: '700', color: '#FFF' }}>
                        Upload
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default Upload;

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_view: {
        height: '50%',
        marginTop: '15%'
    },
    image_upload_view: {
        height: '60%',
        borderWidth: 1,
        marginTop: '8%',
        width: '70%',
        alignSelf: 'center',
        borderStyle: 'dotted',
        borderRadius: 10
    },
    header_text_view: {
        marginTop: '10%',
        height: '22%',
        justifyContent: 'center'
    },
    Input_view: {
        alignItems: 'center',
    },
    lable_text: {
        fontWeight: '900',
        fontSize: 15,
        color: '#000'
    },
    input_box: {
        borderWidth: 1,
        width: '85%',
        textAlign: 'center',
        marginTop: '5%',
        borderStyle: 'dotted',
        borderRadius: 10
    },
    upload_touch: {
        justifyContent: 'center',
        backgroundColor: '#2ea0f2',
        height: '100%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 20
    },
    header_text: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '900', fontSize: 22

    }
})