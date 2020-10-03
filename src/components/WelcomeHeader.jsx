import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  accentColor,
  textAccentColor,
} from "../constants/Colors";
import { whiteSquareUrl, shortBrandAzulUrl } from "../constants/Utils";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import { normalizeLength } from "../styles/layout";

const WelcomeHeader = () => (
  <LinearGradient
    start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[primaryColor, accentColor]}
  >
    <View style={styles.row}>
      <View style={styles.col1}>
        <Text style={styles.titleHeader}>
          {`Hola!
Que deseas hacer hoy?`}
        </Text>
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
    flexDirection: 'row',
    height: normalizeLength(160),
    minWidth: normalizeLength(300),
  },
  col1: {
    width:  normalizeLength(200),
    height: normalizeLength(200)
  },
  titleHeader: {
    minHeight: normalizeLength(30),
    paddingTop: normalizeLength(60),
    paddingLeft: normalizeLength(20),
    fontFamily: 'Ruda',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    color: textAccentColor
  },
  col2: {
    minWidth:  normalizeLength(100),
    minHeight: normalizeLength(100)
  },
  logo: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? normalizeLength(-62): normalizeLength(-68),
    top: Platform.OS === 'ios' ? normalizeLength(58): normalizeLength(55),
    width: normalizeLength(70),
    height: normalizeLength(120),
  },
  whiteSquare: {
    position: 'absolute',
    top: normalizeLength(64),
    right: normalizeLength(-85),
    
    bottom: 0,
  }
});

export default WelcomeHeader;
