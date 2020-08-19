// Fecha  : Ultima revision Agosto 19 - 2020
// Autor  : Flavio Cortes
// Detalle: definicion Hook para la persistencia de la tabla oferta.

import { CREATE_OFFER, SHOW_OFFER } from "../actions/offers";
const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_OFFER:
    case CREATE_OFFER:
      return {
        id: action.id,
        description: action.description,
        contact: action.contact,
        currentAddress: action.currentAddress,
        currentCity: action.currentCity,
        userId: action.userId,
        destinationAddress: action.destinationAddress,
        destinationCity: action.destinationCity,
        driverId: action.driverId,
        movil: action.movil,
        pickUpDate: action.pickUpDate,
        pickUpAddress: action.pickUpAddress,
        status: action.status,
        timeZone: action.timeZone,
      };
    default:
      return state;
  }
};
