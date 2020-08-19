import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import UserDashboardScreen from '../screens/Users/UserDashboardScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import UserHomeScreen from '../screens/Users/UserHomeScreen';
import UserDestinationScreen from '../screens/Users/UserDestinationScreen';
import UserWaitingScreen from '../screens/Users/UserWaitingScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import { accentColor, primaryColor } from '../constants/Colors';
import UserProfileScreen from '../screens/Users/UserProfileScreen';
import UserSupportScreen from '../screens/Users/UserSupportScreen';
import UserNotificationsScreen from '../screens/Users/UserNotificationsScreen';
import UserTravelsScreen from '../screens/Users/UserTravelsScreen';
import EditPhoneNumberScreen from '../screens/Users/EditProfile/EditPhoneNumberScreen';
import StartupScreen from '../screens/StartupScreen';

const profileNavigator = createSwitchNavigator({
    Profile: UserProfileScreen,
    EditPhoneNumber: EditPhoneNumberScreen,
});

const UserTabNavigator = createBottomTabNavigator({
        Offers: {
            screen: UserHomeScreen,
            navigationOptions: {
                tabBarLabel: 'Ofertas',
                tabBarIcon: (tabInfo) => {
                    return <MaterialIcons name="monetization-on" size={24} color={accentColor} />
                }
            }
        },
        Notifications: {
            screen: UserNotificationsScreen,
            navigationOptions: {
                tabBarLabel: 'Notificaciones',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="inbox" size={25} color={accentColor} />
                }
            }
        },
        Travels: {
            screen: UserTravelsScreen,
            navigationOptions: {
                tabBarLabel: 'Viajes',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="flag" size={25} color={accentColor} />
                }
            }
        },
        Services: {
            screen: UserSupportScreen,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Servicios',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="customerservice" size={25} color={accentColor} />
                }
            }
        },
        Profile: {
            screen: profileNavigator,
            navigationOptions: {
                headerShown: false,
                tabBarLabel: 'Perfil',
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="user" size={25} color={accentColor} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: primaryColor,
            activeBackgroundColor: 'rgba(200,200,200,.5)'
        },
        barStyle: {
        }
    }
);

const MainNavigator = createSwitchNavigator({
    Startup: {
        screen: StartupScreen,
        navigationOptions: {
            headerTitle: 'Index',
            headerShown: false
        }
    },
    Index: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Index',
            headerShown: false
        }
    },
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            headerTitle: 'Autenticación',
            headerShown: false
        }
    },
    Member: {
        screen: RegisterScreen,
        navigationOptions: {
            headerTitle: 'Cuentanos de ti',
            headerShown: false
        }
    },
    ServicesList: {
        screen: UserDashboardScreen,
        navigationOptions: {
            headerTitle: 'Home - driver',
            headerShown: false
        }
    },
    DestinationList: {
        screen: UserDestinationScreen,
        navigationOptions: {
            headerTitle: 'Destination',
            headerShown: false
        }
    },
    WaitingList: {
        screen: UserWaitingScreen,
        navigationOptions: {
            headerTitle: 'Esperando..',
            headerShown: false
        }
    },
    HomeDriver: {
        screen: UserHomeScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Dashboard: UserTabNavigator
});

export default createAppContainer(MainNavigator);