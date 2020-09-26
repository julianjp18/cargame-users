import { Dimensions, StyleSheet } from 'react-native';
import { scaleText } from 'react-native-text/lib/commonjs';

const baseUnitWidth = 375;

const { width } = Dimensions.get('window');

export const normalizeLength = (size) => (size / baseUnitWidth) * width;

export const fullHeight = Dimensions.get('window').height;
export const fullWidth = Dimensions.get('window').width;

export const fontSize = (size) => {
  const { fontSize: fs } = scaleText({
    deviceBaseWidth: fullWidth,
    fontSize: size,
  });

  return fs;
};

export const boxShadow = StyleSheet.create({
  borderRadius: 4,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
});

export const container = StyleSheet.create({
  padding: 30,
});

export const mt20 = {
  marginTop: 20,
};

export const mb20 = {
  marginBottom: 20,
};

export const pb20 = {
  paddingBottom: 20,
};

export const ph = (padding) => ({
  paddingHorizontal: padding,
});

export const dynamicPadd = (padding) => ({
  padding: normalizeLength(padding),
});

export const ph20 = {
  paddingHorizontal: 20,
};
export const pv20 = {
  paddingVertical: 20,
};

export const ph4 = {
  paddingHorizontal: 4,
};

export const toBottom = {
  position: 'absolute',
  bottom: 0,
};
