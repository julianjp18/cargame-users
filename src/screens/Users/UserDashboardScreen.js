import React, { useEffect } from "react";
import { StyleSheet, View, Image, YellowBox } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "react-native-elements";
import { textSecondaryColor, darkGrey } from "../../constants/Colors";
import { CATEGORIES_LIST } from "../../constants/Utils";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from "react-native-touchable-scale";
import WelcomeHeader from "../../components/WelcomeHeader";
import { shortBrandSoatUrl } from "./../../constants/Utils";
import { setTypeService } from "../../redux/actions/auth";

import * as userActions from "../../redux/actions/users";
import * as driverNotificationsAction from "../../redux/actions/notifications";

const selectedCategoryItem = (navigation, dispatch, categoryId, routeName) => {
  dispatch(setTypeService(categoryId));
  navigation.navigate({ routeName });
};

const UserDashboardScreen = (props) => {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    dispatch(userActions.showUser(userId));
  }, []);
  const user = useSelector((state) => state.user);
  console.log(user);
  !user && dispatch(driverNotificationsAction.showDriverNotifications(userId));

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
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                containerStyle={styles.listContainer}
                title={category.name}
                titleStyle={styles.titleListItem}
                subtitle={category.subtitle}
                rightAvatar={{
                  source: category.avatar_url,
                  containerStyle: styles.avatarContainer,
                  avatarStyle: styles.avatar,
                  rounded: true,
                }}
                bottomDivider
                chevron
              />
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
  brandImage: {},
  categoriesContainer: {},
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
    flexDirection: "row",
    marginTop: "3%",
    paddingTop: "3%",
    backgroundColor: "transparent",
    paddingBottom: "-2%",
  },
  avatarContainer: {
    height: "100%",
    width: "30%",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});

export default UserDashboardScreen;
