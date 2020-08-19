import { SHOW_NOTIFICATIONS } from "../actions/notifications";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATIONS:
            return {
                driverNotifications: action.driverNotifications,
            };
        default:
            return state;
    }
};