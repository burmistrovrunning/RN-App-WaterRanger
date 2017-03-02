import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Router } from './routing';
import { LocationActions } from './redux/actions';
import { NavigationBar } from './components';
import { TabView } from './tab/TabView';
import { styles } from './styles/MainContainer';

class _MainContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.navigator = null;
    this.state = {
      showTabBar: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('get location success', position);
      this.props.dispatch(LocationActions.updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    }, error => console.log('error on get location', JSON.stringify(error)), {
      enableHighAccuracy: true, timeout: 10000, maximumAge: 1000
    });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.props.dispatch(LocationActions.updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onTabRoute = (activeItem, oldItem) => {
    if (activeItem !== oldItem) {
      let sceneName = '';
      const transition = activeItem < oldItem ? 'left' : 'right';
      switch (activeItem) {
        case 0:
          sceneName = 'MapScene';
          break;
        case 1:
          sceneName = 'AddScene';
          break;
        case 2:
          sceneName = 'MyObservationScene';
          break;
        case 3:
          sceneName = 'SettingsScene';
          break;
        default:
          sceneName = 'MapScene';
      }
      this.routingRef.resetScene(sceneName, transition);
    }
  };
  resetScene = (sceneName) => {
    if (sceneName && sceneName.length > 0) {
      this.routingRef.resetScene(sceneName);
    }
  };
  showTabBar = showTabBar => this.setState({ showTabBar });

  render() {
    return (
      <View style={styles.tabView}>
        <NavigationBar />
        <TabView onTabRoute={this.onTabRoute} showTabBar={this.state.showTabBar}>
          <Router
            showTabBar={this.showTabBar}
            ref={ref => this.routingRef = ref}
          />
        </TabView>
      </View>
    );
  }
}

export const MainContainer = connect()(_MainContainer);
