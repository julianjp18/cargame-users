import { firebaseAuth } from '../../constants/Firebase';
import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const IS_SIGNUP = 'IS_SIGNUP';
export const CHANGE_TYPE_SERVICE_SELECTED = 'CHANGE_TYPE_SERVICE_SELECTED';

export const authenticate = (localId, idToken, email) => {
  return {
    type: AUTHENTICATE,
    userId: localId,
    idToken,
    email,
  };
};

export const signup = (email, password) => async dispatch => {
  await firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const resData = response.user;

      resData.getIdToken().then((idToken) => {
        dispatch(authenticate(resData.uid, idToken, email));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.createdAt) * 1000);
        saveDataToStorage(idToken, resData.uid, expirationDate, email);
      });
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico se encuentra en uso. Intentalo nuevamente.'
      } else if (errorCode === 'OPERATION_NOT_ALLOWED') {
        errorMessage = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
      } else if (errorCode === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errorMessage = 'Se ha decidido bloquear la actividad de este dispositivo. Intenta más tarde.';
      }

      throw new Error(errorMessage);
    });
};

export const signin = (email, password) => async dispatch => {
  await firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const resData = response.user;
      resData.getIdToken().then((idToken) => {
        dispatch(authenticate(resData.uid, idToken, email));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.createdAt) * 1000);
        saveDataToStorage(idToken, resData.uid, expirationDate, email);
      });
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'EMAIL_NOT_FOUND') {
        errorMessage = 'No reconocemos este correo electrónico. Intentalo nuevamente.'
      } else if (errorCode === 'INVALID_PASSWORD') {
        errorMessage = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
      }

      throw new Error(errorMessage);
    });
};

const saveDataToStorage = (idToken, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: idToken,
      userId,
      expirationDate,
      email: email,
    }))
};

export const setIsSignUp = (isSignUp) => {
  return { type: IS_SIGNUP, isSignUp };
};

export const setTypeService = (service) => {
  return { type: CHANGE_TYPE_SERVICE_SELECTED, typeServiceSelected: service };
};

export const logout = () => {
  AsyncStorage.clear();
  return { type: LOGOUT };
};