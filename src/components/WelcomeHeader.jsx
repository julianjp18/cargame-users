import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../constants/Colors';
import { whiteSquareUrl, shortBrandOrangeGreyUrl } from '../constants/Utils';
import { View, Image, Text, StyleSheet } from 'react-native';

const WelcomeHeader = props => (
    <LinearGradient
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                    props.colorOne ? props.colorOne : primaryColor,
                    props.colorTwo ? props.colorTwo : accentColor
                ]}
            >
                <View style={styles.row}>
                    <View style={styles.col1}>
                        <Text style={styles.titleHeader}>Bienvenido</Text>
                    </View>
                    <View style={styles.col2}>
                        <Image
                            style={styles.whiteSquare}
                            source={whiteSquareUrl}
                        />
                        <Image
                            style={styles.logo}
                            source={shortBrandOrangeGreyUrl}
                        />
                    </View>
                </View>
            </LinearGradient>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: '20%',
        width: '100%',
    },
    col1: {
        width: '50%',
        height: '100%'
    },
    titleHeader: {
        height: '100%',
        marginTop: '40%',
        textAlignVertical: 'bottom',
        paddingLeft: 20,
        fontFamily: 'Ruda',
        fontSize: 28,
        fontWeight: '700',
        color: textAccentColor,
        lineHeight: 24
    },
    col2: {
        width: '50%',
        height: '100%'
    },
    logo: {
        position: 'absolute',
        right: '5%',
        top: 86,
        width: '50%',
        height: '300%',
    },
    whiteSquare: {
        position: 'absolute',
        top: 58,
        right: 0,
        bottom: 0,
    }
});

export default WelcomeHeader;