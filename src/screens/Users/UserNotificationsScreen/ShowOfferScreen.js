import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';
import { getUserInfo, currencyFormat } from '../../utils/helpers';

import * as authActions from '../../../redux/actions/auth';
import * as userNotificationsActions from "../../../redux/actions/notifications";

import Button from "../../../components/UI/Button";
import { primaryColor } from "../../../constants/Colors";
import { collectionTimeSlot } from "../../../constants/Utils";
import UserHeader from "../../../components/UserHeader";
import { normalizeLength } from "../../../styles/layout";

const getcollectionTimeSlot = (collectionTimeSlotItem) =>
  collectionTimeSlot.map((collectionTime) =>
    collectionTime.label === collectionTimeSlotItem ? collectionTime.value : '');

const ShowOfferScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [notifications, setNotifications] = useState(useSelector(state => state.notifications.userNotifications));
  const offer = useSelector((state) => state.offer.offerSelected);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const payOfferHandler = () => {

  };
  
  return (
    <View style={styles.servicesContainer}>
      <UserHeader
        title="Hemos encontrado"
        subtitle="el mejor servicio para ti!"
        leftIcon="paper-plane-o"
        isButtonBack
        reDirect="Notifications"
      />
      {user && (
          <View style={styles.maincontainer}>
            <View style={styles.serviceTitleContainer}>
                <View style={styles.row}>
                  <View style={styles.col1ServiceTitle}>
                    <Text style={styles.serviceTitle}>Tu servicio:</Text>
                  </View>
                  <View style={styles.col2ServiceTitle}>
                    <Text style={styles.servicePrice}>{0}</Text>
                  </View>
                </View>
            </View>
            <View style={styles.showInfoContainer}>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Ciudad de recogida:</Text>
                <Text style={styles.subtitle}>{offer.currentCity}</Text>
              </View>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Ciudad de destino:</Text>
                <Text style={styles.subtitle}>{offer.destinationCity}</Text>
              </View>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Fecha de recogida:</Text>
                <Text style={styles.subtitle}>{moment(offer.pickUpDate, 'DD/MM/YYYY').format("ll")}</Text>
              </View>
              <View style={styles.showInfoContent}>
                <Text style={styles.title}>Franja horaria de recogida:</Text>
                <Text style={styles.subtitle}>
                  {getcollectionTimeSlot(offer.timeZone)}
                </Text>
              </View>
            </View> 
            <View style={styles.valueDeclaredContainer}>

            </View>
            <View style={styles.discountCodeContainer}>

            </View>
            <View style={styles.subtotalsContainer}>

            </View>
            <View style={styles.totalContainer}>
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Text style={styles.totalTitle}>VALOR A PAGAR:</Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.totalPrice}>{0}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Button
                    title='Declinar'
                    colorOne={'white'}
                    colorTwo={'white'}
                    fontColor={primaryColor}
                    onPress={() => declineOffer()}
                  />
                </View>
                <View style={styles.col2}>
                  <Button
                    title='Hacer el pago'
                    onPress={payOfferHandler}
                  />
                </View>
              </View>
            </View>
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  serviceTitleContainer: {
    backgroundColor: '#E8E8E8',
  },
  row: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
    marginTop: normalizeLength(5),
  },
  col1ServiceTitle: {

  },
  col2ServiceTitle: {
    
  },
  serviceTitle: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    paddingHorizontal: normalizeLength(30),
    paddingVertical: normalizeLength(20)
  },
  servicePrice: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    paddingLeft: normalizeLength(50),
    paddingVertical: normalizeLength(20)
  },
  showInfoContainer: {
    minHeight: normalizeLength(250),
    marginHorizontal: '10%',
    backgroundColor: 'transparent',
    padding: '5%',
  },
  showInfoContent: {
    marginTop: '3%',
  },
  title: {
    color: primaryColor,
    fontFamily: "Quicksand",
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
  },
  subtitle: {
    color: '#000000',
  },
  totalContainer: {
    backgroundColor: '#FED043',
  },
  totalTitle: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    paddingVertical: normalizeLength(10)
  },
  col1: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalPrice: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
  }
});
export default ShowOfferScreen;
