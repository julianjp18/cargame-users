import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { primaryColor } from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

import * as placesActions from '../redux/actions/places';

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  headerButtonContainer: {
    position: 'absolute',
    bottom: '0%',
    height: '10%',
    width: '100%',
    backgroundColor: '#f3f3f3',
    zIndex: 100,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '2%',
  },
  col: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideCol: {
    width: '0%',
  },
  oneCol: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    paddingVertical: '10%',
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 20,
    color: primaryColor,
  }
});

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const GoogleMapScreen = props => {
  const userAuth = useSelector(state => state.auth);
  if (!userAuth) {
    props.navigation.navigate('Auth');
  }
  const typeFieldSelected = useSelector(state => state.places.typeFieldSelected);
  const currentPosition = useSelector(state => state.places.currentPosition);

  let latitude = 4.60971;
  let longitude = -74.08175;

  if (currentPosition) {
    latitude = currentPosition.latitude;
    longitude = currentPosition.longitude;
  }

  const [selectedLocation, setSelectedLocation] = useState(
    {
      latitude,
      longitude,
      address: 'Bogotá, Colombia',
      status: 'OK',
    }
  );
  const [region, setRegion] =
    useState({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  const dispatch = useDispatch();
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return;

    props.navigation.goBack({
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
    })
  }, [savePickedLocationHandler]);

  const selectLocationHandler = async (event) => {

    const location = {
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    };
    const savedLocation = await dispatch(
      placesActions.getPosition(location));

    setSelectedLocation({
      latitude: location.lat,
      longitude: location.lng,
      address: savedLocation.address,
      status: savedLocation.status,
    });
    setRegion({
      ...region,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const saveFunction = props.navigation.getParam('saveLocation');

  const acceptLocationHandler = () => {
    if (selectedLocation) {
      dispatch(
        placesActions.savePosition(selectedLocation, typeFieldSelected)
      );
      props.navigation.navigate('DestinationList');
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.headerButtonContainer} onPress={saveFunction}>
        <View style={styles.row}>
          <View style={styles.col}>
            <AntDesign
              name="back"
              size={24}
              color={primaryColor}
              onPress={() => props.navigation.navigate('Dashboard')}
            />
          </View>
          <View style={selectedLocation.status === 'OK' ? styles.col : styles.oneCol}>
            {!selectedLocation ? (
              <ActivityIndicator size="large" color={primaryColor} />
            ) : (
                <Text>
                  {selectedLocation.status ? selectedLocation.address : 'No localización por el momento'}
                </Text>
              )}
          </View>
          <View style={selectedLocation.status === 'OK' ? styles.col : styles.hideCol}>
            {selectedLocation.status === 'OK' &&
              <Text style={styles.saveButtonText} onPress={acceptLocationHandler}>Aceptar</Text>}
          </View>
        </View>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={region}
        onPress={selectLocationHandler}
      >
        {selectedLocation &&
          <Marker
            title={selectedLocation.address}
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude
            }}
          ></Marker>
        }
      </MapView>
    </View>
  );
};

export default GoogleMapScreen;