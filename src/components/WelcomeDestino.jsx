import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  accentColor,
  textAccentColor,
} from "../constants/Colors";
import { whiteSquareUrl, shortBrandAzulUrl } from "../constants/Utils";
import { View, Image, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const WelcomeServicio = (props) => (
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
        <Text style={styles.titleHeader}>Selecciona ubicación</Text>
      </View>
      <View style={styles.col2}>
        <AntDesign
          name="back"
          size={30}
          color="white"
          onPress={() => props.navigation.navigate('ServicesList')}
        />
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
  },
  col1: {
    marginTop: (Platform.OS) === 'ios' ? '5%' : '2%',
    width: '80%',
    height: '100%',
  },
  col2: {
    width: '20%',
    height: '100%',
    paddingTop: '10%',
  },
  titleHeader: {
    marginTop: (Platform.OS) === 'ios' ? '10%' : '10%',
    marginBottom: '5%',
    textAlignVertical: "bottom",
    paddingLeft:"10%",
    fontFamily: "Ruda",
    fontSize: 24,
    fontWeight: "700",
    color: textAccentColor,
    lineHeight: 24,
  },
});

export default WelcomeServicio;
