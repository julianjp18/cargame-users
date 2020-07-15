import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

const DriverHeader = props => (
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
                <FontAwesome style={styles.col1Icon} name={props.leftIcon} size={60} color='#fff' />
            </View>
            <View style={styles.col2}>
                <Text style={styles.titleHeader}>
                    {props.title}
                </Text>
                <Text style={styles.subtitleHeader}>
                    {props.subtitle}
                </Text>
            </View>
        </View>
    </LinearGradient>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: '15%',
        width: '100%',
    },
    col1: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
        paddingTop: '11%',
        paddingRight: '2%'
    },
    col1Icon: {
        opacity: 0.32,
    },
    titleHeader: {
        marginTop: '15%',
        fontFamily: 'Quicksand',
        fontSize: 20,
        fontWeight: '700',
        color: textAccentColor,
        lineHeight: 24
    },
    subtitleHeader: {
        fontFamily: 'Ruda',
        fontSize: 14,
        fontWeight: '500',
        color: textAccentColor,
        lineHeight: 20
    },
    col2: {
        width: '80%',
        height: '100%'
    },
});

export default DriverHeader;