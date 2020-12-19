import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";
import {
  accentColor,
  primaryColor,
} from "../../constants/Colors";
import {
  shortCarga,
  whiteLogo,
} from "../../constants/Utils";
import Button from "../../components/UI/Button";
import { LinearGradient } from "expo-linear-gradient";
import { normalizeLength } from "../../styles/layout";

const SearchServiceScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const waitingHandler = async () => {
    props.navigation.navigate("Notifications");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <LinearGradient
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        props.colorOne ? props.colorOne : primaryColor,
        props.colorTwo ? props.colorTwo : accentColor
      ]}
      style={styles.mainContainer}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={primaryColor} />
      ) : (
        <View style={styles.supportContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={whiteLogo} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              ¡Te enviaremos una notificación cuando este lista tu oferta!
            </Text>
          </View>
          <View style={styles.userButtonContainer}>
            <Button title="Ir a mis notificaciones" fontColor="white" onPress={waitingHandler} />
          </View>
          <View style={styles.mainCargaContainer}>
            <Image style={styles.mainCarga} source={shortCarga} />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(400),
    minWidth: normalizeLength(300),
  },
  supportContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: normalizeLength(250),
    width: normalizeLength(250),
    marginTop: normalizeLength(100),
  },
  infoTextContainer: {
    marginHorizontal: normalizeLength(30),
    marginTop: normalizeLength(20)
  },
  infoText: {
    color: '#FFF',
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(25),
    fontWeight: '700',
    lineHeight: 31,
    textAlign: 'center',
  },
  userButtonContainer: {
    marginTop: normalizeLength(20),
  },
  mainCargaContainer: {
    marginTop: normalizeLength(20)
  }
});

export default SearchServiceScreen;
