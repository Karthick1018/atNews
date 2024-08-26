import React, { useState } from "react";
import { Alert, Button, Modal, Text, View, } from "react-native";
import { CheckBox } from "react-native-elements";
import { RadioButton } from "react-native-paper";

const ResetPassword = () => {
    const [modal, setModal] = useState(false);
    const [check, setCheck] = useState(false)
    const [radio, setRadio] = useState('')

    const closeModal = () => {
        setModal(false);
    };

    const Check = () => {
        setCheck(!check)
    }

    const openModal = () => {
        if (check) {
            setModal(true)
        } else if (radio === 'hello') {
            setModal(true)
        } else {
            Alert.alert('Try again', 'bye bye')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <RadioButton value="hii"
                    status={radio === 'hii' ? 'checked' : 'unchecked'}
                    onPress={() => setRadio('hii')} />
                <Text>Hii</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '4%' }}>
                <RadioButton value="hello"
                    status={radio === 'hello' ? 'checked' : 'unchecked'}
                    onPress={() => setRadio('hello')} />
                <Text>Hello</Text>
            </View>
            <CheckBox
                checked={check}
                onPress={Check} />
            <Modal
                visible={modal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
                    <Text style={{ color: '#FFF' }}>
                        Hello
                    </Text>
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
            <Button title="Open" onPress={openModal} />
        </View>

    )
}

export default ResetPassword;
