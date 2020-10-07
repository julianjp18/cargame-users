import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  accentColor,
  textAccentColor,
} from "../../constants/Colors";
import { shortMapaUrl } from "./../../constants/Utils";
import { ScrollView } from "react-native-gesture-handler";
import TextInput from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import * as offerActions from "../../redux/actions/offers";


const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidation = {
      ...state.inputValidation,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidation) {
      updatedFormIsValid = updatedFormIsValid && updatedValidation[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidation,
      inputValues: updatedValues,
    };
  }
  return state;
};

const linearGradientTitle = (title) => (
  <View style={styles.linearGradientTitleContainer}>
    <LinearGradient
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[primaryColor, accentColor]}
      style={styles.linearGradientContainer}
    >
      <Text style={styles.linearGradientTitle}>{title}</Text>
    </LinearGradient>
  </View>
);


const UserDestinationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [] = useState(false);
  const typeServiceId = useSelector((state) => state.auth.typeServiceSelected);

  // carga los datos iniciales del formulario
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      currentAddress: "",
      destinationAddress: "",
    },
    inputValidation: {
      currentAddress: false,
      destinationAddress: false,
    },
    formIsValid: false,
  });

  // mapea los campos del formulario de oferta
  const destinationHandler = async () => {
    const action = offerActions.createOffer({
      userId,
      currentAddress: formState.inputValues.currentAddress,
      destinationAddres: formState.inputValues.destinationAddress,
    });

    setError(null);
    setIsLoading(true);

    try {
      dispatch(action);
      props.navigation.navigate("WaitingList");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Modificacion de cualquier campo
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

  useEffect(() => {
    if (error) {
      Alert.alert("¡Precaución, un error ha ocurrido!", error, [
        { text: "Está bien" },
      ]);
    }
  }, [error]);

  return typeServiceId ? (
    <View style={styles.supportContainer}>
      <ImageBackground source={shortMapaUrl} style={styles.image}>
        <View style={styles.categoriesContainer}>
          <ScrollView>
            <View style={styles.userInfoContainer}>
              <View style={styles.userInfoContent}>
                <TextInput
                  id="currentAddress"
                  label="Dirección de recogida(*)"
                  keyboardType="default"
                  minLength={5}
                  required
                  autoCapitalize="words"
                  errorText="¡Precaución! Por favor ingresa una dirección válida."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <TextInput
                  id="destinationAddress"
                  label="Dirección de destino (*)"
                  keyboardType="default"
                  minLength={5}
                  required
                  autoCapitalize="none"
                  errorText="¡Precaución! Por favor ingresa una dirección válida."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </View>
              <View style={styles.userBoton}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={primaryColor} />
                ) : (
                  <Button title="Solicitar oferta" onPress={destinationHandler} />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View>
      <Text>Error</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  supportContainer: {
    backgroundColor: "transparent",
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  brandImageContainer: {
    marginTop: "5%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  categoriesContainer: {
    marginTop: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    height: "40%",
  },
  logoContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 0,
  },
  logo: {
    height: 150,
    width: 150,
    marginTop: "10%",
  },
  mainCargaContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "40%",
    paddingTop: "15%",
    marginBottom: "8%",
  },
  mainCarga: {
    marginRight: "2%",
    width: "100%",
    position: "absolute",
    top: "-20%",
  },
  linearGradientContainer: {
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  row1: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
    top: 0,
  },
  row1Col1: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  supportIcon: {
    opacity: 0.32,
  },
  row1Col2: {
    width: "70%",
    paddingRight: "2%",
  },
  infoText: {
    paddingTop: "5%",
    color: textAccentColor,
    fontFamily: "Ruda",
    fontSize: 20,
    lineHeight: 30,
  },
  extraInfo: {
    paddingHorizontal: "5%",
    paddingTop: "1%",
  },
  extraInfoText: {
    color: textAccentColor,
    fontFamily: "Quicksand",
    fontSize: 18,
    lineHeight: 19,
  },
  row2: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
  },
  userBoton: {
    paddingVertical: "4%",
    paddingHorizontal: "15%",
    marginTop: "-6%",
  },
});

export default UserDestinationScreen;
