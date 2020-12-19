import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import MapPreview from './MapPreview';
import TextInput from './Input';

import * as placesActions from '../../redux/actions/places';

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const dispatch = useDispatch();
    const mapPickedLocation = props.navigation.navigate('pickedLocation');
    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
        }
    }, [mapPickedLocation]);

    const pickOnMapHandler = async () => {
      let typeFieldSelected;

      if (props.isOriginCityService) {
        typeFieldSelected = 'isOriginCityService';
      } else {
        typeFieldSelected = 'isDestinyCityService';
      }

      dispatch(
        placesActions.changeFieldSelected(
          typeFieldSelected,
      ));
      props.navigation.navigate('Map');
    };
    
    return (
        <View style={styles.locationContainer}>
          <MapPreview
            style={styles.mapPreview}
            location={pickedLocation}
            onPress={pickOnMapHandler}
            disabled={props.disabled}
          >
            <TextInput
              id={props.id}
              label={props.label}
              keyboardType="default"
              required
              autoCapitalize="sentences"
              errorText={props.errorText}
              initialValue={props.initialValue}
              disabled
              isMapField
            />
        </MapPreview>
      </View>
    );
};

const styles = StyleSheet.create({
    locationContainer: {
        marginBottom: 15,
    },
    mapPreviewContainer: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationPicker;