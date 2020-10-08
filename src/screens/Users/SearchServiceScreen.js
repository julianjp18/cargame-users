import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  primaryColor,
  textAccentColor,
} from "../../constants/Colors";
import {
  shortBackgroundBluImageUrl,
  shortBrandAzulUrl,
  shortHeader,
  shortCarga,
} from "../../constants/Utils";
import Button from "../../components/UI/Button";
import * as offerActions from "../../redux/actions/offers";



const SearchServiceScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [] = useState();
  const typeServiceId = useSelector((state) => state.auth.typeServiceSelected);

  const waitingHandler = async () => {
    const action = offerActions.createOffer({
      userId,
    });
  
    // setError(null);
     setIsLoading(true);
  
    try {
      dispatch(action);
      props.navigation.navigate("Notifications");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  return typeServiceId ? (
    <View style={styles.supportContainer}>
      <ImageBackground source={shortBackgroundBluImageUrl} style={styles.image}>
        <Image style={styles.logo} source={shortBrandAzulUrl} />
        <Image style={styles.extraInfo} source={shortHeader} />
        <View style={styles.userBoton}>
          {isLoading ? (
            <ActivityIndicator size="large" color={primaryColor} />
          ) : (
            <Button title="Ir a mis notificaciones" onPress={waitingHandler} />
          )}
        </View>

        <View style={styles.userInfoContainer}>
          <Image style={styles.brandImageContainer} source={shortCarga} />
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View>
      <Text>Error</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  supportContainer: {
    backgroundColor: "transparent",
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  brandImageContainer: {
    marginTop: "5%",
    marginLeft: "-18%",
    justifyContent: "center",
  },
  categoriesContainer: {
    marginTop: "10%",
    backgroundColor: "rgba(255,255,255,0.0)",
    height: "40%",
  },
  logoContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 0,
  },
  logo: {
    height: 250,
    width: 250,
    marginTop: "40%",
    paddingHorizontal: "35%",
    marginLeft: "16%",
  },

  infoText: {
    paddingTop: "5%",
    color: textAccentColor,
    fontFamily: "Ruda",
    fontSize: 20,
    lineHeight: 30,
  },
  extraInfo: {
    paddingHorizontal: "5%",
    paddingTop: "1%",
    marginLeft: "12%",
  },
  extraInfoText: {
    color: textAccentColor,
    fontFamily: "Quicksand",
    fontSize: 18,
    lineHeight: 19,
  },
  row2: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
  },
  userBoton: {
    paddingVertical: "4%",
    paddingHorizontal: "15%",
    marginTop: "-6%",
  },
});

export default SearchServiceScreen;
