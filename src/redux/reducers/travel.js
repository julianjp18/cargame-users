import { SHOW_TRIPS_IN_PROGRESS, SHOW_TRIPS_MADE, SHOW_TRIP_SELECTED } from "../actions/travels";

const initialState = {
  tripsInProgress: null,
  tripsMade: null,
  tripSelected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TRIPS_IN_PROGRESS:
      return {
        ...state,
        tripsInProgress: action.tripsInProgress,
      };
    case SHOW_TRIPS_MADE:
      return {
        ...state,
        tripsMade: action.tripsMade,
      };
    case SHOW_TRIP_SELECTED:
      return {
        ...state,
        tripSelected: action.tripSelected,
      }
    default:
      return state;
  }
};
