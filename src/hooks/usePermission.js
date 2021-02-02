/**
 * Hook para obtener un permiso
 * 
 */
// Dependencias
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

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

    const _askPermission = async () => {
        const _permission = await askPermision(name);
        setData(_permission);
        setIsLoading(false);
    };

    // Pide los permisos al montar el componente que lo usa
    useState(() => {
        _askPermission();
    }, [])

    // Efecto para reintentar solicitar los permisos
    useEffect(() => {
        if (!isLoading && !data) {
            setIsLoading(true);
            Alert.alert(
                'Permisos',
                'Para continuar debe aceptar los permisos',
                [
                    {
                        text: 'Aceptar',
                        onPress: () => _askPermission()
                    }
                ]
            );
        }
    }, [data, isLoading]);

    return { data, isLoading };
};

export { PERMISSIONS };
export default usePermission;