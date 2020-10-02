import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { normalizeLength } from '../styles/layout';

const UserHeader = props => (
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
        <FontAwesome style={styles.col1Icon} name={props.leftIcon} size={60} color='#fff' />
      </View>
      <View style={styles.col2}>
        <Text style={styles.titleHeader}>
          {props.title}
        </Text>
        <Text style={styles.subtitleHeader}>
          {props.subtitle}
        </Text>
      </View>
      {props.isButtonBack && (
        <View style={styles.col3}>
          <FontAwesome
            style={styles.col3Icon}
            name="arrow-left"
            size={30}
            color="#fff"
            onPress={() => props.navigation.navigate(props.reDirect)}
          />
        </View>
      )}
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: normalizeLength(110),
    minWidth: normalizeLength(300),
  },
  col1: {
    minWidth: normalizeLength(80),
    minHeight: normalizeLength(110),
    alignItems: 'flex-end',
    paddingTop: normalizeLength(40),
    paddingRight: normalizeLength(8)
  },
  col1Icon: {
    opacity: 0.32,
  },
  titleHeader: {
    marginTop: normalizeLength(40),
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    color: textAccentColor
  },
  subtitleHeader: {
    fontFamily: 'Ruda',
    fontSize: normalizeLength(13),
    fontWeight: '500',
    color: textAccentColor
  },
  col2: {
    minWidth: normalizeLength(200),
    minHeight: normalizeLength(400),
  },
  col3: {
    minWidth: normalizeLength(20),
    minHeight: normalizeLength(400),
    alignItems: 'flex-end',
    paddingTop: normalizeLength(15),
  },
  col3Icon: {
    marginRight: normalizeLength(20)
  }
});

export default UserHeader;