import { firestoreDB } from '../../constants/Firebase';
import moment from "moment";
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const SAVE_DESTINATION_NOTIFICATION = 'SAVE_DESTINATION_NOTIFICATION';

export const showUserNotifications = (userId) => dispatch => {

    const data = firestoreDB
    .collection("NotificationsUsers")
    .get();

    const notificationsData = [];
    data.then((allNotifications) => {
        allNotifications.forEach(notification => {
            if (
                notification.data().userId === "0" ||
                notification.data().userId === userId
            ) {
                notificationsData.push(notification.data());
            }
        });
    });
    
    dispatch({
        type: SHOW_NOTIFICATIONS,
        userNotifications: data
    });
};

export const saveNotificationDestinationOffer = async ({ offerId, userId }) => {
  await firestoreDB
  .collection("NotificationsUsers")
  .add({
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    message: 'Has solicitado un nuevo servicio',
    typeMessage: 'Information',
    userId,
    offerId,
  });
};