import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import NavBar from 'react-native-nav';
import { styles } from '../../styles/components/Navigation';

const xmlData = `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
x="0px" y="0px" viewBox="0 0 23 19.6" xml:space="preserve" height="19px" width="23px">
<path fill="#FFFFFF" d="M0.7,0.7L0.7,0.7c0.9-0.9,2.3-0.9,3.2,0l4.8,4.8c0.6,0.6,1.2,3,1.2,3l1.6,1.6l1.6-1.6
c0,0,0.6-2.4,1.2-3l4.8-4.8c0.9-0.9,2.3-0.9,3.2,0c0.9,0.9,0.9,2.3,0,3.2l-4.8,4.8c-0.6,0.6-2.8,1-2.8,1l-1.8,1.8l6.7,6.7l-1.4,1.4l-6.7-6.7l-6.7,6.7l-1.4-1.4l6.7-6.7L8.3,9.7c0,0-2.2-0.4-2.8-1L0.7,3.9C-0.2,3-0.2,1.5,0.7,0.7"/>
</svg>
`;
export const NavigationBar = () => (
  <NavBar style={styles} statusBar={{ barStyle: 'light-content' }}>
    <View style={styles.title}>
      <View style={styles.logoContainer}>
        <SvgUri
          svgXmlData={xmlData}
          fill="white"
          height="19"
          width="23"
        />
      </View>
    </View>
  </NavBar>
);
