import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  StyleSheet, View, Text,
  ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as Network from 'expo-network';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';
import Button from '../../components/UI/Button';
import TextInput from '../../components/UI/Input';
import * as userActions from '../../redux/actions/users';
import { getUserInfo } from '../../utils/helpers';

import { FontAwesome } from '@expo/vector-icons';
import { primaryColor, textPrimaryColor } from '../../constants/Colors';
import SimpleHeader from '../../components/SimpleHeader';
import { normalizeLength } from '../../styles/layout';

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

const RegisterScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSelected, setSelection] = useState(false);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    setUserId(userInfo.userId);
  });

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      numberId: '',
      phone: '',
      referidNumber: ''
    },
    inputValidities: {
      name: false,
      numberId: false,
      phone: false,
      referidNumber: false
    },
    formIsValid: false
  });

  const termsAndConditionsOnPress = () => Linking.openURL('https://expo.io');

  const registerHandler = async () => {
    const {
      name,
      numberId,
      phone,
      referidNumber,
    } = formState.inputValues;

    if (userId && isSelected) {

      const ipAdress = await Network.getIpAddressAsync();

      if (
        name &&
        numberId &&
        phone
      ) {
        const action = userActions.createUser({
          userId,
          name,
          numberId,
          phone,
          referidNumber: referidNumber ? referidNumber : '',
          ipAdress,
        });
        setError(null);
        setIsLoading(true);
        try {
          dispatch(action);
          props.navigation.navigate('Dashboard');
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      } else {
        Alert.alert('', 'Por favor completa todos los campos requeridos', error, [{ text: 'Está bien' }]);
      }
    } else {
      Alert.alert('', 'Por favor acepta los términos y condiciones', error, [{ text: 'Está bien' }]);
    }

  };

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

  useEffect(() => {
    if (error) {
      Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien' }]);
    }
  }, [error]);

  return (
    <View style={styles.mainContainer}>
      <SimpleHeader
        title='Cuéntanos de tí'
        hasNext
        current={1}
        final={2}
        previusButton={() => props.navigation.navigate('Auth')}
      />
      <View style={styles.authContainer}>
        <KeyboardAwareView style={styles.scrollViewContainer}>
          <ScrollView style={styles.scrollViewContent}>
            <TextInput
              id="name"
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
            <Text style={styles.referidNumberInfo}>Más tarde deberás verificar tu cédula desde tu perfil</Text>
            <TextInput
              id="numberId"
              label="Cédula de ciudadania (*)"
              keyboardType="numeric"
              required
              minLength={4}
              maxLength={10}
              autoCapitalize="none"
              errorText="¡UPS! Por favor ingresa un número de identificación correcto."
              onInputChange={inputChangeHandler}
              initialValue=""
              leftIcon={
                <FontAwesome name="id-card-o" size={20} color={primaryColor} />
              }
            />
            <TextInput
              id="phone"
              label="Celular (*)"
              keyboardType="numeric"
              required
              minLength={10}
              maxLength={10}
              autoCapitalize="none"
              errorText="¡UPS! Por favor ingresa un número de celular correcto."
              onInputChange={inputChangeHandler}
              initialValue=""
              leftIcon={
                <FontAwesome name="phone" size={20} color={primaryColor} />
              }
            />
            <TextInput
              id="referidNumber"
              label="Número de referido"
              keyboardType="numeric"
              minLength={6}
              maxLength={6}
              autoCapitalize="none"
              onInputChange={inputChangeHandler}
              leftIcon={
                <FontAwesome name="pencil" size={20} color={primaryColor} />
              }
              initialValue=""
            />
            <View
              style={styles.checkboxContainer}
              onPress={() => setSelection(!isSelected)}
            >
              <CheckBox
                title={
                  <Text style={styles.checkBoxText}>
                    {`Estoy de acuerdo con los `}
                    <Text style={styles.termsAndConditions} onPress={termsAndConditionsOnPress}>términos y condiciones</Text>
                  </Text>
                }
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
              />
            </View>
            <View style={styles.btnActionContainer}>
              {isLoading
                ? (<ActivityIndicator size='large' color={primaryColor} />)
                : (
                  <Button
                    title="Finalizar registro"
                    onPress={registerHandler}
                  />
                )}
            </View>
          </ScrollView>
        </KeyboardAwareView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(300),
  },
  authContainer: {
    marginTop: normalizeLength(5),
    paddingHorizontal: normalizeLength(10),
    minWidth: normalizeLength(350),
    minHeight: normalizeLength(400),
    height: '100%'
  },
  scrollViewContainer: {
    minWidth: normalizeLength(350),
    height: '100%'
  },
  scrollViewContent: {
    minWidth: normalizeLength(350),
    height: '100%'
  },
  registerInfoText: {
    paddingBottom: normalizeLength(10),
    paddingHorizontal: normalizeLength(15),
    textAlign: 'center',
    fontSize: 20,
    color: textPrimaryColor
  },
  referidNumberInfo: {
    paddingTop: normalizeLength(1),
    textAlign: 'center',
    fontSize: normalizeLength(10),
    color: textPrimaryColor
  },
  checkboxContainer: {
    marginBottom: normalizeLength(20),
  },
  checkBoxText: {
    paddingLeft: normalizeLength(5)
  },
  termsAndConditions: {
    color: primaryColor,
    fontSize: normalizeLength(14)
  }
});

export default RegisterScreen;