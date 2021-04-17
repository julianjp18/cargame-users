import {
  CREATE_OFFER,
  SHOW_OFFER,
  ADD_DESTINATION_OFFER,
  OFFER_SELECTED,
  FINAL_TOTAL_PRICE_OFFER,
  SAVE_OFFER_SELECTED,
} from "../actions/offers";
const initialState = {
  offerSelected: {},
  finalTotalPriceOffer: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_OFFER:
    case CREATE_OFFER:
      return {
        ...state,
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
        offerSelected: null,
      };
    case ADD_DESTINATION_OFFER:
      return {
        ...state,
        currentAddress: action.currentAddress,
        destinationAddress: action.destinationAddress,
      };
    case SAVE_OFFER_SELECTED:
    case OFFER_SELECTED:
      return {
        ...state,
        offerSelected: action.offerSelected,
      };
    case FINAL_TOTAL_PRICE_OFFER:
      return {
        ...state,
        finalTotalPriceOffer: action.finalTotalPriceOffer,
      };
    default:
      return state;
  }
};
