import React, { useEffect } from "react";
import { Button, SafeAreaView, Text, TouchableOpacity, ImageBackground, Image, Vibration, View } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Splash = () => {

    const navigation = useNavigation();
    const isFocused = useFocusEffect

    const Image = () => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 4500)
    }
    useEffect(() => {
        if (isFocused) {
            Image()
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{ backgroundColor: 'red' }}>
            <View>
                <Text>
                    hii
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default Splash;