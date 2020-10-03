import { SHOW_NOTIFICATIONS } from "../actions/notifications";

const initialState = {
    userNotifications: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATIONS:
            return {
                userNotifications: action.userNotifications,
            };
        default:
            return state;
    }
};