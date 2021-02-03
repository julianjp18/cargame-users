/**
 * Componente Fallback a mostrar en lugar del mapa
 */

//  Dependencias
import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View, ActivityIndicator, Text } from 'react-native';

// Constantes
import { shortBrandOrangeGreyUrl } from '../../../constants/Utils';
import { accentColor } from '../../../constants/Colors';

// Estilos
import { fullWidth, fullHeight, boxShadow } from '../../../styles/layout';

/**
 * Componente Fallback a mostrar en lugar del mapa
 * 
 * @param {Boolean} showMessage Si se va a mostrar mensaje de error
 */
const Fallback = ({ showMessage }) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={shortBrandOrangeGreyUrl}
            />
            {
                !showMessage
                    ? <ActivityIndicator size="large" />
                    : <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Lo sentimos. Imposible continuar, por favor asegurate de que la ubicación este encendida y el permiso concedido
                        </Text>
                    </View>
            }
        </View>
    );

};
// Proptypes
Fallback.propTypes = {
    showMessage: PropTypes.bool
};

// Estilos
const styles = StyleSheet.create({
    container: {
        height: fullHeight,
        width: fullWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: '50%',
        height: '50%',
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: fullWidth - 40,
        height: 100,
        margin: 20,
        backgroundColor: accentColor,
        padding: 20,
        ...boxShadow
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
});
export default Fallback;