import React, { useState, useReducer, useCallback } from "react";
import { Alert, StyleSheet, Text, View, Picker, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from '../../utils/helpers';
import { currencyFormat } from '../../../utils/helpers';
import * as authActions from '../../../redux/actions/auth';
import * as userNotificationsActions from "../../../redux/actions/notifications";

import Button from "../../../components/UI/Button";
import TextInput from '../../../components/UI/Input';
import UserHeader from "../../../components/UserHeader";
import { normalizeLength } from "../../../styles/layout"
import { primaryColor } from "../../../constants/Colors";
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }
  }
  return state;
};

const StartCheckoutScreen = (props) => {
  const dispatch = useDispatch();
  const [identificationType, setIdentificationType] = useState('CC');
  const [mpData, setMpData] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('debit_card');
  const [monthExpired, setMonthExpired] = useState('Enero');
  const state = useSelector((state) => state);
  const user = state.auth;
  const offer = state.offer.offerSelected;

  const getPreferenceData = async (email, offer) => {
    try {
      const response = await fetch(
        `https://cargame-server.herokuapp.com/get-preference-id`, {
        email,
        items: [
          {
            title: 'Payment for service',
            description: `currentCity: ${offer.currentCity}, destinationCity: ${offer.destinationCity}, offerId: ${offer.offerId}, date: ${offer.pickUpDate}`,
            quantity: 1,
            currency_id: 'COP',
            unit_price: offer.offerValue,
          }
        ],
      });

      const {
        preferenceId,
        identifications_type,
        payment_methods
      } = await response.json();
      setMpData({
        preferenceId, identifications_type, payment_methods,
      });
    } catch (err) {
      Alert.alert('Something went wrong', err.message);
    }
  };

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  mpData === '' && getPreferenceData(user.email, offer);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const [, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      identificationType: 'CC',
      identification: 0,
      paymentMethod: 'debit_card',
      cardNumber: 0,
      fullName: '',
      monthExpired: 'Enero',
      yearExpired: 2020,
      cvv: ''
    },
    inputValidities: {
      identificationType: false,
      identification: false,
      paymentMethod: false,
      cardNumber: false,
      fullName: false,
      monthExpired: false,
      yearExpired: false,
      cvv: false
    },
    formIsValid: false
  });

  /*
  const realizePayment = async () => {
    //https://www.mercadopago.com.ar/developers/es/reference/payments/_payments/post/
    //https://api.mercadopago.com/v1/payments
    try {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer APP_USR-3795191131542380-101915-3c2abf7fd4d75006b4c4e8edd1e64c37-637574327`
          },
          body: {
            "token": "637574327-02457dad-f7a3-44dd-a74b-66ed5aa1f8cf",
            "installments": 1,
            "transaction_amount": 58.80,
            "description": "Point Mini a maquininha que dá o dinheiro de suas vendas na hora",
            "payment_method_id": "visa",
            "payer": {
              "email": "test_user_123456@testuser.com",
              "identification": {
                "number": "19119119100",
                "type": "CPF"
              }
            },
            "notification_url": "https://www.suaurl.com/notificacoes/",
            "sponsor_id": null,
            "binary_mode": false,
            "external_reference": "MP0001",
            "statement_descriptor": "MercadoPago",
            "additional_info": {
              "items": [
                {
                  "id": "PR0001",
                  "title": "Point Mini",
                  "description": "Producto Point para cobros con tarjetas mediante bluetooth",
                  "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
                  "category_id": "electronics",
                  "quantity": 1,
                  "unit_price": 58.80
                }
              ],
              "payer": {
                "first_name": "Nome",
                "last_name": "Sobrenome",
                "address": {
                  "zip_code": "06233-200",
                  "street_name": "Av das Nacoes Unidas",
                  "street_number": 3003
                },
                "registration_date": "2019-01-01T12:01:01.000-03:00",
                "phone": {
                  "area_code": "011",
                  "number": "987654321"
                }
              },
              "shipments": {
                "receiver_address": {
                  "street_name": "Av das Nacoes Unidas",
                  "street_number": 3003,
                  "zip_code": "06233200",
                  "city_name": "Buzios",
                  "state_name": "Rio de Janeiro"
                }
              }
            }
          }
      });

      console.log(response);
      const {
        date_created,
        payment_method_id,
        payment_type_id,
        status,
      } = await response.json();

      console.log(
        date_created,
        payment_method_id,
        payment_type_id,
        status
      );

    } catch (err) {
      Alert.alert('¡UPS! Ha ocurrido un error.', err.message);
    }
  };
*/
  const changeToPaymentScreen = () => props.navitgation.navigate('PaymentScreen');

  return (
    <View style={styles.servicesContainer}>
      <UserHeader
        title="Realiza tu pago"
        subtitle=""
        leftIcon="money"
        isButtonBack
        reDirect="Services"
      />
      <View style={styles.mainContainer}>
        {mpData !== '' ? (
          <ScrollView>
            <View style={styles.inputsContainer}>
              <View style={styles.identificationTypeContent}>
                <Text style={styles.label}>Tipo de identificación</Text>
                <Picker
                  id="identificationType"
                  selectedValue={identificationType}
                  style={styles.TravelContent}
                  onValueChange={(itemValue) => setIdentificationType(itemValue)}
                >
                  {
                    mpData.identifications_type.map((type) => (
                      <Picker.Item key={type.id} label={type.name} value={type.id} />
                    ))
                  }
                </Picker>
              </View>
              <View style={styles.identificationInputContent}>
                <TextInput
                  id="identification"
                  label="Identificación (*)"
                  keyboardType="numeric"
                  required
                  minLength={5}
                  maxLength={20}
                  autoCapitalize="none"
                  errorText="¡UPS! Por favor ingresa una identificación válida"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  leftIcon={
                    <FontAwesome name="id-card-o" size={20} color={primaryColor} />
                  }
                />
              </View>
              <View style={styles.identificationTypeContent}>
                <Text style={styles.label}>Método de pago</Text>
                <Picker
                  id="paymentMethod"
                  selectedValue={paymentMethod}
                  style={styles.TravelContent}
                  onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                >
                  {
                    mpData.payment_methods.map((type) => (
                      type.settings.length > 0 && <Picker.Item label={type.name} key={type.id} value={type.payment_type_id} />
                    ))
                  }
                </Picker>
              </View>
              <View style={styles.identificationInputContent}>
                <TextInput
                  id="cardNumber"
                  label="Número de tarjeta (*)"
                  keyboardType="numeric"
                  required
                  minLength={14}
                  maxLength={16}
                  autoCapitalize="none"
                  errorText="¡UPS! Por favor ingresa un número de tarjeta válida"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  leftIcon={
                    <FontAwesome name="credit-card" size={20} color={primaryColor} />
                  }
                />
              </View>
              <View style={styles.FullNameContent}>
                <TextInput
                  id="fullName"
                  label="Nombres y apellidos (*)"
                  keyboardType="default"
                  minLength={5}
                  required
                  autoCapitalize="words"
                  errorText="¡UPS! Por favor ingresa tu nombre y apellido correctamente."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  leftIcon={
                    <FontAwesome name="user" size={20} color={primaryColor} />
                  }
                />
              </View>
              <View style={styles.rowInputContent}>
                <View style={styles.colInputContent}>
                  <Text style={styles.label}>Mes de expiración</Text>
                  <Picker
                    id="monthExpired"
                    selectedValue={monthExpired}
                    style={styles.TravelContent}
                    onValueChange={(itemValue) => setMonthExpired(itemValue)}
                  >
                    <Picker.Item label="Enero" value="Enero" />
                    <Picker.Item label="Febrero" value="Febrero" />
                    <Picker.Item label="Marzo" value="Marzo" />
                    <Picker.Item label="Abril" value="Abril" />
                    <Picker.Item label="Mayo" value="Mayo" />
                    <Picker.Item label="Junio" value="Junio" />
                    <Picker.Item label="Julio" value="Julio" />
                    <Picker.Item label="Agosto" value="Agosto" />
                    <Picker.Item label="Septiembre" value="Septiembre" />
                    <Picker.Item label="Octubre" value="Octubre" />
                    <Picker.Item label="Noviembre" value="Noviembre" />
                    <Picker.Item label="Diciembre" value="Diciembre" />
                  </Picker>
                </View>
                <View style={styles.colInputContent}>
                  <TextInput
                    id="year_expiration"
                    label="Año de expiración (*)"
                    keyboardType="numeric"
                    required
                    min={2020}
                    max={2050}
                    minLength={4}
                    maxLength={4}
                    autoCapitalize="none"
                    errorText="¡UPS! Por favor ingresa un año válido"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    leftIcon={
                      <FontAwesome name="calendar" size={20} color={primaryColor} />
                    }
                  />
                </View>
              </View>
              <View style={styles.colInputContent}>
                <TextInput
                  id="cvv"
                  label="CVV (*)"
                  keyboardType="numeric"
                  required
                  max={999}
                  minLength={3}
                  maxLength={3}
                  autoCapitalize="none"
                  errorText="¡UPS! Por favor ingresa un CVV válido"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  leftIcon={
                    <FontAwesome name="key" size={20} color={primaryColor} />
                  }
                />
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Button
                    title='Declinar'
                    colorOne={'white'}
                    colorTwo={'white'}
                    fontColor={primaryColor}
                    onPress={declineOffer}
                  />
                </View>
                <View style={styles.col2}>
                  <Button
                    title='Hacer el pago'
                    onPress={changeToPaymentScreen}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" />
            </View>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(200)
  },
  serviceTitleContainer: {
    backgroundColor: '#E8E8E8',
  },
  row: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
    marginTop: normalizeLength(5),
  },
  col1ServiceTitle: {

  },
  col2ServiceTitle: {

  },
  serviceTitle: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(18),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    paddingHorizontal: normalizeLength(30),
    paddingVertical: normalizeLength(10)
  },
  servicePrice: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    paddingLeft: normalizeLength(50),
    paddingVertical: normalizeLength(10)
  },
  showInfoContainer: {
    minHeight: normalizeLength(200),
    marginHorizontal: '10%',
    backgroundColor: 'transparent',
    padding: '5%',
  },
  showInfoContent: {
    marginTop: '3%',
  },
  title: {
    color: primaryColor,
    fontFamily: "Quicksand",
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
  },
  subtitle: {
    color: '#000000',
  },
  valueDeclaredContainer: {
    backgroundColor: 'rgba(93,188,210,.5)',
    paddingTop: normalizeLength(10)
  },
  valueDeclaredInputContent: {
    paddingHorizontal: normalizeLength(60),
    textAlign: 'right'
  },
  valueDeclaredText: {
    color: primaryColor,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(14),
    fontWeight: '900',
    lineHeight: normalizeLength(15),
    textAlign: 'right',
    paddingLeft: normalizeLength(60),
    paddingRight: normalizeLength(30),
    paddingBottom: normalizeLength(20)
  },
  totalContainer: {
    backgroundColor: '#FED043',
  },
  totalTitle: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    paddingVertical: normalizeLength(10)
  },
  col1: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col1Subtotals: {
    minWidth: normalizeLength(250),
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  subtotalsContainer: {
    paddingVertical: normalizeLength(20),
  },
  rowSubtotals: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
  },
  col2Subtotals: {
    minWidth: normalizeLength(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtotalsText: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    fontWeight: '700',
    lineHeight: normalizeLength(18),
    textAlign: 'right'
  },
  subtotalsNumber: {
    color: primaryColor,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(14),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    textAlign: 'right'
  },
  totalPrice: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
  },
  buttonsContainer: {
    marginBottom: normalizeLength(10),
  },
  activityIndicator: {
    marginHorizontal: normalizeLength(20)
  }
});
export default StartCheckoutScreen;
