import {
  GET_POSITION,
  GET_CURRENT_POSITION,
  GET_CURRENT_ORIGIN_SERVICE,
  CHANGE_FIELD_SELECTED,
  GET_CURRENT_DESTINY_SERVICE,
} from "../actions/places";

const initialState = {
  currentOriginAddress: false,
  currentOriginCoords: false,
  currentOriginCity: null,
  currentDestinyAddress: null,
  currentDestinyCity: null,
  currentDestinyCoords: null,
  currentPosition: null,
  getPositionPicked: {
    address: "Por favor selecciona un punto dentro de una ciudad",
    latitude: null,
    longitude: null,
    status: "ZERO_RESULTS",
  },
  typeFieldSelected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSITION:
      return {
        ...state,
        getPositionPicked: action.getPositionPicked,
      };
    case GET_CURRENT_ORIGIN_SERVICE:
      return {
        ...state,
        currentOriginAddress: action.address,
        currentOriginCoords: action.location,
        currentOriginCity: action.city
      };
    case GET_CURRENT_DESTINY_SERVICE:
      return {
        ...state,
        currentDestinyAddress: action.address,
        currentDestinyCoords: action.location,
        currentDestinyCity: action.city
      };
    case CHANGE_FIELD_SELECTED:
      return {
        ...state,
        typeFieldSelected: action.typeFieldSelected,
      };
    case GET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: {
          latitude: action.latitude,
          longitude: action.longitude,
        },
      };
    default:
      return state;
  }
};