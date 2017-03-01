import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import NavBar, { NavTitle } from 'react-native-nav';
import { styles } from '../../styles/components/Navigation';

export const NavigationBar = () => (
  <NavBar style={styles} statusBar={{ barStyle: 'light-content' }}>
    <NavTitle style={styles.title}>
      <View style={styles.logoContainer}>
        <SvgUri
          source={require('../../images/crossed-oars-white.svg')}
          fill="white"
          height="19"
          width="23"
        />
      </View>
    </NavTitle>
  </NavBar>
);
