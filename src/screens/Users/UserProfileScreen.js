import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, ListItem } from 'react-native-elements';
import { darkGrey, primaryColor } from '../../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import UserHeader from '../../components/UserHeader';
import { shortBrandAzulUrl } from '../../constants/Utils';
import ImgPicker from '../../components/UI/ImagePicker';
import * as MediaLibrary from 'expo-media-library';

import * as userActions from '../../redux/actions/users';
import * as authActions from '../../redux/actions/auth';
import { getUserInfo } from '../../utils/helpers';
import { normalizeLength } from '../../styles/layout';

const LogOutListItem = props => (
  <TouchableOpacity>
    <ListItem
      onPress={() => {
        props.dispatch(authActions.logout());
        props.navigation.navigate('Auth');
      }}
      containerStyle={styles.listContainer}
      topDivider
    >
      <Icon
        name='logout'
        type='antdesign'
        color={primaryColor}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.titleListItem}>Cerrar sesión</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  </TouchableOpacity>
);

const UserProfileScreen = props => {
  const { userId } = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const userEmail = useSelector(state => state.auth.email);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien' }]);
    }
  }, [error]);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const imageTakeHandler = async (imagePath) => {
    if (imagePath) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imagePath);
        const controller = new AbortController();
        setError(null);
        try {
          await dispatch(userActions.changeProfilePicture(asset.uri, userId));
          const savedImage = await MediaLibrary.saveToLibraryAsync(imagePath);
          controller.abort();
        } catch (err) {
          setError(err.message);
        }
        controller.abort();
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <View style={styles.servicesContainer}>
      <UserHeader
        title="Mi perfil"
        subtitle="Explora tu perfil aquí"
        leftIcon="user-o"
      />
      {user ? (
        <ScrollView>
          <View style={styles.infoContainer}>
            <View style={styles.nameListContainer}>
              <Text style={styles.nameListText}>
                {user.name}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.col1}>
                <ImgPicker onImageTaken={imageTakeHandler} />
              </View>
              <View style={styles.col2}>
                <Image
                  source={shortBrandAzulUrl}
                  style={styles.mainCarga}
                />
              </View>
            </View>
            <ListItem containerStyle={styles.listContainer} topDivider bottomDivider>
              <Icon
                name='idcard'
                type='antdesign'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>Cédula de ciudadanía</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>{user.numberId}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <TouchableOpacity>
              <ListItem onPress={() => props.navigation.navigate('EditPhoneNumber')} containerStyle={styles.listContainer} bottomDivider>
                <Icon
                  name='phone'
                  type='antdesign'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>Celular</ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitleListItem}>{user.phone}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                  name='angle-right'
                  type='font-awesome'
                  color={primaryColor}
                />
              </ListItem>
            </TouchableOpacity>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Icon
                name='mail'
                type='antdesign'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>Correo electrónico</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>{userEmail}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Icon
                name='pencil'
                type='font-awesome'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>Referido por</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>
                  {user.referidNumber ? user.referidNumber : 'No tiene código de referido'}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Icon
                name='earth'
                type='antdesign'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>País</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>Colombia</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <LogOutListItem
              dispatch={dispatch}
              navigation={props.navigation}
            />
          </View>
        </ScrollView>
      ) : (
        <View>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" />
          </View>
          <LogOutListItem dispatch={dispatch} navigation={props.navigation} />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  nameListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: normalizeLength(20),
    paddingBottom: normalizeLength(20)
  },
  nameListText: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(25),
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
    marginTop: normalizeLength(4)
  },
  col1: {
    minWidth: normalizeLength(180),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainCarga: {
    width: normalizeLength(120),
    height: normalizeLength(120),
  },
  titleListItem: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    fontWeight: '700'
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(13),
    lineHeight: 24
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: normalizeLength(6)
  },
  activityIndicator: {
    marginHorizontal: normalizeLength(20)
  }
});

export default UserProfileScreen;