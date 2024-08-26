import React, { useState } from "react";
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { Profile_placeholder, Rectangle } from "./image";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {

    const LogOut = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        navigation.navigate('Login');
                    },
                },
            ],
            {
                cancelable: false,
                textStyle: {
                    color: 'red',
                    fontSize: 18,
                },
            }
        );
    };
    const { profileDetails } = route.params ?? {};

    const navigation = useNavigation();


    return (
        <SafeAreaView
            style={styles.container}>
            <View
                style={styles.header_view}>
                <ImageBackground
                    source={Rectangle}
                    style={styles.bg_image} >
                    <View
                        style={styles.back_icon_view}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Home')
                            }}>
                            <AntDesign name="arrowleft" size={25} color={'#FFFFFF'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={LogOut}
                            style={{ backgroundColor: '#FFFFFF', height: '150%', width: '10%', borderRadius: 100, }}>
                            <AntDesign name={'logout'}
                                size={15}
                                color={'red'}
                                style={{ alignSelf: 'center', top: '30%' }} />
                            {/* {showIcons && (
                                <View
                                    style={{
                                        marginTop: '50%',
                                        height: '115%',
                                        width: '200%',
                                        marginLeft: '-80%',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('ProfileEdit')
                                    }}
                                        style={{
                                            backgroundColor: 'red',
                                            borderRadius: 50,
                                            height: '50%',
                                            width: '80%',
                                            justifyContent: 'space-around',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Feather name="edit" size={18} color={'#FFFFFF'} style={{ alignSelf: 'center' }} />
                                        <Text>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Login');
                                            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<jjfjfjf>>>>>>>>>>>>>>>>>>>>>>>>>>.')
                                        }}
                                        style={{
                                            backgroundColor: 'red',
                                            borderRadius: 50,
                                            height: '50%',
                                            width: '80%',
                                            justifyContent: 'space-around',
                                            flexDirection: 'row',
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            marginTop: '20%'

                                        }}
                                    >
                                        <Feather name="edit" size={18} color={'#FFFFFF'} style={{ alignSelf: 'center' }} />
                                        <Text style={{ color: '#FFFFFF' }}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            )} */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.name_view}>
                        <Text style={styles.name_text}>
                            {profileDetails ? profileDetails.add.name : "Karthi"}</Text>
                        <Text style={styles.mail_text}>
                            {profileDetails ? profileDetails.add.mail : "abc@aaludra.com"}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ProfileEdit')
                        }}
                        style={styles.profile_view}>
                        <Image
                            source={
                                profileDetails && profileDetails.add.image
                                    ? { uri: profileDetails.add.image }
                                    : Profile_placeholder
                            } style={styles.profile_image} />
                        <AntDesign name="pluscircle" size={30} color='#65f093' style={{ marginLeft: '76%', bottom: '27%', fontWeight: 'bold' }} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.details_view}>
                <View style={styles.company_view}>
                    <AntDesign name="earth" size={20} color={'#4a6ef0'} style={styles.back_icon_view} />
                    <View style={styles.detail_text_view}>
                        <Text style={styles.title_text}>
                            Comapany
                        </Text>
                        <Text style={styles.input_text}>
                            ATS
                        </Text>
                    </View>
                </View>
                <View style={styles.company_view}>
                    <AntDesign name="user" size={20} color={'#4a6ef0'} style={styles.back_icon_view} />
                    <View style={styles.detail_text_view}>
                        <Text style={styles.title_text}>
                            Name
                        </Text>
                        <Text style={styles.input_text}>
                            {profileDetails ? profileDetails.add.name : "Karthi"}
                        </Text>
                    </View>
                </View>
                <View style={styles.company_view}>
                    <AntDesign name="mail" size={20} color={'#4a6ef0'} style={styles.back_icon_view} />
                    <View style={styles.detail_text_view}>
                        <Text style={styles.title_text}>
                            Mail
                        </Text>
                        <Text style={styles.input_text}>
                            {profileDetails ? profileDetails.add.mail : "abc@aaludra.com"}
                        </Text>
                    </View>
                </View>
                <View style={styles.company_view}>
                    <AntDesign name="idcard" size={20} color={'#4a6ef0'} style={styles.back_icon_view} />
                    <View style={styles.detail_text_view}>
                        <Text style={styles.title_text}>
                            ID Number
                        </Text>
                        <Text style={styles.input_text}>
                            {profileDetails ? profileDetails.add.id : "4600"}
                        </Text>
                    </View>
                </View>
                <View style={styles.company_view}>
                    <AntDesign name="phone" size={20} color={'#4a6ef0'} style={styles.back_icon_view} />
                    <View style={styles.detail_text_view}>
                        <Text style={styles.title_text}>
                            Phone
                        </Text>
                        <Text style={styles.input_text}>
                            {profileDetails ? profileDetails.add.contact : "+91 123-456-7890"}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_view: {
        height: 260,
        // backgroundColor: '#000'
    },
    bg_image: {
        height: '90%',
        width: '100%'
    },
    back_icon_view: {
        height: 25,
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    name_view: {
        // backgroundColor: 'red',
        height: 80,
        marginTop: '2%'
    },
    name_text: {
        marginLeft: '10%',
        fontSize: 18,
        fontWeight: '800',
        justifyContent: 'space-between',
        marginTop: '5%',
        color: '#FFF'
    },
    mail_text: {
        marginLeft: '12%',
        fontSize: 15,
        fontWeight: '500',
        marginTop: '3%',
        color: '#fff'
    },
    profile_view: {
        height: 136,
        // backgroundColor: 'red'
    },
    profile_image: {
        height: 120,
        width: 120,
        borderRadius: 100,
        marginLeft: '55%'
    },
    details_view: {
        height: '50%',
        width: '100%',
        // backgroundColor: 'red',
        marginTop: '2%',
        padding: '10%'
    },
    company_view: {
        height: '20%',
        // backgroundColor: '#000',
        flexDirection: 'row'
    },
    detail_text_view: {
        marginLeft: '12%'
    },
    detail_icon_view: {
        top: '3%'
    },
    title_text: {
        fontSize: 13,
        fontWeight: '600',
        opacity: 0.4,
        color: '#000'
    },
    input_text: {
        fontSize: 17,
        color: '#000'
    }

})