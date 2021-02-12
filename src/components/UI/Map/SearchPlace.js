/**
 * Componente Input de busqueda de lugares
 * 
 */

// Dependencias
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Hooks
import useCurrentPosition from '../../../hooks/useCurrentPosition';

// Configuración
import ENV from '../../../../env';

/**
 * Componente Input de busqueda de lugares
 * 
 * @param {String} [address]        Dirección a mostrar en el componente
 * @param {Object} [configuration]  Configuración adicional del componente
 * @param {Function} handleEvent    Manejador del evento al seleccionar una dirección 
 * @param {Function} leftComponent  Componente izquierdo
 * @param {Function} rightComponent Componente derecho
 */
const SearchPlace = ({
    address,
    configuration,
    handleEvent,
    leftComponent,
    rightComponent
}) => {

    // Obtiene la ubicación actual
    const currentPosition = useCurrentPosition();

    // Estado para el texto actual
    const [value, setValue] = useState(address);

    // Efecto para actualizar la dirección si cambia como prop
    useEffect(() => {
        if (value !== address) {
            setValue(address);
        }
    }, [address]);

    /**
     * Función que controla el evento al seleccionar una ubicación
     * @param {Object} place   Datos del lugar
     * @param {Object} details Detalles de ubicación
     */
    const _handleEvent = (place, details) => {

        let location, _address;
        if (place.geometry && place.geometry.isCurrentLocation) {
            location = currentPosition && currentPosition.location;
            _address = currentPosition && currentPosition.address;
        }
        else if (details && details.geometry) {
            location = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
            };
            _address = place && place.description;
        }

        if (!location || !_address) { return null };

        handleEvent({ location, address: _address }, place, details);
        setValue(_address);
    };

    const {
        placeholder = 'Busqueda...',
        // Mínimo número de caracteres para realizar la busqueda
        minLength = 3,
        // Tiempo de rebote para la busqueda
        debounce = 200,
        currentLocationLabel = 'Ubicación Actual'
    } = configuration || {};

    // Lugares predefinidos
    const predefinedPlaces = [
        {
            description: currentLocationLabel,
            geometry: { isCurrentLocation: true }
        }
    ];

    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            minLength={minLength}
            styles={styles}
            returnKeyType='search'
            renderLeftButton={leftComponent}
            renderRightButton={rightComponent}
            onPress={_handleEvent}
            predefinedPlaces={predefinedPlaces}
            query={{
                key: ENV.googleApiKey,
                language: "es"
            }}
            textInputProps={{ value, onChange: (e) => setValue(e.target.value) }}
            debounce={debounce}
            fetchDetails
        />
    );
}

// PropTypes
SearchPlace.propTypes = {
    address: PropTypes.string,
    configuration: PropTypes.object,
    handleEvent: PropTypes.func,
    leftComponent: PropTypes.func,
    rightComponent: PropTypes.func
};

const styles = StyleSheet.create({
    textInput: {
        fontSize: 16,
    },
    description: {
        fontWeight: 'bold',
    }
});
export default SearchPlace;