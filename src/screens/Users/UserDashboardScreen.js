import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "react-native-elements";
import { textSecondaryColor, darkGrey } from "../../constants/Colors";
import { CATEGORIES_LIST } from "../../constants/Utils";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from "react-native-touchable-scale";
import WelcomeHeader from "../../components/WelcomeHeader";
import { setTypeService } from "../../redux/actions/auth";

import * as userActions from "../../redux/actions/users";

const selectedCategoryItem = (
  navigation,
  dispatch,
  categoryId,
  name,
  routeName
) => {
  dispatch(setTypeService(categoryId, name));
  navigation.navigate({ routeName });
};

const UserDashboardScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  if (!user) {
    const userId = useSelector((state) => state.auth.userId);
    dispatch(userActions.showUser(userId));
  }
  return (
    <View style={styles.servicesContainer}>
      <WelcomeHeader />
      <View style={styles.servicesContainer}>
        <ScrollView>
          {CATEGORIES_LIST.map((category, i) => (
            <TouchableScale
              key={i}
              style={styles.selectedItem}
              onPress={() =>
                selectedCategoryItem(
                  props.navigation,
                  dispatch,
                  category.id,
                  category.name,
                  category.routeName
                )
              }
            >
              <ListItem
                key={i}
                containerStyle={styles.listContainer}
                title={category.name}
                titleStyle={styles.titleListItem}
                leftAvatar={{
                  containerStyle: styles.avatarContainer,
                  avatarStyle: styles.avatar,
                  source: category.avatar_url,
                  rounded: false,
                }}
                subtitle={category.subtitle}
                subtitleStyle={styles.subtitleListItem}
                bottomDivider
              />
            </TouchableScale>
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
  title: {
    paddingTop: "8%",
    color: textSecondaryColor,
    fontFamily: "Quicksand",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },
  titleListItem: {
    color: darkGrey,
    fontFamily: "Ruda",
    fontSize: 20,
    fontWeight: "500",
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: "Ruda",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
  },
  listContainer: {
    backgroundColor: "transparent",
    paddingBottom: "12%",
  },
  avatarContainer: {
    height: "100%",
    width: "22%",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});

export default UserDashboardScreen;
