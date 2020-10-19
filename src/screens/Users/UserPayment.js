import Env from 'react-native-config';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

// You should create the preference server-side, not client-side but we show client-side for the sake of simplicity
const getPreferenceId = async (payer, ...items) => {
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${Env.MP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();

  return preference.id;
};

const UserPayment =  (props) => {
  const [paymentResult, setPaymentResult] = useState(null);

  const startCheckout = async () => {
    try {
      const preferenceId = await getPreferenceId('payer@email.com', {
        title: 'Payment for service',
        description: 'Dummy Item Description',
        quantity: 1,
        currency_id: 'COP',
        unit_price: 10.0,
      });

      const payment = await MercadoPagoCheckout.createPayment({
        publicKey: Env.MP_PUBLIC_KEY,
        preferenceId,
      });

      setPaymentResult(payment);
    } catch (err) {
      Alert.alert('Something went wrong', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startCheckout}>
        <Text style={styles.text}>Start Payment</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>
    </View>
  );
}

export default UserPayment;