import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  accentColor,
  textAccentColor,
} from "../../constants/Colors";

const UserWaitingScreen = (props) => {
  return (
    <View>
      <Text>Esperar.....</Text>
    </View>
  );
};

export default UserWaitingScreen;
