import { firestoreDB } from "../../constants/Firebase";
export const CREATE_OFFER = "CREATE_OFFER";
export const SHOW_OFFER = "SHOW_OFFER";
export const CHANGE_PROFILE_PICTURE = "CHANGE_PROFILE_PICTURE";
export const ADD_DESTINATION_OFFER = "ADD_DESTINATION_OFFER";
export const OFFER_SELECTED = "OFFER_SELECTED";

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
  offerValue = '',
  dateOffered = '',
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
    pickUpAddress,
    pickUpDate,
    status,
    offerValue,
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

  const {
    currentCity,
    destinationCity,
    timeZone,
    pickUpDate,
    offerValue,
    driverId,
  } = await data.then((doc) => doc.data());

  const driverData = firestoreDB
  .collection("Drivers")
  .doc(driverId)
  .get();

  const {
    name,
    phone
  } = await driverData.then((doc) => doc.data());


  if (currentCity && destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        currentCity,
        destinationCity,
        timeZone,
        pickUpDate,
        offerValue,
        offerId,
        driver: {
          name,
          phone,
        },
      },
    });
  }
};

export const saveResumeOfferSelected = (offerId) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const {
    currentCity,
    destinationCity,
    timeZone,
    pickUpDate,
    offerValue,
    description,
    driverId,
  } = await data.then((doc) => doc.data());

  const driverData = firestoreDB
  .collection("Drivers")
  .doc(driverId)
  .get();

  const {
    name,
    phone
  } = await driverData.then((doc) => doc.data());

  if (currentCity && destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        currentCity,
        destinationCity,
        timeZone,
        pickUpDate,
        offerValue,
        offerId,
        description,
        driver: {
          name,
          phone,
        },
      },
    });
  }
};
