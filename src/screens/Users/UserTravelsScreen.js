import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const UserTravelsScreen = props => {
    const IN_PROGRESS_TRAVELS = 1;
    const FINISHED_TRAVELS = 0;
    const [typeTravelService, setTypeTravelService] = useState(IN_PROGRESS_TRAVELS);

    const changeTypeTravelService = (changeType) => {
        setTypeTravelService(changeType);
    };

    return (
        <View style={styles.servicesContainer}>
            <DriverHeader
                title="Mis viajes"
                subtitle="Explora tus viajes"
                leftIcon="flag"
            />
            <View style={styles.row}>
                <View style={styles.col1}>
                    <Text
                        style={[
                            styles.serviceTitle,
                            typeTravelService === IN_PROGRESS_TRAVELS
                                ? styles.serviceTitleSelected
                                : ''
                        ]}
                        onPress={() => changeTypeTravelService(IN_PROGRESS_TRAVELS)}
                    >
                        Viajes en progreso
                    </Text>
                </View>
                <View style={styles.col2}>
                    <Text
                        style={[
                            styles.serviceTitle,
                            typeTravelService === FINISHED_TRAVELS
                                ? styles.serviceTitleSelected
                                : ''
                        ]}
                        onPress={() => changeTypeTravelService(FINISHED_TRAVELS)}
                    >
                        Viajes realizados
                    </Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                {typeTravelService == 0 ? (
                    <ScrollView>
                        <View style={styles.infoContainer}>
                            <TouchableOpacity>
                                <ListItem
                                    containerStyle={styles.listContainer}
                                    bottomDivider
                                    leftIcon={
                                        <AntDesign className="" name="bells" size={24} color={primaryColor} />
                                    }
                                    rightIcon={
                                        <AntDesign name="right" size={24} color={primaryColor} />
                                    }
                                    title="¡Bienvenido a Cargame! Consulta con Soporte si tienes alguna duda."
                                    titleStyle={styles.titleListItem}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                ): (
                    <ScrollView>
                        <View style={styles.infoContainer}>
                            <TouchableOpacity>
                                <ListItem
                                    containerStyle={styles.listContainer}
                                    bottomDivider
                                    leftIcon={
                                        <AntDesign className="" name="bells" size={24} color={primaryColor} />
                                    }
                                    rightIcon={
                                        <AntDesign name="right" size={24} color={primaryColor} />
                                    }
                                    title="¡Bienvenido a Cargame! Consulta con Soporte si tienes alguna duda."
                                    titleStyle={styles.titleListItem}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </View>
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
    row: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    col1: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    col2: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    serviceTitle: {
        width: '100%',
        paddingVertical: '5%',
        textAlign: 'center',
        color: primaryColor,
        fontWeight: 'bold'
    },
    serviceTitleSelected: {
        backgroundColor: 'white'
    }
});

export default UserTravelsScreen;