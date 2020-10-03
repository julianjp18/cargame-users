import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { primaryColor, accentColor } from '../../../constants/Colors';
//import Timeline from 'react-native-timeline-flatlist';
import { LinearGradient } from 'expo-linear-gradient';

import { getUserInfo } from '../../../utils/helpers';
import Button from '../../../components/UI/Button';

import * as authActions from '../../../redux/actions/auth';
import * as travelsActions from '../../../redux/actions/travels';
import * as offersActions from '../../../redux/actions/offers';
import UserHeader from '../../../components/UserHeader';

const styles = StyleSheet.create({
  travelSelectedContainer: {
    backgroundColor: 'transparent',
    height: '100%'
  },
  titleContainer: {
    marginTop: '2%',
    marginLeft: '5%',
    marginBottom: '1%'
  },
  title: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Quicksand',
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
    marginBottom: '4%',
  },
  col1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  col2: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoUserText: {
    marginLeft: '5%',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Ruda',
    fontWeight: '900'
  },
  pickUpDateText: {
    color: '#424B5A',
    fontFamily: 'Quicksand',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
  },
  timeLineContainer: {
    marginTop: '1%',
    marginLeft: '10%'
  },
  timeStyleText: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    color: primaryColor,
    textAlign: 'center',
    paddingTop: '15%',
  },
  titleStyleText: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    color: primaryColor,
    textAlign: 'justify'
  },
  finalizeBtnContainer: {
    marginHorizontal: '12%',
    marginVertical: '5%'
  },
  supportBtnContainer: {
    marginHorizontal: '12%',
  },
});

const ServiceSelectedScreen = props => {
  const driverUser = useSelector(state => state.driver);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const { userId, pickupDate, offerId, status, driverId } = useSelector(state => state.travels.tripSelected);
  
  useEffect(() => {
    travelsActions.getUserById(userId).then((data) => setUser(data));
  }, []);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);

    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const endTravel = () => {
    offersActions.finalizeOfferState(offerId).then(() => {
      dispatch(travelsActions.getTripsInProgressByDriverId(driverId));
      dispatch(travelsActions.getTripsMadeByDriverId(driverId));
      props.navigation.navigate('Travels');
    });
  };

  return (
    <View style={styles.travelSelectedContainer}>
      <UserHeader
        title="Mis viajes"
        subtitle="Explora tus viajes"
        leftIcon="flag"
        isButtonBack
        reDirect="Travels"
        navigation={props.navigation}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Datos del cliente</Text>
      </View>
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
            props.colorOne ? props.colorOne : primaryColor,
            props.colorTwo ? props.colorTwo : accentColor
        ]}
      >
          <View style={styles.row}>
              <View style={styles.col1}>
                  <View style={styles.row}>
                    <View>
                      <AntDesign name="user" size={24} color="white" />
                    </View>
                    <View>
                      <Text style={styles.infoUserText}>{driverUser && driverUser.name}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View>
                      <AntDesign name="phone" size={24} color="white" />
                    </View>
                    <View>
                      <Text style={styles.infoUserText}>{driverUser && driverUser.phone}</Text>
                    </View>
                  </View>
              </View>
              <View style={styles.col2}>
                <FontAwesome name="user-circle-o" size={34} color="white" />
              </View>
          </View>
      </LinearGradient>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Datos de quien recibe</Text>
      </View>
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
            props.colorOne ? props.colorOne : primaryColor,
            props.colorTwo ? props.colorTwo : accentColor
        ]}
      >
        <View style={styles.row}>
          <View style={styles.col1}>
              <View style={styles.row}>
                <View>
                  <AntDesign name="user" size={24} color="white" />
                </View>
                <View>
                  <Text style={styles.infoUserText}>{user && user.name}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <AntDesign name="phone" size={24} color="white" />
                </View>
                <View>
                  <Text style={styles.infoUserText}>{user && user.phone}</Text>
                </View>
              </View>
          </View>
          <View style={styles.col2}>
            <FontAwesome name="user-circle-o" size={34} color="white" />
          </View>
      </View>
      </LinearGradient>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fecha de entrega</Text>
        <Text style={styles.pickUpDateText}>{pickupDate}</Text>
      </View>
      {/*}
      <Timeline
        data={data}
        circleSize={20}
        circleColor={primaryColor}
        lineColor={accentColor}
        innerCircle={'dot'}
        style={styles.timeLineContainer}
        timeStyle={styles.timeStyleText}
        titleStyle={styles.titleStyleText}
        timeContainerStyle={{ paddingTop: '15%'}}
      />*/}
      {status !== 'DONE' && (
        <View  style={styles.finalizeBtnContainer}>
          <Button
            title={'He entregado la carga'}
            onPress={endTravel}
          />
        </View>
      )}
      <View style={styles.supportBtnContainer}>
        <Button
          title={`Contactar a soporte`}
          colorOne={'white'}
          colorTwo={'white'}
          fontColor={primaryColor}
          onPress={() => props.navigation.navigate('Services')}
        />
      </View>
    </View>
  );
};

export default ServiceSelectedScreen;