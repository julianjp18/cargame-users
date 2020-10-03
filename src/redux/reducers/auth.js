import {
  AUTHENTICATE,
  IS_SIGNUP,
  LOGOUT,
  CHANGE_TYPE_SERVICE_SELECTED,
} from "../actions/auth";

const initialState = {
  idToken: null,
  userId: null,
  isSignUp: false,
  email: null,
  typeServiceSelected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_SIGNUP:
      return {
        ...state,
        isSignUp: action.isSignUp,
      };
    case AUTHENTICATE:
      return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
        email: action.email,
      };
    case CHANGE_TYPE_SERVICE_SELECTED:
      return {
        ...state,
        typeServiceSelected: action.typeServiceSelected,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};