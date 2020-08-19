import React, { useEffect } from 'react';
import { 
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
 } from "react-native";
import { primaryColor } from '../constants/Colors';
import { useDispatch } from 'react-redux';

import * as authActions from '../redux/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformedUserData = JSON.parse(userData);
            const {token, userId, expiredDate, email } = transformedUserData;
            const expirationDate = new Date(expiredDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            props.navigation.navigate('ServicesList');
            dispatch(authActions.authenticate(userId, token, email))
        }

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={primaryColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default StartupScreen;