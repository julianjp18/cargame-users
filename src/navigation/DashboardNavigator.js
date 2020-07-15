// Autor: Flavio Cortes
// Fecha: Julio 15 de 2020
// Descripcion: Módulo de navegación del sistema cargame_usuario

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// librerias de autorizacion y presentacion ppal
import AuthScreen from '../screens/Auth/AuthScreen'; // activa la pantalla de autenticacion
import RegisterScreen from '../screens/Auth/RegisterScreen'; // activa la pantalla de registro nuevo
import { accentColor, primaryColor } from '../constants/Colors'; // colores de la pantalla ppal
import HomeScreen from '../screens/HomeScreen'; // pinta la pantalla de bienvenida 

// formularios en los cuales se van a navegar.
import UserDashboardScreen from '../screens/Users/UserDashboardScreen'; // pinta el menu en la pantalla
import UserProfileScreen from '../screens/Users/UserProfileScreen'; // pinta el formulario de perfil de usuario.
import UserSupportScreen from '../screens/Users/UserSupportScreen'; // pinta el formulario de soporte al usuario.
import UserNotificationsScreen from '../screens/Users/UserNotificationsScreen'; // pinta el formulario de notificaciones
import EditPhoneNumberScreen from '../screens/Users/EditProfile/EditPhoneNumberScreen'; // pinta el formulario de edicion de telefonos

const profileNavigator = createSwitchNavigator({
    Profile: UserProfileScreen,
    EditPhoneNumber: EditPhoneNumberScreen,
});

const UserTabNavigator = createBottomTabNavigator({
    HomeDriver: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false,
            tabBarLabel: 'Inicio',
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="home" size={25} color={accentColor} />
            },
        }
    },
    Offers: {
        screen: HomeScreen,
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
        screen: HomeScreen,
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
    Dashboard: UserTabNavigator
});

export default createAppContainer(MainNavigator);