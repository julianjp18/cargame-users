/**
 * Hooks para el mapa
 */

//  Dependencias
import { useState } from "react";

// Hooks
import useCurrentPosition from "../../../hooks/useCurrentPosition";

/**
 * Valida que la ubicación sea correcta
 * @param {Object} data Ubicación
 */
const validLocation = (data) => {
    if (
        !data ||
        !data.latitude ||
        !data.longitude
    ) {
        return false;
    }
    return true;
};

/**
 * Hook para los marcadores del mapa
 * 
 * @param {Object} [_data] Marcadores iniciales
 */
const useMarkers = (_data = {}) => {
    const [data, setData] = useState(_data);

    // Manejadores de eventos
    const handlers = {
        /**
         * Agrega un nuevo marcador normalizado por nombre
         * @param {String} name    Nombre/Clave del marcador
         * @param {Object} newData Datos del marcador
         */
        add: (name, newData) => {
            const { location, color, title, description } = newData || {};
            if (!newData || !validLocation(location)) {
                return;
            }
            setData({
                ...data,
                [name]: {
                    location: { ...location },
                    color,
                    title,
                    description
                }
            });
        },
        /**
         * Elimina un marcador por su nombre
         * @param {String} name Nombre/Clave a eliminar
         */
        delete: (name) => {
            const newData = { ...data };
            delete newData[name];
            setData(newData);
        }
    };
    return [
        data,
        handlers
    ];
};

/**
 * Hook para la región o la ubicación en el mapa
 * 
 * @param {Object} [_data] Región inicial
 */
const useRegion = (_data = null) => {

    const [data, setData] = useState(_data);

    // Manejadores de eventos
    const handlers = {
        /**
         * Actualiza la región actual
         * @param {Object} newData Datos de la región
         */
        change: (newData) => {
            if (!validLocation(newData)) {
                return;
            }
            const {
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
            } = newData;

            if (!data ||
                latitude !== data.latitude ||
                longitude !== data.longitude ||
                latitudeDelta !== data.latitudeDelta ||
                longitudeDelta !== data.longitudeDelta
            ) {
                setData({
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta
                });
            }
        }
    };
    return [
        data,
        handlers
    ];
};

/**
 * Hook para la dirección
 * 
 * @param {Object} [_data] Dirección inicial
 */
const useDirections = (_data = { origin: null, destination: null }) => {

    const [data, setData] = useState(_data);

    // Manejadores de eventos
    const handlers = {
        /**
         * Actualiza la ubicación la dirección
         * @param {String} key Clave de la ubicación
         * @param {Object} _data Datos de ubicación
         */
        setData: (key, _data) => {
            if (
                !validLocation(_data) ||
                (
                    key !== 'origin' &&
                    key !== 'destination'
                )
            ) {
                return;
            }
            setData({
                ...data,
                [key]: { ..._data }
            });
        },

        /**
         * Establece propepiedades de configuración y manejadores
         * @param {Object} config   Propiedades configuración
         * @param {Object} handlers Manejadores
         */
        setConfig: (config, handlers) => {
            setData({
                ...data,
                config,
                handlers
            });
        }
    };
    return [
        data,
        handlers
    ];
};

/**
 * Hook principal del mapa
 * 
 * @param {Object} [initialize] Datos de inicialización
 */
const useMap = (initialize = {}) => {
    const {
        region: _region,
        markers: _markers,
        directions: _directions
    } = initialize;

    // Hooks
    const [region, regionHandlers] = useRegion(_region);
    const [markers, markerHandlers] = useMarkers(_markers);
    const [directions, directionHandlers] = useDirections(_directions);
    const currentPosition = useCurrentPosition();

    const [relocate, setRelocation] = useState(null);

    return {
        markers: { data: markers, handlers: markerHandlers },
        region: { data: region, handlers: regionHandlers },
        directions: { data: directions, handlers: directionHandlers },
        relocate: { data: relocate, handlers: { setRelocation } },
        currentPosition: { data: currentPosition, handlers: {} }
    };
};

export default useMap;