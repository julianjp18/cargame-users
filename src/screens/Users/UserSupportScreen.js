import React from 'react';
import { Text, StyleSheet, View, Image, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { shortBrandAzulUrl, shortMainCargaUrl } from '../../constants/Utils';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../../constants/Colors';

import * as authActions from '../../redux/actions/auth';
import { getUserInfo } from '../../utils/helpers';
import { normalizeLength } from '../../styles/layout';

const UserSupportScreen = props => {
  const dispatch = useDispatch();

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  return (
    <View style={styles.supportContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={shortBrandAzulUrl}
        />
      </View>
      <View style={styles.mainCargaContainer}>
        <Image
          style={styles.mainCarga}
          source={shortMainCargaUrl}
        />
      </View>
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          props.colorOne ? props.colorOne : primaryColor,
          props.colorTwo ? props.colorTwo : accentColor
        ]}
      >
        <View style={styles.linearGradientContainer}>
          <View style={styles.row1}>
            <View style={styles.row1Col1}>
              <AntDesign
                style={styles.supportIcon}
                name="customerservice"
                size={60}
                color='#fff'
              />
            </View>
            <View style={styles.row1Col2}>
              <Text style={styles.infoText}>¡ Aquí tendrás solución a tus dudas!</Text>
            </View>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.extraInfoText}>
              Envíanos un mensaje por chat o e-mail y con gusto te ayudaremos:
                        </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.row2}>
        <View style={styles.row2Col1}>
          <Text>
            <FontAwesome
              style={styles.whatsAppIcon}
              name="whatsapp"
              size={24}
              color="#25D366"
            />
            {` + 57 315 6398560`}
          </Text>
        </View>
        <View style={styles.row2Col2}>
          <Text>
            <AntDesign name="mail" size={24} color={primaryColor} />
            {` soporte@cargame.com.co`}

          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  supportContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(200)
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 0
  },
  logo: {
    height: 180,
    width: 180,
    marginTop: '1%'
  },
  mainCargaContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: normalizeLength(200)
  },
  mainCarga: {
    marginRight: normalizeLength(2),
    width: Platform.OS === 'ios' ? normalizeLength(480): normalizeLength(500),
    minWidth: normalizeLength(380),
    height: normalizeLength(395),
    position: 'relative',
    top: Platform.OS === 'ios' ? normalizeLength(50): normalizeLength(60),
    left: Platform.OS === 'ios' ? normalizeLength(70): normalizeLength(80),
  },
  linearGradientContainer: {
    paddingTop: normalizeLength(15),
    paddingBottom: normalizeLength(10)
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    top: 0,
  },
  row1Col1: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportIcon: {
    opacity: 0.32
  },
  row1Col2: {
    width: '70%',
    paddingRight: normalizeLength(8)
  },
  infoText: {
    paddingTop: normalizeLength(5),
    color: textAccentColor,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(18)
  },
  extraInfo: {
    paddingHorizontal: normalizeLength(5),
    paddingTop: normalizeLength(15)
  },
  extraInfoText: {
    color: textAccentColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(15),
    lineHeight: normalizeLength(15),
    paddingHorizontal: normalizeLength(20)
  },
  row2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: normalizeLength(5),
   
  },
});

export default UserSupportScreen;