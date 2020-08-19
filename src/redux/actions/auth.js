import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const IS_SIGNUP = 'IS_SIGNUP';
export const CHANGE_TYPE_SERVICE_SELECTED = 'CHANGE_TYPE_SERVICE_SELECTED';

const API_KEY = 'AIzaSyCaZhTD1MZEREJaZrkL3nJQRO4jbpeNV2U';
const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';

export const authenticate = (userId, token, email) => {
    return {
        type: AUTHENTICATE,
        userId: userId,
        token: token,
        email,
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(API_URL + 'signUp?key=' + API_KEY,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }    
        );
        
        const resData = await response.json();

        if (!response.ok) {
            const errorId = resData.error.message;
            let message = '¡UPS! Algo ocurrió.';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'El correo electrónico se encuentra en uso. Intentalo nuevamente.'
            } else if (errorId === 'OPERATION_NOT_ALLOWED') {
                message = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
            } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = 'Se ha decidido bloquear la actividad de este dispositivo. Intenta más tarde.';
            }
            throw new Error(message);
        }

        dispatch(authenticate(resData.localId, resData.idToken, email));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate, email);
    };
};

export const signin = (email, password) => {

    return async dispatch => {
        const response = await fetch(
            API_URL + 'signInWithPassword?key='+ API_KEY,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }    
        );

        if (!response.ok) {
            
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = '¡UPS! Algo ocurrió. Por favor intentalo nuevamente.';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'No reconocemos este correo electrónico. Intentalo nuevamente.'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken, email));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate, email) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId, userId,
            expirationDate: expirationDate.toISOString(),
            email: email,
        }))
};

export const setIsSignUp = () => {
    return { type: IS_SIGNUP, isSignUp: true};
};

export const setTypeService = (service) => {
    return { type: CHANGE_TYPE_SERVICE_SELECTED, typeServiceSelected: service};
};

export const logout = () => {
    return { type: LOGOUT };
};