import ENV from '../../../env';

export const GET_POSITION = 'GET_POSITION';
export const GET_CURRENT_POSITION = 'GET_CURRENT_POSITION';
export const GET_CURRENT_ORIGIN_SERVICE = 'GET_CURRENT_ORIGIN_SERVICE';
export const CHANGE_FIELD_SELECTED = 'CHANGE_FIELD_SELECTED';
export const GET_CURRENT_DESTINY_SERVICE = 'GET_CURRENT_DESTINY_SERVICE';

export const setOriginLocation = ({ location, address }) => {
  return {
    type: GET_CURRENT_ORIGIN_SERVICE,
    address,
    location
  };
}

export const setDestinationLocation = ({ location, address }) => {
  return {
    type: GET_CURRENT_DESTINY_SERVICE,
    address,
    location
  };
}


export const currentPosition = (location) => dispatch => {

  dispatch({
    type: GET_CURRENT_POSITION,
    latitude: location.lat,
    longitude: location.lng,
  });
};

export const getPosition = (location) => async dispatch => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat
    },${location.lng}&result_type=street_address&key=${ENV.googleApiKey}`)

  if (!response.ok) {
    throw new Error('¡UPS! Error al conseguir la dirección');
  }

  const responseData = await response.json();


  if (!responseData.results) {
    return;
  }
  let getPositionPicked;
  if (responseData.status === 'ZERO_RESULTS') {
    getPositionPicked = {
      status: responseData.status,
      address: 'Por favor selecciona un punto dentro de una ciudad'
    };
  } else {

    if (responseData.results[0]) {
      getPositionPicked = {
        lat: location.lat,
        lng: location.lng,
        address: responseData.results[0].formatted_address,
        status: responseData.status,
      };
    } else {
      getPositionPicked = {
        status: responseData.status,
        address: 'Por favor selecciona un punto dentro de una ciudad'
      };
    }
  }

  dispatch({
    type: GET_POSITION,
    getPositionPicked,
  });

  return getPositionPicked;
};

export const savePosition = (location, typeFieldSelected) => dispatch => {
  let action;

  switch (typeFieldSelected) {
    case 'isOriginCityService':
      action = GET_CURRENT_ORIGIN_SERVICE;
      break;
    case 'isDestinyCityService':
      action = GET_CURRENT_DESTINY_SERVICE;
      break;
    default:
      action = '';
      break;
  }

  dispatch({
    type: action,
    coords: {
      lat: location.latitude,
      lng: location.longitude,
    },
    address: location.address
  });
};

export const changeFieldSelected = (typeFieldSelected) => dispatch => {
  dispatch({
    type: CHANGE_FIELD_SELECTED,
    typeFieldSelected,
  });
};
