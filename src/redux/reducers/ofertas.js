import { SHOW_OFFER, CREATE_OFFERS } from '../actions/ofertas';

const initialState = null

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_OFFER:
        case CREATE_OFFERS:
            return {
                id:action.id,
                description: action.description,
                startDate: action.startDate,
                timeRange: action.timeRange,
                contact: action.contact,
                movil: action.movil,
                pickupAddress: action.pickupAddress,
                destinationAddress: action.destinationAddress
            };
        default:
            return state;    
    }
};