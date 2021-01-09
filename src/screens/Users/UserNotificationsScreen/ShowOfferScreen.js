import React, { useState, useReducer, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { getUserInfo } from '../../utils/helpers';
import { currencyFormat } from '../../../utils/helpers';
import * as authActions from '../../../redux/actions/auth';
import * as offersActions from '../../../redux/actions/offers';

import Button from "../../../components/UI/Button";
import TextInput from '../../../components/UI/Input';
import UserHeader from "../../../components/UserHeader";
import { normalizeLength } from "../../../styles/layout"
import { primaryColor } from "../../../constants/Colors";
import { collectionTimeSlot } from "../../../constants/Utils";
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

const getcollectionTimeSlot = (collectionTimeSlotItem) =>
  collectionTimeSlot.map((collectionTime) =>
    collectionTime.label === collectionTimeSlotItem ? collectionTime.value : '');

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

const ShowOfferScreen = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = state.auth;
  const offer = state.offer.offerSelected;
  const price = Number.parseInt(((13 * offer.offerValue) / 100)) + Number.parseInt(offer.offerValue);
  const [priceForMP, setpriceForMP] = useState(price); 
  const [totalPriceValue, settotalPriceValue] = useState(currencyFormat(price, 0));

  const startCheckout = () => {
    dispatch(offersActions.saveTotalPrice(priceForMP));
    props.navigation.navigate('PaymentScreen');
  };

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log(inputValue);
      totalPrice(inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      valueDeclared: 0,
    },
    inputValidities: {
      valueDeclared: false,
    },
    formIsValid: false
  });

  const totalPrice = (value) => {
    const price = (Number.parseInt(13 * Number.parseInt(offer.offerValue)) / 100) + Number.parseInt((10 * value) / 100);
    const priceWithTax = (Number.parseInt(offer.offerValue) + price);
    setpriceForMP(priceWithTax);
    settotalPriceValue(currencyFormat(priceWithTax, 0));
  };

  return (
    <View style={styles.servicesContainer}>
      <UserHeader
        title="Hemos encontrado"
        subtitle="el mejor servicio para ti!"
        leftIcon="paper-plane-o"
        isButtonBack
        navigation={props.navigation}
        reDirect="Notifications"
      />
      {user && (
        <View style={styles.mainContainer}>
          <ScrollView>
            <View style={styles.serviceTitleContainer}>
              <View style={styles.row}>
                <View style={styles.col1ServiceTitle}>
                  <Text style={styles.serviceTitle}>Tu servicio:</Text>
                </View>
                <View style={styles.col2ServiceTitle}>
                  <Text style={styles.servicePrice}>{totalPriceValue}</Text>
                </View>
              </View>
            </View>
            <View style={styles.showInfoContainer}>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Ciudad de recogida:</Text>
                <Text style={styles.subtitle}>{offer.currentCity}</Text>
              </View>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Ciudad de destino:</Text>
                <Text style={styles.subtitle}>{offer.destinationCity}</Text>
              </View>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Fecha de recogida:</Text>
                <Text style={styles.subtitle}>{moment(offer.pickUpDate, 'DD/MM/YYYY').format("ll")}</Text>
              </View>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Franja horaria de recogida:</Text>
                <Text style={styles.subtitle}>
                  {getcollectionTimeSlot(offer.timeZone)}
                </Text>
              </View>
            </View>
            <View style={styles.valueDeclaredContainer}>
              <View style={styles.valueDeclaredInputContent}>
                <TextInput
                  id="valueDeclared"
                  label="Valor declarado (*)"
                  keyboardType="numeric"
                  required
                  min={0}
                  max={1000000}
                  minLength={1}
                  maxLength={10}
                  autoCapitalize="none"
                  errorText="¡UPS! Por favor ingresa un valor mayor a 0 y menor que 1.000.000"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  leftIcon={
                    <FontAwesome name="dollar" size={20} color={primaryColor} />
                  }
                />
              </View>
            </View>
            <View style={styles.discountCodeContainer}>

            </View>
            <View style={styles.subtotalsContainer}>
              <View style={styles.rowSubtotals}>
                <View style={styles.col1Subtotals}>
                  <Text style={styles.subtotalsText}>Subtotal: </Text>
                </View>
                <View style={styles.col2Subtotals}>
                  <Text style={styles.subtotalsNumber}>
                    {currencyFormat(price, 0)}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col1Subtotals}>
                  <Text style={styles.subtotalsText}>% Valor declarado: </Text>
                </View>
                <View style={styles.col2Subtotals}>
                  <Text style={styles.subtotalsNumber}>
                    {currencyFormat((10 * formState.inputValues.valueDeclared) / 100, 0)}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col1Subtotals}>
                  <Text style={styles.subtotalsText}>Código promo: </Text>
                </View>
                <View style={styles.col2Subtotals}>
                  <Text style={styles.subtotalsNumber}>{0}</Text>
                </View>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Text style={styles.totalTitle}>VALOR A PAGAR:</Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.totalPrice}>
                    {totalPriceValue}
                  </Text>
                </View>
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
                    onPress={() => declineOffer()}
                  />
                </View>
                <View style={styles.col2}>
                  <Button
                    title='Hacer el pago'
                    onPress={startCheckout}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
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
});

export default ShowOfferScreen;
