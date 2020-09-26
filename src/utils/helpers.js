import { AsyncStorage } from "react-native";

export const getUserInfo = async () => await AsyncStorage.getItem('driverData');
