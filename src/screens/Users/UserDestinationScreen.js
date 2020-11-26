import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { primaryColor } from "../../constants/Colors";
import { shortMapaUrl } from "./../../constants/Utils";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/UI/Button";
import LocationPicker from '../../components/UI/LocationPicker';
import UserHeader from "../../components/UserHeader";
import { normalizeLength } from "../../styles/layout";

import * as offerActions from "../../redux/actions/offers";
import * as notificationsActions from '../../redux/actions/notifications';
import * as placesActions from '../../redux/actions/places';

const UserDestinationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const places = useSelector(state => state.places);
  const offer = useSelector((state) => state.offer);

  const typeServiceId = useSelector((state) => state.auth.typeServiceSelected);

  const getCountry = (address) => {
    const splitAddress = address.split(',');
    if (splitAddress.length === 4)
      return splitAddress[2];
    return splitAddress[1];
  };

  // mapea los campos del formulario de oferta
  const destinationHandler = async () => {

    if (!places.currentOriginAddress || !places.currentDestinyAddress) {
      Alert.alert(
        'Campos incompletos',
        'Por favor completa los dos campos para poder continuar',
        [{ text: 'Está bien' }]
      );
    } else {
      const saveDestinationAction = offerActions.addDestinationToOffer({
        id: offer.id,
        currentCity: getCountry(places.currentOriginAddress),
        destinationCity: getCountry(places.currentDestinyAddress),
        originAddress: places.currentOriginAddress.split(',')[0],
        destinyAddress: places.currentDestinyAddress.split(',')[0],
      });

      const updateUserNotifications =
        notificationsActions.showUserNotifications(offer.userId);

      setError(null);
      setIsLoading(true);

      try {
        dispatch(saveDestinationAction);
        notificationsActions.saveNotificationDestinationOffer({
          offerId: offer.id,
          userId: offer.userId,
        });
        dispatch(updateUserNotifications);
        props.navigation.navigate("SearchService");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesita los permisos de geolocalización para poder obtener localización en tiempo real.',
        [{ text: 'Está bien' }]
      );
      return verifyPermissions();
    }
    return true;
  };

  const validLocationTurnOn = () => {
    if (!Location.hasServicesEnabledAsync()) {
      Alert.alert('No se puede obtener la localización', 'Por favor enciende la localización.', [{ text: 'Esta bien' }]);
      return validLocationTurnOn();
    }
    return true;
  }

  const getCurrentLocation = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return hasPermissions;

    try {
      const location = await Location.getLastKnownPositionAsync();
      if (location) {
        console.log(location, location.coords.latitude, location.coords.longitude);
        dispatch(placesActions.currentPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }));
      }
    } catch (err) {
      validLocationTurnOn();
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("¡Precaución, un error ha ocurrido!", error, [
        { text: "Está bien" },
      ]);
    }
  }, [error]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return typeServiceId && (
    <View style={styles.supportContainer}>
      <UserHeader
        title="Selecciona ubicación"
        isButtonBack
        reDirect="Dashboard"
        navigation={props.navigation}
      />
      <ImageBackground source={shortMapaUrl} style={styles.image}>
        <View style={styles.categoriesContainer}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView>
              <View style={styles.userInfoContainer}>
                <View style={styles.userInfoContent}>
                  <View>
                    <LocationPicker
                      navigation={props.navigation}
                      id="origin"
                      label="Dirección de recogida (*)"
                      errorText="¡UPS! Por favor ingresa una dirección válida."
                      initialValue={
                        places.currentOriginAddress
                          ? places.currentOriginAddress
                          : ''
                      }
                      isOriginCityService
                    />
                  </View>
                  <View>
                    <LocationPicker
                      navigation={props.navigation}
                      id="destination"
                      label="Dirección de entrega (*)"
                      errorText="¡UPS! Por favor ingresa una dirección válida."
                      initialValue={
                        places.currentDestinyAddress
                          ? places.currentDestinyAddress
                          : ''
                      }
                      isDestinyCityService
                    />
                  </View>
                </View>
                <View style={styles.userButton}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color={primaryColor} />
                  ) : (
                      <Button title="Solicitar oferta" onPress={destinationHandler} />
                    )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  supportContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  brandImageContainer: {
    marginTop: normalizeLength(10),
    alignItems: "flex-end",
    justifyContent: "center",
  },
  categoriesContainer: {
    position: 'absolute',
    bottom: 0,
    minWidth: normalizeLength(370),
    backgroundColor: "rgba(255,255,255,0.7)",
    minHeight: normalizeLength(370),
  },
  userInfoContent: {
    marginTop: normalizeLength(20)
  },
  userButton: {
    paddingVertical: normalizeLength(9),
    paddingHorizontal: normalizeLength(30),
    marginTop: normalizeLength(10),
  },
});

export default UserDestinationScreen;
