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

// Hooks
import useCurrentPosition from '../../hooks/useCurrentPosition';

const UserDestinationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const places = useSelector(state => state.places);
  const offer = useSelector((state) => state.offer);

  const typeServiceId = useSelector((state) => state.auth.typeServiceSelected);

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
        currentCity: places.currentOriginCity,
        destinationCity: places.currentDestinyCity,
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
          currentCity: places.currentOriginCity,
          destinationCity: places.currentDestinyCity,
          originAddress: places.currentOriginAddress.split(',')[0],
          destinyAddress: places.currentDestinyAddress.split(',')[0],
        });
        dispatch(updateUserNotifications);
        props.navigation.navigate("SearchService");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  /**
   * Función de retorno al rechazar permisos de ubicación
   */
  const onDenyPermission = () => {
    Alert.alert('No se puede obtener la localización', 'Por favor enciende la localización.', [{ text: 'Esta bien' }]);
  };

  // Hook que obtiene la ubicación actual y valida sus permisos
  const currentPosition = useCurrentPosition(onDenyPermission);

  // Efecto para actualizar la ubicación actual
  useEffect(() => {
    if (currentPosition && currentPosition.location) {
      dispatch(placesActions.currentPosition({
        lat: currentPosition.location.latitude,
        lng: currentPosition.location.longitude,
      }));
    }
  }, [currentPosition]);


  useEffect(() => {
    if (error) {
      Alert.alert("UPS, un error ha ocurrido!", error, [
        { text: "Está bien" },
      ]);
    }
  }, [error]);

  const setOriginLocation = ({ location, address, city }) => {
    dispatch(placesActions.setOriginLocation({ location, address, city }));
  };

  const setDestinationLocation = ({ location, address, city }) => {
    dispatch(placesActions.setDestinationLocation({ location, address, city }));
  };

  // Marcadores iniciales
  const markers = {
    origin: {
      title: 'Dirección de recogida',
      location: places.currentOriginCoords,
      color: 'green'
    },
    destination: {
      title: 'Dirección de entrega',
      location: places.currentDestinyCoords,
      color: 'blue'
    }
  };

  // Dirección inicial
  const directions = {
    origin: places.currentOriginCoords,
    destination: places.currentDestinyCoords
  };

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
                      label="Dirección de recogida (*)"
                      errorText="¡UPS! Por favor ingresa una dirección válida."
                      value={places.currentOriginAddress}
                      data={{
                        key: 'origin',
                        markers,
                        directions,
                        location: places.currentOriginCoords,
                        address: places.currentOriginAddress,
                        configuration: {
                          locationIcon: {
                            color: 'green'
                          }
                        }
                      }}
                      handleEvent={setOriginLocation}
                    />
                  </View>
                  <View>
                    <LocationPicker
                      navigation={props.navigation}
                      label="Dirección de entrega (*)"
                      errorText="¡UPS! Por favor ingresa una dirección válida."
                      value={places.currentDestinyAddress}
                      data={{
                        key: 'destination',
                        markers,
                        directions,
                        location: places.currentDestinyCoords,
                        address: places.currentDestinyAddress,
                        configuration: {
                          locationIcon: {
                            color: 'blue'
                          }
                        }
                      }}
                      disabled={true}
                      handleEvent={setDestinationLocation}
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
