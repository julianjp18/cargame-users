import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import UserHeader from '../../../components/UserHeader';
import { primaryColor } from '../../../constants/Colors';
import { normalizeLength } from '../../../styles/layout';

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  WebViewContainer: {
    backgroundColor: 'transparent',
  },
  titleContent: {
    fontSize: normalizeLength(15),
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: normalizeLength(10)
  }
});

const PaymentScreen = (props) => {
  const [mpData, setMpData] = useState('');
  const state = useSelector((state) => state);
  const user = state.auth;
  const offer = state.offer.offerSelected;

  const getPreferenceData = async (email = user.email) => {
    try {
      const response = await fetch(
        `http://192.168.0.8:3001/get-preference-id`, {
        email,
        items: [
          {
            title: 'Payment for service',
            description: `currentCity: ${offer.currentCity}, destinationCity: ${offer.destinationCity}, offerId: ${offer.offerId}, date: ${offer.pickUpDate}`,
            quantity: 1,
            currency_id: 'COP',
            unit_price: offer.offerValue,
          }
        ],
      });

      const {
        preferenceId,
        identifications_type,
        payment_methods
      } = await response.json();
      setMpData({
        preferenceId, identifications_type, payment_methods,
      });
    } catch (err) {
      Alert.alert('¡UPS! Algo estuvo mal.', err.message);
    }
  };

  useEffect(() => {
    getPreferenceData();
  }, []);

  return (
    <View style={styles.paymentContainer}>
      <UserHeader
        title="Paga el servicio"
        subtitle="con mercadopago"
        leftIcon="paper-plane-o"
        isButtonBack
        navigation={props.navigation}
        reDirect="Notifications"
      />
      <View style={styles.mainContainer}>
        <Text style={styles.titleContent}>Realiza tu pago con mercadopago</Text>
        {mpData.preferenceId ? (
          <WebView
            containerStyle={styles.WebViewContainer}
            style={{ margin: 'auto', textAlign: 'center' }}
            originWhitelist={['*']}
            source={{
              html: `
                <p>Tu pago es seguro con mercadopago</p>
                <script
                  src="https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js"
                  data-preference-id='${mpData.preferenceId}'>
                </script>
              ` }}
          />
        ) : (
            <ActivityIndicator
              size="large"
              color={primaryColor}
              style={styles.activityIndicatorContainer}
            />
          )}
      </View>
    </View>
  );
};

export default PaymentScreen;