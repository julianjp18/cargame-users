import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../../constants/Colors';

const Button = props => {
    return (
        <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
                props.colorOne ? props.colorOne : primaryColor,
                props.colorTwo ? props.colorTwo : accentColor
            ]}
            style={{
                borderRadius: 25,
            }}
        >
            <Text 
                style={{
                    textAlign: "center",
                    padding: 10,
                    borderWidth: props.fontColor ? 2 : 1,
                    borderColor: props.fontColor ? primaryColor : 'transparent',
                    borderRadius: 25,
                    color: props.fontColor ? props.fontColor : textAccentColor,
                    fontFamily: 'Quicksand',
                    fontSize: 14,
                    fontWeight: '700',
                    lineHeight: 18
                }}
                onPress={props.onPress}
            >
                {props.title.toUpperCase()}
            </Text>
        </LinearGradient>
    )
};

export default Button;