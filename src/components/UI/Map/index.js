/**
 * Componente Mapa
 */

// Dependencias
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Componentes
import Fallback from './Fallback';

// Hooks
import useMap from './useMap';
import usePermission, { PERMISSIONS } from '../../../hooks/usePermission';

// Configuración
import ENV from '../../../../env';

// Estilos
import { fullWidth, fullHeight } from '../../../styles/layout';

// Deltas por defecto
const latitudeDelta = 0.00522,
    longitudeDelta = (fullWidth / fullHeight * 0.00522);

/**
 * Componente de Direcciones
 * 
 * @param {Object} origin      Ubicación de origen
 * @param {Object} destination Ubicación de destino
 * @param {Object} config      Configuración adicional
 * @param {Object} handlers    Manejadores de eventos
 */
const Directions = React.memo(({
    origin,
    destination,
    config,
    handlers
}) => {

    if (
        !origin ||
        !origin.latitude ||
        !origin.longitude ||
        !destination ||
        !destination.latitude ||
        !destination.longitude
    ) {
        return null;
    }

    const {
        strokeWidth = 3,
        strokeColor = 'blue'
    } = config || {};

    const {
        onStart,
        onReady
    } = handlers || {};

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            onStart={onStart}
            onReady={onReady}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            apikey={ENV.googleApiKey}
        />
    );
});

/**
 * PropTypes
 */
Directions.propTypes = {
    data: PropTypes.array
};

/**
 * Componente de marcadores
 * 
 * @param {Array} data Lista de marcadores
 */
const Markers = React.memo(({ data }) => {

    if (!data || data.length === 0) {
        return null;
    }
    return (
        data.map((marker, index) =>
            marker.location &&
                marker.location.latitude &&
                marker.location.longitude
                ? <Marker
                    key={index}
                    coordinate={marker.location}
                    pinColor={marker.color}
                    title={marker.title}
                    description={marker.description}
                />
                : null
        )
    );
});

/**
 * PropTypes
 */
Markers.propTypes = {
    data: PropTypes.array
};

/**
 * Componente Mapa
 * 
 * @param {Object} data          Datos del hook useMap
 * @param {Object} configuration Configuración adicional
 */
const Map = ({ data, configuration, children }) => {
    if (!data || !data.region || !data.directions || !data.relocate) {
        return null;
    }

    const {
        region: { data: region, handlers: regionHandlers },
        markers: { data: markers, handlers: markersHandlers },
        directions: { data: directions, handlers: directionsHandlers },
        relocate: { data: relocate, handlers: relocateHandlers },
        currentPosition: { data: currentPosition }
    } = data;

    const {
        zoom,
        showCenterMarker = true,
        showCurrentLocationMarker = true
    } = configuration;

    // Hook para comprobar permisos de ubicación
    const {
        data: permission,
        isLoading: isLoadingPermission
    } = usePermission(PERMISSIONS.LOCATION);

    // Effecto para reubicar mapa
    useEffect(() => {
        if (relocate && mapRef.current) {
            centerMap([{
                latitudeDelta,
                longitudeDelta,
                ...relocate
            }]);
            relocateHandlers.setRelocation(null);
        }
    }, [relocate]);

    // Efecto para reubicar mapa al actualizar la dirección
    useEffect(() => {
        if (mapRef.current && directions.origin && directions.destination) {
            centerMap([directions.origin, directions.destination])
        }
    }, [directions]);

    /**
     * Centra el mapa en la ubicación actual
     */
    const centerCurrentLocation = async () => {
        try {
            centerMap([{
                latitudeDelta,
                longitudeDelta,
                ...currentPosition.location
            }]);
        }
        catch (error) {
            // No se hace nada con este error
        }
    }

    /**
     * Centra el mapa en una lista de coordenadas
     * @param {Array} locations Ubicaciones a centrar
     */
    const centerMap = (locations) => {
        mapRef.current.fitToCoordinates(
            locations,
            {
                edgePadding: {
                    top: 150,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
                animated: true
            }
        )
    };

    // Referencia del mapa
    const mapRef = useRef(null);

    const initialRegion = region
        ? { latitudeDelta, longitudeDelta, ...region }
        : currentPosition
            ? { ...currentPosition.location, latitudeDelta, longitudeDelta }
            : null;

    return (
        <View style={styles.container}>
            { !permission || !initialRegion
                ? <Fallback showMessage={!isLoadingPermission && !permission} />
                : <>
                    <MapView
                        ref={mapRef}
                        initialRegion={initialRegion}
                        style={styles.map}
                        zoomEnabled={zoom}
                        zoomControlEnabled={zoom}
                        onRegionChangeComplete={regionHandlers.change}
                    >
                        <Markers data={Object.values(markers)} />
                        <Directions
                            origin={directions.origin}
                            destination={directions.destination}
                            config={directions.config}
                            handlers={directions.handlers}
                        />
                        {children}
                    </MapView>

                    {showCenterMarker &&
                        <View style={styles.markerFixed}>
                            <Entypo name="location-pin" size={40} color="black" />
                        </View>
                    }
                    {showCurrentLocationMarker &&
                        <TouchableOpacity style={styles.currentLocation} onPress={centerCurrentLocation}>
                            <MaterialIcons name="my-location" size={40} color="green" />
                        </TouchableOpacity>
                    }
                </>
            }
        </View>
    );
};

// PropTypes
Map.propTypes = {
    data: PropTypes.object.isRequired,
    configuration: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    markerFixed: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        bottom: ((fullHeight / 2) - 20)
    },
    currentLocation: {
        position: "absolute",
        left: (fullWidth - 50),
        bottom: 100
    }
});

export default Map;
export { useMap };