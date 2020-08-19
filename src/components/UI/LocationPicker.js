import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesita los permisos de geolocalización para poder obtener localización en tiempo real.',
                [{text: 'Está bien'}]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) return;

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 4000 });
            console.log(location);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        }catch(err) {
            Alert.alert('No se puede obtener la localización', 'Por favor intentar nuevamente.', [{ text: 'Esta bien'}]);
        }
        setIsFetching(false);
    };

    return (
        <View style={styles.locationContainer}>
            
            <Button title="Get location" onPress={getLocationHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    locationContainer: {
        marginBottom: 15,
    },
    mapPreviewContainer: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationPicker;