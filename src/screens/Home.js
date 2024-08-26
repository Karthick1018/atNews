import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons//MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { HBD, Onboarding, Profile, Event, aaludra, } from './image';
import { quotes } from './Quotes';

const Home = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [categoryEvent, setCategoryEvent] = useState("");

    const navigation = useNavigation();

    const PressNews = (e) => {
        setCategoryEvent(e);
        navigation.navigate('News', { categoryEvent: e });
    };


    useEffect(() => {
        const updateQuote = () => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        };
        updateQuote();
        const intervalId = setInterval(updateQuote, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    const quoteParts = quotes[currentQuoteIndex].split(' – ');

    return (
        <SafeAreaView
            style={Styles.container}>
            <View
                style={Styles.header_logo}>
                <Image
                    source={aaludra} style={{ height: 70, width: 80, marginRight: '10%', justifyContent: 'flex-start', }} />
                <Text
                    style={{ marginRight: '25%', fontSize: 20 }}>
                    atNews
                </Text>
            </View>

            <View
                style={Styles.header_text_view}>
                <Text
                    style={{ marginHorizontal: '10%', fontSize: 15, }}>
                    {quoteParts[0]}
                </Text>
                <Text
                    style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>
                    {' – ' + quoteParts[1]}
                </Text>
            </View>

            <View
                style={Styles.widgets_view} >
                <View
                    style={Styles.widgets1_view}>
                    <TouchableOpacity
                        onPress={() => {
                            // PressNews()
                            setCategoryEvent('HBD')
                        }}
                        style={Styles.widgets1}>
                        <ImageBackground
                            source={Profile}
                            style={{ height: 70, width: 60, top: '15%', left: '5%', opacity: 0.5 }} />
                        <Text
                            style={Styles.Aaludrites_text}>
                            Aaludrites
                        </Text>
                        <Text style={{ ...Styles.count_text, bottom: '30%', right: '8%' }}>
                            60+
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => PressNews('HBD')}
                        style={{ ...Styles.widgets1, marginLeft: '8%', top: 40, }}>
                        <ImageBackground
                            source={HBD}
                            style={{ height: 80, width: 80, borderRadius: 20, alignSelf: 'center', opacity: 0.5, left: '22%', top: '7%' }} />
                        <Text
                            style={{ ...Styles.Aaludrites_text, top: '22%' }}>
                            BirthDay
                        </Text>
                        <Text style={{ ...Styles.count_text, right: '50%' }}>
                            7
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={Styles.widgets1_view}>
                    <TouchableOpacity
                        style={Styles.widgets1}
                        onPress={() => PressNews('OnBoarding')}>
                        <ImageBackground
                            source={Onboarding}
                            style={{ height: 80, width: 80, top: '10%', left: '3%', opacity: 0.5 }} />
                        <Text
                            style={{ ...Styles.Aaludrites_text, top: '22%' }}>
                            Onboarding
                        </Text>
                        <Text style={Styles.count_text}>
                            5
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...Styles.widgets1, marginLeft: '8%', top: 40 }}
                        onPress={() => PressNews('Event')} >
                        <ImageBackground
                            source={Event}
                            style={{ height: 60, width: 60, borderRadius: 20, alignSelf: 'center', opacity: 0.5, left: '20%', top: '10%' }} />
                        <Text
                            style={{ ...Styles.Aaludrites_text, top: '30%' }}>
                            Events
                        </Text>
                        <Text style={{ ...Styles.count_text, right: '50%', marginTop: '10%' }}>
                            12
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={Styles.bottom_tab_view}>
                <TouchableOpacity>
                    <AntDesign
                        name="home"
                        size={30}
                        color={'#4ae0ed'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Upload')
                    }}>
                    <AntDesign
                        name="plus"
                        size={35}
                        color={'#4ae0ed'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile')
                    }}>
                    <MaterialCommunityIcons
                        name="account"
                        size={30}
                        color="#4ae0ed" />
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    )
}

export default Home


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header_logo: {
        height: 100,
        width: '100%',
        backgroundColor: '#4ae0ed',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header_text_view: {
        backgroundColor: '#4ae0ed',
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 30,

    },

    widgets_view: {
        // backgroundColor: '',
        height: 500,
        width: '100%',
        marginTop: '12%',
        borderRadius: 20
    },
    widgets1_view: {
        height: 200,
        width: '100%',
        flexDirection: 'row'
    },

    bottom_tab_view: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    widgets1: {
        backgroundColor: '#F5F5F5',
        height: 150,
        marginTop: '5%',
        width: '40%',
        marginLeft: '5%',
        borderRadius: 30,
        // borderWidth: 1,
    },
    Aaludrites_text: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 17,
        textAlign: 'center',
        top: '25%'
    },
    count_text: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: '63%',
        bottom: '38%',
        color: '#42cbf5'
    },

})