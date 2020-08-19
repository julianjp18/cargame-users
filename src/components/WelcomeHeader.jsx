import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  accentColor,
  textAccentColor,
} from "../constants/Colors";
import { whiteSquareUrl, shortBrandAzulUrl } from "../constants/Utils";
import { View, Image, Text, StyleSheet } from "react-native";

const WelcomeHeader = (props) => (
  <LinearGradient
    start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[
      props.colorOne ? props.colorOne : primaryColor,
      props.colorTwo ? props.colorTwo : accentColor,
    ]}
  >
    <View style={styles.row}>
      <View style={styles.col1}>
        <Text style={styles.titleHeader}>Hola! Que deseas hacer hoy?</Text>
      </View>
      <View style={styles.col2}>
        <Image style={styles.whiteSquare} source={whiteSquareUrl} />
        <Image style={styles.logo} source={shortBrandAzulUrl} />
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: "24%",
    width: "100%",
  },
  col1: {
    width: '50%',
    height: '100%',
  },
  titleHeader: {
    marginTop: (Platform.OS) === 'ios' ? '18%' : '35%',
    textAlignVertical: "bottom",
    paddingLeft: "10%",
    fontFamily: "Ruda",
    fontSize: (Platform.OS) === 'ios' ? 22 : 24,
    fontWeight: "700",
    color: textAccentColor,
    lineHeight: (Platform.OS) === 'ios' ? 20 : 24
  },
  col2: {
    width: "50%",
    height: "100%",
  },
  logo: {
    position: 'absolute',
    right: '5%',
    top: '170%',
    width: '50%',
    height: '300%',
  },
  whiteSquare: {
    position: "absolute",
    top: "180%",
    right: 0,
    bottom: 0,
  },
});

export default WelcomeHeader;
