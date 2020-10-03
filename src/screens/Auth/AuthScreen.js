import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  YellowBox,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import TextInput from "../../components/UI/Input";
import { AntDesign } from "@expo/vector-icons";
import * as authActions from "../../redux/actions/auth";
import { shortBrandAzulUrl, shortMainCargaUrl } from "../../constants/Utils";

import { primaryColor, textPrimaryColor } from "../../constants/Colors";
import { normalizeLength } from "../../styles/layout";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp] = useState(
    useSelector((state) => state.auth.isSignUp)
  );
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (error) {
      Alert.alert("¡Error en la comunicación intentalo de nuevo!", error, [
        { text: "Está bien" },
      ]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    let action;
    let nextPage = "";
    let passwordError = false;
    const email = formState.inputValues.email;
    const password = formState.inputValues.password;
    if (isSignUp) {
      if (password === formState.inputValues.repeatPassword) {
        action = authActions.signup(email, password);

        nextPage = "Member";
      } else {
        passwordError = true;
      }
    } else {
      action = authActions.signin(email, password);
      nextPage = "Dashboard";
    }
    if (!passwordError) {
      const controller = new AbortController();
      setError(null);
      setIsLoading(true);
      try {
        dispatch(action);
        controller.abort();
        props.navigation.navigate(nextPage);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
      controller.abort();
    } else {
      setError(
        "¡Precaución! Las contraseñas no coinciden. Intentalo nuevamente."
      );
    }
  };

  return !userToken ? (
    <View style={styles.mainContainer}>
      <AntDesign
        name="arrowleft"
        style={styles.backButton}
        size={40}
        color={primaryColor}
        onPress={() => props.navigation.navigate('Index')}
      />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={shortBrandAzulUrl} />
      </View>
      <View style={[styles.authContainer, isSignUp && styles.authSignUpContainer]}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <ScrollView>
            <View style={styles.scrollViewContainer}>
              <TextInput
                id="email"
                label="Correo electrónico"
                keyboardType="email-address"
                required
                email
                leftIcon={
                  <AntDesign name="user" size={20} color={primaryColor} />
                }
                autoCapitalize="none"
                errorText="¡Precación! Por favor ingresa un correo válido."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <TextInput
                id="password"
                label="Contraseña"
                keyboardType="default"
                secureTextEntry
                required
                leftIcon={
                  <AntDesign name="eyeo" size={20} color={primaryColor} />
                }
                minLength={6}
                autoCapitalize="none"
                errorText={`¡Precación! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres`}
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              {isSignUp ? (
                <TextInput
                  id="repeatPassword"
                  label="Repite tu contraseña"
                  keyboardType="default"
                  secureTextEntry
                  required
                  leftIcon={
                    <AntDesign name="eyeo" size={20} color={primaryColor} />
                  }
                  minLength={6}
                  autoCapitalize="none"
                  errorText={`¡Precación! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres`}
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              ) : (
                <View />
              )}
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>
                ¿Olvidaste tu usuario o contraseña?
              </Text>
            </View>
            <View style={styles.btnActionContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={primaryColor} />
              ) : (
                <Button
                  title={isSignUp ? "Quiero ser socio" : "Ingresar"}
                  onPress={authHandler}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Image style={styles.mainCarga} source={shortMainCargaUrl} />
    </View>
  ) : (
    props.navigation.navigate("Dashboard")
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(300),
  },
  backButton: {
    marginTop: normalizeLength(35),
    marginLeft: normalizeLength(10)
  },
  logoContainer: {
    flex: 1,
    marginTop: normalizeLength(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: normalizeLength(180),
    height: normalizeLength(180),
  },
  authContainer: {
    flex: 1,
    marginTop: normalizeLength(90),
    paddingHorizontal: normalizeLength(20),
    minWidth: normalizeLength(380),
    minHeight: normalizeLength(320)
  },
  authSignUpContainer: {
    minHeight: normalizeLength(390)
  },
  forgotPasswordContainer: {
    marginTop: normalizeLength(6),
  },
  forgotPassword: {
    textAlign: 'center',
    color: textPrimaryColor,
    fontFamily: 'Quicksand',
  },
  btnActionContainer: {
    marginTop: normalizeLength(15),
  },
  mainCarga: {
    marginLeft: normalizeLength(-50)
  }
});

export default AuthScreen;
