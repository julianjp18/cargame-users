import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import TextInput from "../../components/UI/Input";
import { AntDesign } from "@expo/vector-icons";
import * as authActions from "../../redux/actions/auth";
import { shortBrandAzulUrl, shortMainCargaUrl } from "../../constants/Utils";

import { primaryColor, textPrimaryColor } from "../../constants/Colors";

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
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const signUpChecked = useSelector((state) => state.auth.isSignUp);
  const userToken = useSelector((state) => state.auth.token);

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

  useEffect(() => {
    signUpChecked ? setIsSignUp(signUpChecked) : "";
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("¡Un problema ha ocurrido!", error, [{ text: "Está bien" }]);
    }
  }, [error]);

  const authHandler = async () => {
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
      nextPage = "ServicesList";
    }
    if (!passwordError) {
      setError(null);
      setIsLoading(true);
      try {
        dispatch(action);
        props.navigation.navigate(nextPage);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    } else {
      setError("¡Error! Las contraseñas no coinciden. Intentalo nuevamente.");
    }
  };

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
  return !userToken ? (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={shortBrandAzulUrl} />
      </View>
      <View style={styles.authContainer}>
        <KeyboardAwareView animated={true}>
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
                errorText="¡error! Por favor ingresa un correo válido."
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
                errorText={`¡error! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres
                                        `}
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
                  errorText={`¡error! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres
                                            `}
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
                  title={isSignUp ? "Sesion" : "Ingresar"}
                  onPress={authHandler}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAwareView>
      </View>
      <Image style={styles.mainCarga} source={shortMainCargaUrl} />
    </View>
  ) : (
    props.navigation.navigate("Dashboard")
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  logo: {
    width: 150,
    height: 150,
  },
  authContainer: {
    paddingLeft: "8%",
    paddingRight: "5%",
    width: "100%",
    height: "45%",
  },
  forgotPasswordContainer: {
    marginTop: "1%",
  },
  forgotPassword: {
    textAlign: "center",
    color: textPrimaryColor,
    fontFamily: "Quicksand",
  },
  btnActionContainer: {
    marginTop: "5%",
  },
  changeTextContainer: {
    marginVertical: "3%",
  },
  changeText: {
    color: textPrimaryColor,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  btnSwitchContainer: {
    marginTop: "2%",
  },
  mainCarga: {
    marginLeft: "-15%",
  },
});

export default AuthScreen;
