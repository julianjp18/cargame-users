export const shortBackgroundImageUrl = require('../../assets/background.png');
export const shortBackgroundBluImageUrl = require('../../assets/extras/backazul.png');
export const shortBrandAzulUrl = require('../../assets/logos/logo-cargame-azul.png');
export const whiteLogo = require('../../assets/logos/white_logo.png')
export const shortBrandPuntosUrl = require('../../assets/extras/fondopuntos.png');
export const shortBrandSoatUrl = require('../../assets/extras/soat.png');
export const shortCarga = require('../../assets/extras/carga.png');
export const shortMapaUrl = require('../../assets/extras/mapa.png');
export const shortBrandFondoAzulUrl = require('../../assets/extras/moto.png');
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
      name: 'Envíar una carga o paquete',
      avatar_url: truckSquareUrl,
      routeName: 'SendPackages', 
    },
    {
      id: 'document',
      name: 'Envíar un documento',
      avatar_url: carSquareUrl,
      routeName: 'SendDocument',
    },
    {
        id: 'crane',
        name: 'Solicita un servicio de grúa',
        avatar_url: motocycleSquareUrl,
        routeName: 'ServiceCrane',
    },
    {
        id: 'door',
        name: 'Solicitar transporte puerta a puerta',
        avatar_url: craneSquareUrl,
        routeName: 'ServiceTransport',
    },
];

export const collectionTimeSlot = [
  {
      label: 'manana',
      value: 'Mañana (7:00am - 12:00pm)'
  },
  {
      label: 'tarde',
      value: 'Tarde (12:01pm - 6:59pm)'
  },
  {
      label: 'noche',
      value: 'Noche (7:00pm - 10:00pm)'
  }
];