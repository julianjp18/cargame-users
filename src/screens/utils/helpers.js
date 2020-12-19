// Helpers : Almacena el usuario activo. 
// Descripcion: Ruta inicial de cargame usuarios
// Fecha      : Octubre 2020.

import { AsyncStorage } from "react-native";

export const getUserInfo = async () => await AsyncStorage.getItem('userData');