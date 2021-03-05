/**
 * Permisos de la aplicación
 */

// Dependencias
import * as Permissions from 'expo-permissions'

/**
 * Estandar para solicitar un permiso
 * @param {String} permission Permiso que se va a solicitar;
 */
const _getStandardPermission = async (permission) => {
    let status;
    try {
        // Obtiene el estado del permiso
        status = (await Permissions.getAsync(permission)).status;

        // Si fue concedido responde true
        if (status === 'granted') { return true; }

        // De lo contrario se pregunta por el permiso
        status = (await Permissions.askAsync(permission)).status;

        return status === 'granted';
    }
    catch (err) {
        // No se hace nada con este error
    }
    return !!status;
}

/**
 * Solicitud genérica de un permiso
 * @param {String} permission Nombre del permiso
 */
const askPermision = async (permission) => {
    return await _getStandardPermission(permission);
};

const PERMISSIONS = Permissions;

export { PERMISSIONS }
export default askPermision;
