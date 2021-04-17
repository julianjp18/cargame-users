import { firestoreDB } from "../../constants/Firebase";
export const CREATE_OFFER = "CREATE_OFFER";
export const SHOW_OFFER = "SHOW_OFFER";
export const CHANGE_PROFILE_PICTURE = "CHANGE_PROFILE_PICTURE";
export const ADD_DESTINATION_OFFER = "ADD_DESTINATION_OFFER";
export const OFFER_SELECTED = "OFFER_SELECTED";
export const FINAL_TOTAL_PRICE_OFFER = "FINAL_TOTAL_PRICE_OFFER";
export const SAVE_OFFER_SELECTED = 'SAVE_OFFER_SELECTED';

// definicion base de datos de Ofertas.
export const createOffer = ({
  userId,
  description,
  timeZone,
  collectedDate,
  pickUpDate,
  contact,
  phone,
  currentAddress = null,
  currentCity = null,
  destinationAddress = null,
  destinationCity = null,
  driverId = null,
  pickUpAddress = null,
  status = 'ACTIVE',
  offerValue = 0,
  dateOffered = '',
  typeServiceSelected,
  user,
}) => async (dispatch) => {
  const uid = [];
  await firestoreDB.collection("OffersNotificationCenter").add({
    userId,
    description,
    timeZone,
    collectedDate,
    dateOffered,
    contact,
    phone,
    currentAddress,
    currentCity,
    destinationAddress,
    destinationCity,
    driverId,
    timesOffered: 0,
    pickUpAddress,
    pickUpDate,
    status,
    offerValue,
    typeServiceSelected,
    dateStarted: '',
    user,
  }).then((ref) => uid.push(ref.id));

  if (uid[0]) {
    dispatch({
      type: CREATE_OFFER,
      userId,
      id: uid[0],
      description,
      timeZone,
      collectedDate,
      contact,
      phone,
      currentAddress,
      currentCity,
      destinationAddress,
      destinationCity,
      driverId,
      pickUpAddress,
      pickUpDate,
      status,
      typeServiceSelected,
    });
  }
};

export const addDestinationToOffer = ({
  id,
  currentCity,
  destinationCity,
  originAddress,
  destinyAddress,
}) => async (dispatch) => {
  dispatch({
    type: ADD_DESTINATION_OFFER,
    currentCity,
    destinationCity,
    currentAddress: originAddress,
    destinationAddress: destinyAddress
  });

  await firestoreDB.collection("OffersNotificationCenter").doc(id).update({
    currentCity,
    destinationCity,
    currentAddress: originAddress,
    destinationAddress: destinyAddress
  });
};

// consulta por usuario de las ofertas disponibles
export const showOffer = (userId) => async (dispatch) => {
  const data = await firestoreDB
    .collection("OffersNotificationCenter")
    .doc(userId)
    .get()
    .then((doc) => doc.data());

  dispatch({
    type: SHOW_OFFER,
    userId,
    id: data.userId,
    collectionDate: data.collectionDate,
    contact: data.contact,
    currentAddress: data.currentCity,
    currentCity: data.currentCity,
    description: data.description,
    destinationAddress: data.destinationAddress,
    destinationCity: data.destinationCity,
    driverId: data.driverId,
    phone: data.phone,
    offerValue: data.offerValue,
    pickUpAddress: data.pickUpAddress,
    pickUpDate: data.pickUpDate,
    status: data.status,
    timeZone: data.timeZone,
  });
};

export const saveOfferSelected = (offerId) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const responseData = await data.then((doc) => doc.data());

  let responseDriver = {};
  if (responseData.driverId) {
    const driverData = firestoreDB
      .collection("Drivers")
      .doc(responseData.driverId)
      .get();

    responseDriver = await driverData.then((doc) => doc.data());

  }

  dispatch({
    type: SAVE_OFFER_SELECTED,
    offerSelected: {
      ...responseData,
      driver: {
        name: responseDriver ? responseDriver.name : '',
        phone: responseDriver ? responseDriver.phone : '',
      },
    },
  });
};

export const saveResumeOfferSelected = (offerId) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const responseData = await data.then((doc) => doc.data());

  const driverData = firestoreDB
    .collection("Drivers")
    .doc(responseData.driverId)
    .get();

  const driver = await driverData.then((doc) => doc.data());

  if (responseData.currentCity && responseData.destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        ...responseData,
        driver: {
          name: driver.name,
          phone: driver.phone,
        },
      },
    });
  }
};

export const saveTotalPrice = (price, offerId, driverId) => async dispatch => {
  const updateData = firestoreDB.collection('HistoryOffersNotificationCenter').doc(`${offerId}_${driverId}`).update({
    totalPrice: price,
    driverId,
  });

  dispatch({
    type: FINAL_TOTAL_PRICE_OFFER,
    finalTotalPriceOffer: price,
  });

  return await updateData.then(() => true).catch(() => false);
};

export const cancelOffer = (offerId, notificationId) => async dispatch => {

  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    driverId: '',
    offerValue: 0,
    dateOffered: '',
    status: 'ACTIVE',
  });

  const responseUpdateData = updateData.then(() => true).catch(() => false);

  const notificationIdData = firestoreDB.collection("NotificationsDriver").doc(notificationId).get();

  const notificationDriverId = [];
  await notificationIdData.then((doc) => notificationDriverId.push({ id: doc.id, ...doc.data() }));

  firestoreDB
    .collection('OffersCanceled')
    .doc()
    .set({
      driverId: notificationDriverId[0].driverId,
      offerId: notificationDriverId[0].offerId,
      userId: notificationDriverId[0].userId,
      dateCanceled: moment().format(),
    });

  return firestoreDB.collection("NotificationsDriver")
    .doc(notificationDriverId[0].id)
    .delete().then(() => {
      return true;
    }).catch((error) => {
      return false;
    });
};
