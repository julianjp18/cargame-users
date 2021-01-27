/**
 * Hook para obtener un permiso
 * 
 */
import { useState } from 'react';

// Util
import askPermision, { PERMISSIONS } from '../permissions';

/**
 * Hook para obtener un permiso
 * 
 * @param {String} name       Nombre del permiso debe ser de una constante
 */
const usePermission = (name) => {

    // Estado del permiso
    const [data, setData] = useState(null);
    // Estado de carga
    const [isLoading, setIsLoading] = useState(true);

    useState(() => {

        const _askPermission = async () => {
            const _permission = await askPermision(name);
            setData(_permission);
            setIsLoading(false);
        };
        _askPermission();
    }, [])

    return { data, isLoading };
};

export { PERMISSIONS };
export default usePermission;