import {
  CREATE_OFFER,
  SHOW_OFFER,
  ADD_DESTINATION_OFFER,
} from "../actions/offers";
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
        phine: action.phone,
        pickUpDate: action.pickUpDate,
        pickUpAddress: action.pickUpAddress,
        status: action.status,
        timeZone: action.timeZone,
      };
    case ADD_DESTINATION_OFFER:
      return {
        currentAddress: action.currentAddress,
        destinationAddress: action.destinationAddress,
      };
    default:
      return state;
  }
};