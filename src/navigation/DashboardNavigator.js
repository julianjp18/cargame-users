import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import UserDashboardScreen from "../screens/Users/UserDashboardScreen";
import AuthScreen from "../screens/Auth/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import UserDestinationScreen from "../screens/Users/UserDestinationScreen";
import SearchServiceScreen from "../screens/Users/SearchServiceScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import { accentColor, primaryColor } from "../constants/Colors";
import UserHomeScreen from "../screens/Users/UserHomeScreen";
import UserProfileScreen from "../screens/Users/UserProfileScreen";
import UserSupportScreen from "../screens/Users/UserSupportScreen";
import UserNotificationsScreen from "../screens/Users/UserNotificationsScreen";
import EditPhoneNumberScreen from "../screens/Users/EditProfile/EditPhoneNumberScreen";
import StartupScreen from "../screens/StartupScreen";
import UserServicesScreen from "../screens/Users/UserServicesScreen";
import GoogleMapScreen from '../screens/GoogleMapScreen';
import ServiceSelectedScreen from "../screens/Users/UserServicesScreen/ServiceSelectedScreen";
import ShowOfferScreen from "../screens/Users/UserNotificationsScreen/ShowOfferScreen";

const profileNavigator = createSwitchNavigator({
  Profile: UserProfileScreen,
  EditPhoneNumber: EditPhoneNumberScreen,
});

const ServicesNavigator = createSwitchNavigator({
  Services: UserServicesScreen,
  ServiceSelected: ServiceSelectedScreen,
});

const NotificationsNavigator = createSwitchNavigator({
  Notifications: UserNotificationsScreen,
  ShowOffer: ShowOfferScreen
});

const UserTabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: UserDashboardScreen,
      navigationOptions: {
        tabBarLabel: "Inicio",
        tabBarIcon: () => {
          return <FontAwesome name="home" size={25} color={accentColor} />;
        },
      },
    },
    Services: {
      screen: ServicesNavigator,
      navigationOptions: {
        tabBarLabel: "Servicios",
        tabBarIcon: () => {
          return (
            <FontAwesome name="paper-plane-o" size={25} color={accentColor} />
          );
        },
      },
    },
    Notifications: {
      screen: NotificationsNavigator,
      navigationOptions: {
        tabBarLabel: "Notificaciones",
        tabBarIcon: () => {
          return <AntDesign name="inbox" size={25} color={accentColor} />;
        },
      },
    },
    Support: {
      screen: UserSupportScreen,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: "Soporte",
        tabBarIcon: () => {
          return (
            <AntDesign name="customerservice" size={25} color={accentColor} />
          );
        },
      },
    },
    Profile: {
      screen: profileNavigator,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: "Perfil",
        tabBarIcon: () => {
          return <AntDesign name="user" size={25} color={accentColor} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: primaryColor,
      activeBackgroundColor: "rgba(200,200,200,.5)",
    },
    barStyle: {},
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: {
    screen: StartupScreen,
    navigationOptions: {
      headerTitle: "Index",
      headerShown: false,
    },
  },
  Index: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: "Index",
      headerShown: false,
    },
  },
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      headerTitle: "Autenticación",
      headerShown: false,
    },
  },
  Member: {
    screen: RegisterScreen,
    navigationOptions: {
      headerTitle: "Cuentanos de ti",
      headerShown: false,
    },
  },
  Dashboard: UserTabNavigator,
  Map: {
    screen: GoogleMapScreen,
    navigationOptions: {
      headerTitle: '',
      headerShown: true
    }
  },
  DestinationList: {
    screen: UserDestinationScreen,
    navigationOptions: {
      headerTitle: "Destination",
      headerShown: false,
    },
  },
  SendPackages: {
    screen: UserHomeScreen,
    navigationOptions: {
      headerTitle: "Envío de paquetes",
      headerShown: false,
    },
  },
  SendDocument: {
    screen: UserHomeScreen,
    navigationOptions: {
      headerTitle: "Envío de documentos",
      headerShown: false,
    },
  },
  ServiceCrane: {
    screen: UserHomeScreen,
    navigationOptions: {
      headerTitle: "Servicio de grúa",
      headerShown: false,
    },
  },
  ServiceTransport: {
    screen: UserHomeScreen,
    navigationOptions: {
      headerTitle: "Servicio puerta a puerta",
      headerShown: false,
    },
  },
  SearchService: {
    screen: SearchServiceScreen,
    navigationOptions: {
      headerTitle: "Esperando..",
      headerShown: false,
    },
  },
});

export default createAppContainer(MainNavigator);
