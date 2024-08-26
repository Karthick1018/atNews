import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, Image, TouchableWithoutFeedback, ActivityIndicator, } from 'react-native';
import { Card } from 'react-native-elements';
import { aaludra } from './image';

const News = ({ route }) => {
    const { categoryEvent } = route.params;
    const [data, setData] = useState([]);
    const [eventCount, setEventCount] = useState('')
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.0.193:1810/get');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error Fetching Data:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filteredEvent = () => {
            const categoryList = data.filter(e => e.category === categoryEvent);
            setFilter(categoryList);
        };

        filteredEvent();
    }, [categoryEvent, data]);


    useEffect(() => {
        setEventCount(filter.length)
    }, [filter])


    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback>
            <Card
                containerStyle={Styles.card}>
                <View
                    style={{ flexDirection: 'row', marginLeft: '80%' }}>
                    <Image source={aaludra}
                        style={{ height: 20, width: 20, }} />
                    <Text
                        style={{ left: 5, fontWeight: 'bold' }}>
                        atNews
                    </Text>
                </View>
                <Text
                    style={Styles.title_text}
                    numberOfLines={1}>
                    {item.title}
                </Text>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 200, top: 10, borderRadius: 20, resizeMode: 'contain' }}
                />
                <Text style={Styles.des_text} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: '10%', justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', color: '#000' }}>
                        DATE:
                    </Text>
                    <Text style={{ color: '#000' }}>
                        18-10-2000
                    </Text>
                </View>
            </Card>
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.header_logo}>
                <Text>atNews</Text>
            </View>
            <Text>

            </Text>
            {loading && <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center' }} />}
            <FlatList
                data={filter}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

export default News;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header_logo: {
        height: 70,
        width: '100%',
        backgroundColor: '#4ae0ed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 370,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: -1,
    },
    title_text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        // left: 100
    },
    des_text: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
        top: 18,
    },
});



