import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { shortBrandAzulUrl, shortMainCargaUrl } from '../../constants/Utils';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../../constants/Colors';


const UserSupportScreen = props => {
    return (
        <View style={styles.supportContainer}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={shortBrandAzulUrl}
                />
            </View>
            <View style={styles.mainCargaContainer}>
                <Image
                    style={styles.mainCarga}
                    source={shortMainCargaUrl}
                />
            </View>
            <LinearGradient
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                    props.colorOne ? props.colorOne : primaryColor,
                    props.colorTwo ? props.colorTwo : accentColor
                ]}
            >
                <View style={styles.linearGradientContainer}>
                    <View style={styles.row1}>
                        <View style={styles.row1Col1}>
                            <AntDesign
                                style={styles.supportIcon}
                                name="customerservice"
                                size={60}
                                color='#fff'
                            />
                        </View>
                        <View style={styles.row1Col2}>
                            <Text style={styles.infoText}>¡Aquí tendrás solución a tus dudas!</Text>
                        </View>
                    </View>
                    <View style={styles.extraInfo}>
                        <Text style={styles.extraInfoText}>
                            Envíanos un mensaje por chat o e-mail y con gusto te ayudaremos:
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.row2}>
                <View style={styles.row2Col1}>
                    <Text>
                        <FontAwesome
                            style={styles.whatsAppIcon}
                            name="whatsapp"
                            size={24}
                            color="#25D366"
                        />
                        {` + 57 315 6398560`}
                    </Text>
                </View>
                <View style={styles.row2Col2}>
                    <Text>
                        <AntDesign name="mail" size={24} color={primaryColor} />
                        {` soporte@cargame.com.co`}
                        
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    supportContainer: {
        height: '100%'
    },
    logoContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 0
    },
    logo: {
        height: 150,
        width: 150,
        marginTop: '10%'
    },
    mainCargaContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: '40%',
        paddingTop: '15%',
        marginBottom: '8%'
    },
    mainCarga: {
        marginRight: '2%',
        width: '100%',
        position: 'absolute',
        top: '-20%'
    },
    linearGradientContainer: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    row1: {
        flexDirection: 'row',
        width: '100%',
        position: 'relative',
        top: 0,   
    },
    row1Col1: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportIcon: {
        opacity: 0.32
    },
    row1Col2: {
        width: '70%',
        paddingRight: '2%'
    },
    infoText: {
        paddingTop: '5%',
        color: textAccentColor,
        fontFamily: 'Ruda',
        fontSize: 20,
        lineHeight: 30
    },
    extraInfo: {
        paddingHorizontal: '5%',
        paddingTop: '1%'
    },
    extraInfoText: {
        color: textAccentColor,
        fontFamily: 'Quicksand',
        fontSize: 18,
        lineHeight: 19,
    },
    row2: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%'
    },
});

export default UserSupportScreen;