import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  accentColor,
  textAccentColor,
} from "../constants/Colors";
import { View, Text, StyleSheet } from "react-native";
import { normalizeLength } from "../styles/layout";
import { Ionicons } from '@expo/vector-icons';

const SimpleHeader = ({ title, hasNext, current, final, previusButton }) => (
  <LinearGradient
    start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[primaryColor, accentColor]}
  >
    <View style={styles.row}>
      <View style={styles.col1}>
        <Text style={styles.titleHeader}>
          {title}
        </Text>
      </View>
      <View style={styles.col2}>
        <Ionicons
          style={styles.backButton}
          name="ios-arrow-back"
          size={30}
          color="white"
          onPress={previusButton}
        />
        {hasNext && (
          <Text style={styles.hasNextContainer}>{`${current} de ${final}`}</Text>
        )}
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: normalizeLength(130),
    minWidth: normalizeLength(300),
  },
  col1: {
    width:  normalizeLength(320),
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
    minWidth:  normalizeLength(80),
    minHeight: normalizeLength(80),
    paddingTop: normalizeLength(12)
  },
  backButton: {
    marginTop: normalizeLength(50)
  },
  hasNextContainer: {
    marginTop: normalizeLength(10),
    marginLeft: normalizeLength(-20),
    color: 'white'
  }
});

export default SimpleHeader;
