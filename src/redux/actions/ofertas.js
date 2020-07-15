import { firestoreDB } from '../../constants/Firebase';
export const CREATE_OFFERS = 'CREATE_OFFER';
export const SHOW_OFFER = 'SHOW_OFFER';

export const createOffer = ({userId, description, startDate, timeRange, contact, movil, pickupAddress, destinationAddress}) =>{
    return async dispach => {
        firestoreDB
            .collection('Offers')
            .doc(userId)
            .set({
                description,
                startDate,
                timeRange,
                contact,
                movil,
                pickupAddress,
                destinationAddress
            });

        dispach({
            type: CREATE_OFFERS,
            userId,
            id: description,
            description,
            startDate,
            timeRange,
            contact,
            movil,
            pickupAddress,
            destinationAddress
        });

    };
};

export const showOffer = (userId) =>{
    return async dispach =>{
        const response = await firestoreDB
                .collection('Offers')
                .doc(userId)
                .get();
        const resData = await response.json();
        dispach({
            type: SHOW_OFFER,
            userId,
            id: resData.description,
            description: resData.description,
            description,
            startDate,
            timeRange,
            contact,
            movil,
            pickupAddress,
            destinationAddress
        });      
    };
};