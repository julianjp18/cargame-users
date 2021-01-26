/**
 * Hook para obtener la posición actual
 * 
 */

//  Dependencias
import { useEffect, useState } from 'react';

// Hooks
import usePermission, { PERMISSIONS } from './usePermission';

// Utils
import { watchCurrentLocation, getAdressFromLocation } from '../utils/location';

/**
 * Hook para obtener la posición actual
 * 
 * @param {Function} [onDeny] Función de retorno en caso de rechazar
 *                            permisos de ubicación
 */
const useCurrentPosition = (onDeny) => {

    const [position, setPosition] = useState(null);

    // Solicita permisos de ubicación
    const {
        data: permission,
        isLoading
    } = usePermission(PERMISSIONS.LOCATION, onDeny);

    /**
     * Manejador de evento para cambios en la ubicación
     * @param {Object} location Ubicación
     */
    const handleEvent = async (location) => {
        if (!location || !location.coords) { return; }
        const address = await getAdressFromLocation(location.coords);
        setPosition({ location: location.coords, address });
    };

    // Efecto que obtiene la posición actual
    useEffect(() => {
        let subscription;
        const get = async () => {
            subscription = await watchCurrentLocation(handleEvent);
        };
        if (!isLoading && permission) {
            get();
        }
        return () => {
            subscription && subscription.remove && subscription.remove();
        };
    }, [permission, isLoading]);

    return position;
};

export default useCurrentPosition;