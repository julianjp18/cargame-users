import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "react-native-elements";
import {
  textSecondaryColor,
  darkGrey,
  primaryColor,
} from "../../constants/Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DriverHeader from "../../components/DriverHeader";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { shortBrandOrangeGreyUrl } from "../../constants/Utils";
import ImgPicker from "../../components/UI/ImagePicker";
import * as MediaLibrary from "expo-media-library";

import * as userActions from "../../redux/actions/users";

const UserProfileScreen = (props) => {
  const user = useSelector((state) => state.user);
  const userEmail = useSelector((state) => state.auth.email);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("¡Ha ocurrido un error, contacte al admin!", error, [
        { text: "Está bien" },
      ]);
    }
  }, [error]);

  const imageTakeHandler = async (imagePath) => {
    if (imagePath) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imagePath);
        const controller = new AbortController();
        setError(null);
        try {
          await dispatch(
            userActions.changeProfilePicture(asset.uri, user.userId)
          );
          const savedImage = await MediaLibrary.saveToLibraryAsync(imagePath);
          controller.abort();
        } catch (err) {
          setError(err.message);
        }
        controller.abort();
      } catch (err) {
        console.log("yes ", err);
        throw err;
      }
    }
  };

  return (
    <View style={styles.servicesContainer}>
      <DriverHeader
        title="Mi perfil"
        subtitle="Explora tu perfil aquí"
        leftIcon="user-o"
      />
      {user && (
        <ScrollView>
          <View style={styles.infoContainer}>
            <View style={styles.nameListContainer}>
              <Text style={styles.nameListText}>{user.name}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.col1}>
                <ImgPicker onImageTaken={imageTakeHandler} />
              </View>
              <View style={styles.col2}>
                <Image
                  source={shortBrandOrangeGreyUrl}
                  style={styles.mainCarga}
                />
              </View>
            </View>
            <ListItem
              containerStyle={styles.listContainer}
              title="Cédula de ciudadanía"
              titleStyle={styles.titleListItem}
              subtitle={user.numberId}
              leftAvatar={
                <AntDesign name="idcard" size={24} color={primaryColor} />
              }
              subtitleStyle={styles.subtitleListItem}
              bottomDivider
              topDivider
            />
            <TouchableOpacity>
              <ListItem
                containerStyle={styles.listContainer}
                title="Número de telefono"
                titleStyle={styles.titleListItem}
                leftAvatar={
                  <AntDesign name="phone" size={24} color={primaryColor} />
                }
                rightAvatar={
                  <AntDesign
                    name="right"
                    size={24}
                    color={darkGrey}
                    onPress={() => props.navigation.navigate("EditPhoneNumber")}
                  />
                }
                subtitle={user.phone}
                subtitleStyle={styles.subtitleListItem}
                bottomDivider
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem
                containerStyle={styles.listContainer}
                title="Correo electrónico"
                titleStyle={styles.titleListItem}
                leftAvatar={
                  <AntDesign name="mail" size={24} color={primaryColor} />
                }
                subtitle={userEmail}
                subtitleStyle={styles.subtitleListItem}
                bottomDivider
              />
            </TouchableOpacity>
            <ListItem
              containerStyle={styles.listContainer}
              title="Referido por"
              titleStyle={styles.titleListItem}
              leftAvatar={
                <FontAwesome name="pencil" size={24} color={primaryColor} />
              }
              subtitle={user.referidNumber}
              subtitleStyle={styles.subtitleListItem}
              bottomDivider
            />
            <ListItem
              containerStyle={styles.listContainer}
              title="País"
              titleStyle={styles.titleListItem}
              leftAvatar={
                <AntDesign name="earth" size={24} color={primaryColor} />
              }
              subtitle="Colombia"
              subtitleStyle={styles.subtitleListItem}
              bottomDivider
            />
            <TouchableOpacity>
              <ListItem
                containerStyle={styles.listContainer}
                title="Mi billetera"
                titleStyle={styles.titleListItem}
                leftAvatar={
                  <AntDesign name="wallet" size={24} color={primaryColor} />
                }
                rightAvatar={
                  <AntDesign name="right" size={24} color={darkGrey} />
                }
                subtitleStyle={styles.subtitleListItem}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: "transparent",
    height: "100%",
  },
  nameListContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "1%",
  },
  nameListText: {
    color: primaryColor,
    fontFamily: "Quicksand",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  title: {
    paddingTop: "1%",
    color: textSecondaryColor,
    fontFamily: "Quicksand",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    marginTop: "2%",
  },
  col1: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  col2: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainCarga: {
    width: "60%",
    height: 100,
  },
  titleListItem: {
    color: primaryColor,
    fontFamily: "Quicksand",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 24,
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: "Quicksand",
    fontSize: 14,
    lineHeight: 24,
  },
  listContainer: {
    backgroundColor: "transparent",
    paddingBottom: "2%",
  },
});

export default UserProfileScreen;
