import { firestoreDB } from "../../constants/Firebase";
export const CREATE_USER = "CREATE_USER";
export const SHOW_USER = "SHOW_USER";
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';
export const CHANGE_PROFILE_PICTURE = 'CHANGE_PROFILE_PICTURE';


export const createUser = ({
  userId,
  name,
  lastname,
  numberId,
  email,
  phone,
  referidNumber,
}) => {
  return async (dispatch) => {
    firestoreDB.collection("Users").doc(userId).set({
      name,
      lastname,
      numberId,
      email,
      phone,
      referidNumber,
      profilePicture: null,
    });

    dispatch({
      type: CREATE_USER,
      userId,
      id: name,
      name,
      lastname,
      numberId,
      phone,
      referidNumber,
      profilePicture: null,
    });
  };
};

export const showUser = (userId) => async dispatch => {
  const data = await firestoreDB
    .collection("Users")
    .doc(userId)
    .get()
    .then((doc) => doc.data());

  dispatch({
    type: SHOW_USER,
    userId,
    id: data.name,
    name: data.name,
    lastname: data.lastname,
    numberId: data.numberId,
    phone: data.phone,
    referidNumber: data.referidNumber,
    profilePicture: data.profilePicture,
  });
};

export const changePhoneNumber = (phoneNumber, userId) => async dispatch => {
    const data = await firestoreDB
    .collection("Users")
    .doc(userId)
    .then((doc) => doc.data());

    const newData = {
        ...data,
        phone: phoneNumber,
    }

    const updateData = await firestoreDB.collection('Users').doc(userId).set(newData);
    dispatch({
        type: CHANGE_PHONE_NUMBER,
        userId,
        phone: phoneNumber,
    });
}

export const changeProfilePicture = (profilePicture, userId) => async dispatch => {
    const data = await firestoreDB
        .collection('Users')
        .doc(userId)
        .get().then((doc) => doc.data());

    const newData = {
        ...data,
        profilePicture,
    }
   
    const updateData = await firestoreDB.collection('Users').doc(userId).set(newData);
    dispatch({
        type: CHANGE_PROFILE_PICTURE,
        userId,
        profilePicture,
    });
};