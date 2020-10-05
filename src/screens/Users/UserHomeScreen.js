// Fecha  : Ultima revision Agosto 19 - 2020
// Autor  : Flavio Cortes
// Detalle: formulario de ofertas

import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Picker,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import WelcomeDescription from '../../components/WelcomeDescription';

import TextInput from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { primaryColor, accentColor } from "../../constants/Colors";
import { getUserInfo } from "../../utils/helpers";

import * as offerActions from "../../redux/actions/offers";

const FORM_OFFER_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type == FORM_OFFER_INPUT_UPDATE) {
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

const UserHomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("manana");
  moment.locale();
  const [date, setDate] = useState(new Date());
  const [mode] = useState("date");
  const [show, setShow] = useState(false);
  const { userId, typeServiceSelected} = useSelector(state => state.auth);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  useEffect(() => {
    if (error) {
      Alert.alert("¡Precaución, un error ha ocurrido!", error, [
        { text: "Está bien" },
      ]);
    }
  }, [error]);

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShow(!show);
  };

  // carga los datos iniciales del formulario
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      description: "",
      timezone: "",
      collectedDate: "",
      contact: "",
      movil: "",
    },
    inputValidation: {
      description: false,
      timezone: false,
      collectedDate: false,
      contact: false,
      movil: false,
    },
    formIsValid: false,
  });

  // mapea los campos del formulario de oferta
  const homedestinationHandler = async () => {
    const action = offerActions.createOffer({
      userId,
      description: formState.inputValues.description,
      timezone: formState.inputValues.timezone,
      collectedDate: formState.inputValues.collectedDate,
      contact: formState.inputValues.contact,
      movil: formState.inputValues.movil,
    });

    setError(null);
    setIsLoading(true);

    try {
      dispatch(action);
      props.navigation.navigate("DestinationList");
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

  // definicion del formulario de ofertas.
  return typeServiceSelected ? (
    <View style={styles.homeContainer}>
      <WelcomeDescription/>
      <ScrollView>
        <View style={styles.inputTextAreaContainer}>
          <TextInput
            id="description"
            label="Descripción (*)"
            keyboardType="default"
            maxLength={2000}
            placeholder="Aquí debes escribir que vas a enviar incluyendo tamaños y medidas. Ej: 1 cama doble, 1 nevera grande, 2 cajas medianas de 30 x 40cm.."
            onInputChange={inputChangeHandler}
            isTextArea
          />
        </View>

        <View style={styles.arriveDateContainer}>
          <Text style={styles.label}>Franja horaria</Text>
          <Picker
            id="timezone"
            selectedValue={selectedValue}
            style={styles.TravelContent}
            onValueChange={(itemValue) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Mañana" value="manana" />
            <Picker.Item label="Tarde" value="tarde" />
          </Picker>

          {linearGradientTitle("Fecha de recogida")}
          <Text onPress={showDatePickerModal} style={styles.dateTravelContent}>
            {moment(date).format("ll")}
          </Text>
          {show && (
            <DateTimePicker
              id="collectedDate"
              testID="pickup-date"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <View style={styles.userInfoContainer}>
          {linearGradientTitle("Datos de quien recibe")}
          <View style={styles.userInfoContent}>
            <TextInput
              id="contact"
              label="Nombres y apellidos de quien recibe(*)"
              keyboardType="default"
              minLength={5}
              required
              autoCapitalize="words"
              errorText="¡Precaución! Por favor ingresa tu nombre y apellido correctamente."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <TextInput
              id="movil"
              label="Celular (*)"
              keyboardType="numeric"
              required
              minLength={10}
              maxLength={10}
              autoCapitalize="none"
              errorText="¡Precaución! Por favor ingresa un número de celular correcto."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.userBoton}>
            {isLoading ? (
              <ActivityIndicator size="large" color={primaryColor} />
            ) : (
              <Button title="Siguiente" onPress={homedestinationHandler} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <View>
      <Text>Error</Text>
    </View>
  );
};

// CSS de la formula.
const styles = StyleSheet.create({
  homeContainer: {
    height: "100%",
  },
  inputTextAreaContainer: {
    marginTop: "4%",
    marginHorizontal: "2%",
  },
  linearGradientTitleContainer: {
    marginTop: "3%",
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: "#87ceeb",
  },
  linearGradientTitle: {
    paddingVertical: "3%",
    paddingLeft: "5%",
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },
  userInfoContent: {
    marginTop: "1%",
    marginHorizontal: "2%",
  },
  dateTravelContent: {
    textAlign: "center",
    paddingVertical: "4%",
    paddingHorizontal: "30%",
    marginTop: "3%",
    marginBottom: "15%",
    marginHorizontal: "2%",
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 15,
  },
  TravelContent: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    color: primaryColor,
    marginTop: Platform.OS === "ios" ? "-18%" : "-1%",
    marginBottom: Platform.OS === "ios" ? "-18%" : "2%",
    paddingLeft: "4%",
  },
  label: {
    fontFamily: "Quicksand",
    fontWeight: "bold",
    paddingLeft: 17,
    marginVertical: 3,
    color: primaryColor,
  },
  franja: {
    marginTop: "3%",
    marginLeft: "2%",
  },
  userBoton: {
    paddingVertical: "4%",
    paddingHorizontal: "15%",
    marginTop: "-8%",
  },
});

export default UserHomeScreen;
