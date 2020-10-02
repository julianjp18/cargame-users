import React, { useEffect } from "react";
import { StyleSheet, View, Image, YellowBox, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Avatar } from "react-native-elements";
import { accentColor, primaryColor } from "../../constants/Colors";
import { CATEGORIES_LIST } from "../../constants/Utils";
import WelcomeHeader from "../../components/WelcomeHeader";
import { shortBrandSoatUrl } from "./../../constants/Utils";
import { setTypeService } from "../../redux/actions/auth";

import * as userActions from "../../redux/actions/users";
import { normalizeLength } from "../../styles/layout";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.auth);
  
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
            categoriesList(props.navigation, dispatch, category, i)
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  brandImageContainer: {
    marginTop: normalizeLength(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingTop: normalizeLength(6),
  },
  linearGradientContainer: {
    marginBottom: normalizeLength(2)
  },
  listContainer: {
    backgroundColor: 'transparent',
    minHeight: normalizeLength(18)
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
