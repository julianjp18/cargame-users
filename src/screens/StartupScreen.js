// StartupScreen : Pantalla principal 
// Descripcion: Ruta inicial de cargame usuarios
// Fecha      : Octubre 2020.

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

// Componente Principal
const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Index');
                return;
            }

            const transformedUserData = JSON.parse(userData);
            const {idToken, userId, expiredDate, email } = transformedUserData;
            const expirationDate = new Date(expiredDate);

            if (expirationDate <= new Date() || !idToken || !userId) {
                props.navigation.navigate('Index');
                return;
            }

            props.navigation.navigate('ServicesList');
            dispatch(authActions.authenticate(userId, idToken, email))
        }

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={primaryColor} />
        </View>
    );
};

// Estilo de StartupScreen
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default StartupScreen;