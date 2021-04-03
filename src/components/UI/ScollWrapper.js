

import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ScrollWrapper = ({ style, children }) => {

    const behavior = Platform.OS === 'android' ? 'padding' : 'position'
    return (
        <ScrollView style={style}>
            <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={30}>
                {children}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default ScrollWrapper;