

import React from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from "react-native";


const ScrollWrapper = ({ style, children }) => {

    const behavior = Platform.OS === 'android' ? 'padding' : 'position'
    return (
        <View style={styles.containerContent}>
            <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={30}>
                <ScrollView style={style}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    containerContent: {
        height
    }
});

export default ScrollWrapper;