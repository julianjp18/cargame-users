import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    StyleSheet, View, Text,
    ActivityIndicator, Alert, Image, ScrollView,
} from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import TextInput from '../../components/UI/Input';
import * as userActions from '../../redux/actions/users';

import { FontAwesome } from '@expo/vector-icons';
import { shortBrandOrangeGreyUrl } from '../../constants/Utils';
import { primaryColor, textPrimaryColor } from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type == FORM_INPUT_UPDATE) {
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
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    
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

    const registerHandler = async () => {
        const action = userActions.createUser({
            userId,
            name: formState.inputValues.name,
            numberId: formState.inputValues.numberId,
            phone: formState.inputValues.phone,
            referidNumber: formState.inputValues.referidNumber
        });
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('ServicesList');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity ) => {
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
            Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien'}]);
        }
    }, [error]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={shortBrandOrangeGreyUrl}
                />
            </View>
            <Text style={styles.registerInfoText}>¡Te ayudamos a conectar directamente con los clientes!</Text>
            <View style={styles.authContainer}>
                <KeyboardAwareView animated={true}>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
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
                                errorText="¡UPS! Por favor ingresa un número de referido correcto."
                                onInputChange={inputChangeHandler}
                                leftIcon={
                                    <FontAwesome name="pencil" size={20} color={primaryColor} />
                                }
                                initialValue=""
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.btnActionContainer}>
                        {isLoading
                            ? <ActivityIndicator size='large' color={primaryColor} />
                            : <Button
                                title="Finalizar registro"
                                onPress={registerHandler}
                            />
                        }
                    </View>
                </KeyboardAwareView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    logo: {
        width: 150,
        height: 150,
    },
    authContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        width: '100%',
        height: '90%'
    },
    registerInfoText: {
        paddingBottom: '8%',
        paddingHorizontal: '10%',
        textAlign: 'center',
        fontSize: 20,
        color: textPrimaryColor
    },
    referidNumberInfo: {
        paddingTop: '1%',
        textAlign: "center",
        fontSize: 12,
        color: textPrimaryColor
    },
    btnActionContainer: {
        marginTop: '2%'
    },

});

export default RegisterScreen;