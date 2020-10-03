// UserDashboard : Menu principal del sistema. 
// Descripcion   : Ruta inicial de cargame usuarios
// Fecha         : Octubre 2020.

import React, { useEffect } from "react";
import { StyleSheet, View, Image, YellowBox, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

import { accentColor, primaryColor } from "../../constants/Colors";
import { CATEGORIES_LIST } from "../../constants/Utils";
import { shortBrandSoatUrl } from "./../../constants/Utils";
import { setTypeService } from "../../redux/actions/auth";
import { normalizeLength } from "../../styles/layout";

import * as userActions from "../../redux/actions/users";
import * as userNotificationsAction from "../../redux/actions/notifications";
import * as travelsActions from '../../redux/actions/travels';

import WelcomeHeader from "../../components/WelcomeHeader";

// Contenedor principal

const selectedCategoryItem = (navigation, dispatch, categoryId, routeName) => {
  dispatch(setTypeService(categoryId));
  navigation.navigate({ routeName });
};

const categoriesList = (navigation, dispatch, category, i) => (
  <TouchableOpacity
    key={i}
    style={styles.selectedItem}
    onPress={() =>
      selectedCategoryItem(
        navigation,
        dispatch,
        category.id,
        category.routeName
      )
    }
  >
    <LinearGradient
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[accentColor, primaryColor]}
      style={styles.linearGradientContainer}
    >
      <ListItem
        key={i}
        containerStyle={styles.listContainer}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title style={styles.titleListItem}>
            {category.name}
          </ListItem.Title>
        </ListItem.Content>
        <Avatar containerStyle={styles.avatarContainer} source={category.avatar_url} />
      </ListItem>
    </LinearGradient>
  </TouchableOpacity>
);

const UserDashboardScreen = (props) => {
  YellowBox.ignoreWarnings([
    'Setting a timer',
    "Can't perform a React state update on an unmounted component",
    "Cannot update during an existing state transition (such as within `render`).",
  ]);
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.auth);
  
  useEffect(() =>{
    dispatch(userActions.showUser(userId));
    dispatch(userNotificationsAction.showUserNotifications(userId));
    dispatch(travelsActions.getTripsInProgressByUserId(userId));
    dispatch(travelsActions.getTripsMadeByUserId(userId));
  },[userId]);

  return (
    <View style={styles.servicesContainer}>
      <WelcomeHeader />
      <View style={styles.brandImageContainer}>
        <Image style={styles.brandImage} source={shortBrandSoatUrl} />
      </View>
      <View style={styles.categoriesContainer}>
        <ScrollView>
          {CATEGORIES_LIST.map((category, i) => (
            categoriesList(props.navigation, dispatch, category, i)
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Estilo de UserDashBoard
const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  brandImageContainer: {
    marginTop: normalizeLength(20),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingTop: normalizeLength(4),
  },
  linearGradientContainer: {
    marginBottom: normalizeLength(2)
  },
  listContainer: {
    backgroundColor: 'transparent',
    minHeight: normalizeLength(16)
  },
  titleListItem: {
    paddingTop: normalizeLength(5),
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Ruda',
    fontSize: normalizeLength(20),
    fontWeight: '600',
  },
  avatarContainer: {
    height: normalizeLength(80),
    width: normalizeLength(80),
  },
});

export default UserDashboardScreen;
