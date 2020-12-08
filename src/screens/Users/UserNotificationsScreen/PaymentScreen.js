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
    fontSize: normalizeLength(20),
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: normalizeLength(15),
    marginBottom: normalizeLength(20)
  },
});

const changeWebViewStyle = `(function() {
  document.body.style.textAlign = 'center';
  document.body.style.display = 'auto';
  document.getElementsByClassName('text')[0].style.marginTop = '200px';
  document.getElementsByClassName('text')[0].style.fontSize = '30';
  document.getElementsByClassName('mercadopago-button')[0].style.fontSize = '30';
})();`;

const PaymentScreen = (props) => {
  const [mpData, setMpData] = useState('');
  const state = useSelector((state) => state);
  const user = state.auth;
  const offer = state.offer.offerSelected;

  const getPreferenceData = async (email = user.email) => {
    try {

      const response = await fetch(
        `https://cargame-server.herokuapp.com/get-preference-id`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
          body : JSON.stringify({
            email,
            item: {
                title: 'Payment for service',
                description: `currentCity: ${offer.currentCity}, destinationCity: ${offer.destinationCity}, offerId: ${offer.offerId}, date: ${offer.pickUpDate}`,
                quantity: 1,
                currency_id: 'COP',
                unit_price: offer.offerValue,
              },
          }),
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
                <p class="text">Presiona el siguiente botón para comenzar</p>
                <script
                  src="https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js"
                  data-preference-id='${mpData.preferenceId}'>
                </script>
              ` }}
              injectedJavaScript={changeWebViewStyle}
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