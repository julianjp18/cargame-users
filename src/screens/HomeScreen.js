// HomeScreen : Pantalla principal 
// Descripcion: Ruta inicial de cargame usuarios
// Fecha      : Octubre 2020.

import React from "react";
import { Text, StyleSheet, View, Image, YellowBox } from "react-native";
import { useDispatch } from "react-redux";

import Button from "../components/UI/Button";
import {
  shortBrandAzulUrl,
  shortMainCargaUrl,
  primaryFont,
} from "../constants/Utils";
import { textPrimaryColor, primaryColor } from "../constants/Colors";
import { setIsSignUp } from "../redux/actions/auth";
import { normalizeLength } from "../styles/layout";

const ISSIGNUP = true;

const reDirectToAuth = (navigation) => navigation.navigate('Auth');

const onPressSignIn = (dispatch, navigation) => {
  dispatch(setIsSignUp(!ISSIGNUP));
  reDirectToAuth(navigation);
};

const onPressSignUp = (dispatch, navigation) => {
  dispatch(setIsSignUp(ISSIGNUP));
  reDirectToAuth(navigation);
};


// Componente Principal.

const HomeScreen = (props) => {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={shortBrandAzulUrl} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          Ahora puedes enviar y recibir paquetes fácilmente.
        </Text>
        <Text style={styles.subtitle}>
          Ayudamos a nuestros clientes a conectar directamente con
          transportadores.
        </Text>
        <View style={styles.btnsContainer}>
          <View>
            <Button
              title="Registrate aquí"
              onPress={() => onPressSignUp(dispatch, props.navigation)}
            />
          </View>
          <View style={styles.btnMoreInfo}>
            <Button
              title="Conoce más"
              colorOne={'white'}
              colorTwo={'white'}
              fontColor={primaryColor}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.buttons}>
            {'¿Ya eres miembro? '}
            <Text
              style={styles.signIn}
              onPress={() => onPressSignIn(dispatch, props.navigation)}
            >
              Ingresar
            </Text>
          </Text>
        </View>
      </View>
      <Image style={styles.mainCarga} source={shortMainCargaUrl} />
    </View>
  );
};

// Estilo de HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: normalizeLength(300),
    marginTop: normalizeLength(200),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalizeLength(20)
  },
  logo: {
    height: normalizeLength(215),
    width: normalizeLength(188)
  },
  infoContainer: {
    paddingHorizontal: normalizeLength(20),
    minWidth: normalizeLength(300),
    minHeight: normalizeLength(50)
  },
  title: {
    marginHorizontal: normalizeLength(50),
    paddingTop: normalizeLength(0),
    color: textPrimaryColor,
    fontFamily: primaryFont,
    fontSize: normalizeLength(22),
    textAlign: 'center',
  },
  subtitle: {
    marginHorizontal: normalizeLength(9),
    marginTop: normalizeLength(10),
    marginBottom: normalizeLength(30),
    color: textPrimaryColor,
    fontFamily: primaryFont,
    fontSize: normalizeLength(17),
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: normalizeLength(4)
  },
  buttons: {
    color: textPrimaryColor,
    fontSize: normalizeLength(13),
    fontWeight: '700',
    textAlign: 'center'
  },
  signIn: {
    color: primaryColor
  },
  btnMoreInfo: {
    marginTop: normalizeLength(15),
  },
  btnsContainer: {
    paddingTop: normalizeLength(2)
  },
  mainCarga: {
    marginTop: normalizeLength(5),
    marginLeft: normalizeLength(-50),
  }
});

export default HomeScreen;
