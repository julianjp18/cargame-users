import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, Icon } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { textSecondaryColor, darkGrey, primaryColor, } from "../../constants/Colors";

import * as authActions from '../../redux/actions/auth';
import { getUserInfo } from '../utils/helpers';
import UserHeader from "../../components/UserHeader";

const UserNotificationsScreen = (props) => {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user);
  const notifications = useSelector(state => state.notifications.userNotifications);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });
  
  return (
    <View style={styles.servicesContainer}>
      <UserHeader
        title="Notificaciones"
        subtitle="Explora tus notificaciones"
        leftIcon="bell-o"
      />
      {user && (
        <ScrollView>
          <View style={styles.infoContainer}>
            {notifications.length > 0 && notifications.map((notification) => (
              <ListItem key={notification.message} containerStyle={styles.listContainer} bottomDivider>
                <Icon
                  name='bell'
                  type='font-awesome'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>{notification.message}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
            <TouchableOpacity>
              <ListItem onPress={() => props.navigation.navigate('Services')} containerStyle={styles.listContainer} bottomDivider>
                <Icon
                  reverse
                  name='bell'
                  type='font-awesome'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>¡Bienvenido a Cargame! Consulta con Soporte si tienes alguna duda.</ListItem.Title>
                </ListItem.Content>
                <Icon
                  name='angle-right'
                  type='font-awesome'
                  color={primaryColor}
                />
              </ListItem>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: 'transparent',
    height: '100%'
  },
  nameListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%'
  },
  nameListText: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24
  },
  title: {
    paddingTop: '2%',
    color: textSecondaryColor,
    fontFamily: 'Quicksand',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  },
  titleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: 14,
    lineHeight: 24
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: '4%'
  },
  mainCargaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCarga: {
    width: '30%',
    height: 100,
  },
});
export default UserNotificationsScreen;
