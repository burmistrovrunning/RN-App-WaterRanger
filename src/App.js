import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MainContainer } from './MainContainer';

export const App = () => (
  <Provider store={store}>
    <MainContainer navigator="Profile" />
  </Provider>
);


AppRegistry.registerComponent('WaterRangers', () => App);
