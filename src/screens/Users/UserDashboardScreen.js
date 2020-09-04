import React, { useEffect } from "react";
import { StyleSheet, View, Image, YellowBox } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Avatar } from "react-native-elements";
import { darkGrey } from "../../constants/Colors";
import { CATEGORIES_LIST } from "../../constants/Utils";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from "react-native-touchable-scale";
import WelcomeHeader from "../../components/WelcomeHeader";
import { shortBrandSoatUrl } from "./../../constants/Utils";
import { setTypeService } from "../../redux/actions/auth";

import * as authActions from '../../redux/actions/auth';
import * as userActions from "../../redux/actions/users";
import * as driverNotificationsAction from "../../redux/actions/notifications";
import { getUserInfo } from '../utils/helpers';

const selectedCategoryItem = (navigation, dispatch, categoryId, routeName) => {
  dispatch(setTypeService(categoryId));
  navigation.navigate({ routeName });
};

const UserDashboardScreen = (props) => {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);

    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });
  
  useEffect(() =>{
    dispatch(userActions.showUser(userAuth.userId));
  },[userAuth]);

  return (
    <View style={styles.servicesContainer}>
      <WelcomeHeader />
      <View style={styles.brandImageContainer}>
        <Image style={styles.brandImage} source={shortBrandSoatUrl} />
      </View>
      <View style={styles.categoriesContainer}>
        <ScrollView>
          {CATEGORIES_LIST.map((category, i) => (
            <TouchableOpacity
              key={i}
              style={styles.selectedItem}
              onPress={() =>
                selectedCategoryItem(
                  props.navigation,
                  dispatch,
                  category.id,
                  category.routeName
                )
              }
            >
              <ListItem
                key={i}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                linearGradientProps={{
                  colors: ["#18A7C8", "#1D509E"],
                  start: { x: 1, y: 0 },
                  end: { x: 0.2, y: 0 },
                }}
                rightAvatar={{
                  source: category.avatar_url,
                  containerStyle: styles.avatarContainer,
                  avatarStyle: styles.avatar,
                  rounded: true,
                }}
                bottomDivider
              >
                <ListItem.Content style={styles.listContainer}>
                  <ListItem.Title style={styles.titleListItem}>
                    {category.name}
                  </ListItem.Title>
                  <ListItem.Subtitle >
                    {category.subtitle}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="white" />
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: "transparent",
    height: "100%",
  },
  brandImageContainer: {
    marginTop: "5%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  brandImage: {
    
  },
  categoriesContainer: {
    paddingTop: "6%",
  },
  titleListItem: {
    paddingTop: "2%",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Ruda",
    fontSize: 21,
    fontWeight: "700",
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: "Ruda",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 24,
  },
  listContainer: {
    flexDirection: "column",
    marginTop: "1%",
    paddingTop: "7%",
    backgroundColor: "transparent",
    paddingBottom: "-5%",
    height: "9%",
  },
  avatarContainer: {
    height: "100%",
    width: "16%",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});

export default UserDashboardScreen;
