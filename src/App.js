import React from 'react';
import {
  AppRegistry,
  View,
  AsyncStorage,
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import LoginScene from './components/LoginScene';
import MapScene from './components/MapScene';
import AddScene from './components/AddScene';
import MyObservationsScene from './components/MyObservationsScene';
import SettingsScene from './components/SettingsScene';
import NavBarDark from './components/NavBar';
import styles from './styles/Styles';

const TabView = TabNavigator({
  Map: {
    screen: MapScene,
  },
  Add: {
    screen: AddScene,
  },
  Observations: {
    screen: MyObservationsScene,
  },
  Settings: {
    screen: SettingsScene,
  },
}, {
  animationEnabled: true,
  lazyLoad: true,
  tabBarOptions: {
    activeTintColor: '#1c3653',
    inactiveTintColor: '#999999'
  },
});
export default class WaterRangers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false,
      error: null,
      latitude: 'unknown',
      longitude: 'unknown',
    };
  }
  componentWillMount() {
    this.checkLogin();
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    }, error => console.log('error on get location', JSON.stringify(error)), {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onCheckLogin = () => {
    AsyncStorage.getItem('accessToken').then((value) => {
      let loggedIn;
      if (!value) {
        loggedIn = false;
      } else {
        loggedIn = true;
      }
      this.setState({ loggedIn, loadedCookie: true });
    }).done();
  };

  render() {
    const { loadedCookie, loggedIn, latitude, longitude } = this.state;
    if (loadedCookie && loggedIn) {
      return (
        <View style={styles.tabView}>
          <NavBarDark />
          <TabView
            ref={nav => this.navigator = nav}
            screenProps={{
              geoLat: latitude,
              geoLng: longitude,
              checkLogin: this.onCheckLogin
            }}
          />
        </View>
      );
    }
    return <LoginScene checkLogin={this.onCheckLogin} />;
  }
}

AppRegistry.registerComponent('WaterRangers', () => WaterRangers);
