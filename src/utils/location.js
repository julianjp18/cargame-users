// Dependencias
import * as Location from 'expo-location';

/**
 * Obtiene la ubicación actual
 * @param {Object} [options] Opciones adicionales
 */
const getCurrentLocation = async (options) => {
    let data;
    try {
        data = await Location.getCurrentPositionAsync(options);
    }
    catch (err) {
        // 
    }
    return data;
};

/**
 * Suscribe a un evento para actualizar la ubicación actual
 * @param {Function} cb      Función de retorno para actualizar
 *                           la ubicación 
 * @param {Object} [options] Opciones adicionales
 */
const watchCurrentLocation = async (cb, options = {}) => {
    let data;
    try {
        data = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                ...options
            },
            cb
        );
    }
    catch (err) {
        // 
    }
    return data;
};

/**
 * Obtiene la ubicación de una dirección
 * @param {String} address Dirección
 */
const getLocationFromAddress = async (address) => {
    let data;
    try {

        data = await Location.geocodeAsync(address);
    }
    catch (err) {
        // 
    }
    return data;
}

/**
 * Obtiene la dirección de una ubicación
 * @param {Object} location Ubicación {latitude,longitude}
 */
const getPlaceFromLocation = async (location) => {
    let data;
    try {
        data = await Location.reverseGeocodeAsync(location);
        if (data && data.length > 0) {
            const address = `${data[0].name || data[0].street}, ${data[0].region}, ${data[0].postalCode}`
            data = {
                ...data[0],
                address
            };
        }
    }
    catch (err) {
        // 
    }
    return data;
}
export {
    getCurrentLocation,
    watchCurrentLocation,
    getLocationFromAddress,
    getPlaceFromLocation
};