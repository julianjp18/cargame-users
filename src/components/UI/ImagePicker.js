import React, { useState } from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { primaryColor, darkGrey } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImgPicker = props => {
    const userProfilePicture = useSelector(
        state => state.user.profilePicture ? state.user.profilePicture : ''
    );
    const [pickedImage, setPickedImage] = useState(userProfilePicture ? userProfilePicture : '');
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesita los permisos de cámara para poder obtener una foto de perfil.',
                [{text: 'Está bien'}]
            );
            return false;
        }
        return true;
    };
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.3
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <TouchableOpacity onPress={takeImageHandler}>
            <View style={styles.imageContent}>
                {!pickedImage ? (
                    <View>
                        <View style={styles.notProfilePicture}>
                            <AntDesign style={styles.notProfilePictureIcon} name="picture" size={40} />
                        </View>
                    </View>
                ) : (
                    <Image style={styles.image} source={{
                        uri: pickedImage,
                      }} />
                )}
                <AntDesign style={styles.plusIcon} name="pluscircleo" size={24} />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    imageContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#cdcfd1',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    notProfilePictureIcon: {
        color: primaryColor
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    plusIcon: {
        position: 'absolute',
        bottom: 0,
        right: '5%',
        color: primaryColor,
        backgroundColor: '#ffffff',
        borderRadius: 12
    }
});

export default ImgPicker;