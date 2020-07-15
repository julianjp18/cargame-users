import { firestoreDB } from '../../constants/Firebase';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';

export const showUserNotifications = (userId) => dispatch => {

    const data = firestoreDB
    .collection("Notifications_Users");

    dispatch({
        type: SHOW_NOTIFICATIONS,
        userNotifications: data
    });
};