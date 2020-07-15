// Definicion de constantes requeridas para la implementacion del menu de navegacion
// Autor: Julian Perez
// Modificado: Flavio Cortes
// Fecha Julio 15/2020

export const shortBackgroundImageUrl = require('../../assets/background.png');
export const shortBackgroundBluImageUrl = require('../../assets/extras/backazul.png');
export const shortBrandAzulUrl = require('../../assets/logos/logo-cargame-azul.png');
export const shortBrandPuntosUrl = require('../../assets/extras/fondopuntos.png');
export const shortMainCargaUrl = require('../../assets/extras/main-carga.png');
export const whiteSquareUrl = require('../../assets/white_square.png');
export const planeSquareUrl = require('../../assets/extras/plane_and_square.png');
export const busSquareUrl = require('../../assets/extras/bus_and_square.png');
export const craneSquareUrl = require('../../assets/extras/crane_and_square.png');
export const motocycleSquareUrl = require('../../assets/extras/motocycle_and_square.png');
export const carSquareUrl = require('../../assets/extras/car_and_square.png');
export const truckSquareUrl = require('../../assets/extras/truck_and_square.png');
export const primaryFont = 'Ruda';
export const secondaryFont = 'Quicksand';

export const CATEGORIES_LIST = [
    {
        id: 'package',
        name: 'Envía una carga o un paquete',
        avatar_url: truckSquareUrl,
        subtitle: '',
        routeName: 'SendPackages',
    },
    {
        id: 'document',
        name: 'Envíar un documento',
        avatar_url: carSquareUrl,
        subtitle: '',
        routeName: 'SendDocument',
    },
    {
        id: 'craneService',
        name: 'Solicita un servicio de grúa',
        avatar_url: motocycleSquareUrl,
        subtitle: '',
        routeName: 'ServiceCrane',
    },
    {
        id: 'transport',
        name: 'Solicita servicio puerta a puerta',
        avatar_url: craneSquareUrl,
        subtitle: '',
        routeName: 'ServiceTransport',
    },
   
];
