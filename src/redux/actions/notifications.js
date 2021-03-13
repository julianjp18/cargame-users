import { firestoreDB } from '../../constants/Firebase';
import moment from "moment";
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const SAVE_DESTINATION_NOTIFICATION = 'SAVE_DESTINATION_NOTIFICATION';

const offerData = async (offerId) => {
  const resOffer = [];

  await firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get().then((doc) => resOffer.push(doc.data()));

  return resOffer[0];
};

export const showUserNotifications = (userId) => async (dispatch) => {

  const data = await firestoreDB
    .collection('NotificationsUsers')
    .get().then((allNotifications) => allNotifications);

  const notificationsData = [];
  if (data) {
    data.forEach(async (notification) => {
      if (
        notification.data().userId === "0" ||
        notification.data().userId === userId
      ) {
        if (notification.data().offerId != '') {
          const { currentCity, destinationCity } = await firestoreDB
            .collection("OffersNotificationCenter")
            .doc(notification.data().offerId)
            .get().then((doc) => doc.data());

          notificationsData.push({
            ...notification.data(),
            currentCity,
            destinationCity,
            id: notification.id,
          });
        } else
          notificationsData.push({ ...notification.data(), id: notification.id });
      }
    });
  }

  const dataConfirmationPayments = await firestoreDB
    .collection('ConfirmationPayments')
    .where("userId", "==", userId)
    .get().then((allNotifications) => allNotifications);

  if (dataConfirmationPayments) {
    dataConfirmationPayments.forEach(notification => {
      notificationsData.push({ ...notification.data(), id: notification.id, message: 'Tu pago se encuentra confirmado, mira el resumen de tu servicio', userId });
    });
  }

  dispatch({
    type: SHOW_NOTIFICATIONS,
    userNotifications: notificationsData
  });
};

export const saveNotificationDestinationOffer = async ({
  offerId,
  userId,
  currentCity,
  destinationCity,
  originAddress,
  destinyAddress,
}) => {
  await firestoreDB
    .collection("NotificationsUsers")
    .add({
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      message: 'Has solicitado un nuevo servicio',
      typeMessage: 'Information',
      userId,
      offerId,
      currentCity,
      destinationCity,
      originAddress,
      destinyAddress,
    });
};
