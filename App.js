import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { enableScreens } from 'react-native-screens';

import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import ReduxThunk from 'redux-thunk';

import DashboardNavigator from './src/navigation/DashboardNavigator';
import authReducer from './src/redux/reducers/auth';
import userReducer from './src/redux/reducers/user';
import notificationReducer from './src/redux/reducers/notification';
import placeReducer from './src/redux/reducers/place';
import travelReducer from './src/redux/reducers/travel';
import offerReducer from './src/redux/reducers/offer';
import { shortBackgroundImageUrl } from './src/constants/Utils';

enableScreens();

const fecthFonts = () => {
  return Font.loadAsync({
    'Quicksand': require('./assets/fonts/Quicksand-VariableFont_wght.ttf'),
    'Ruda': require('./assets/fonts/Ruda-VariableFont_wght.ttf'),
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  notifications: notificationReducer,
  travels: travelReducer,
  offer: offerReducer,
  places: placeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return (
      <AppLoading
        startAsync={fecthFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ImageBackground source={shortBackgroundImageUrl} style={styles.image}>
        <DashboardNavigator style={styles.container} />
      </ImageBackground>
    </Provider>
  );
}

export default App;
