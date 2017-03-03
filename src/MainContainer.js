import React, { Component } from 'react';
import { View, NetInfo } from 'react-native';
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
    this.tabView = null;
    this.watchID = null;
    this.networkStatus = false;
  }

  componentDidMount() {
    this.watchLocation();
    this.watchNetworkStatus();
  }
  componentWillUnmount() {
    NetInfo.removeEventListener('change', this.onNetworkStatusChange);
    navigator.geolocation.clearWatch(this.watchID);
  }
  onNetworkStatusChange = (connectionInfo) => {
    this.networkStatus = true;
    if (connectionInfo === 'none') {
      this.networkStatus = false;
    }
    if (!this.networkStatus && this.tabView.getTabIndex() === 0) {
      this.routingRef.resetScene('AddScene');
    }
  };
  onUpdateTabIndex = index => this.tabView.updateTabIndex(index);
  onTabRoute = (activeItem, oldItem) => {
    if (activeItem !== oldItem) {
      let sceneName = '';
      switch (activeItem) {
        case 0:
          sceneName = 'MapScene';
          console.log('this.networkStatus', this.networkStatus);
          if (!this.networkStatus) {
            sceneName = 'AddScene';
          }
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
      this.routingRef.resetScene(sceneName);
    }
  };
  resetScene = (sceneName) => {
    if (sceneName && sceneName.length > 0) {
      this.routingRef.resetScene(sceneName);
    }
  };
  showTabBar = visible => this.tabView.updateTabVisible(visible);
  watchLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('get location success', position);
      this.props.dispatch(LocationActions.updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    }, error => console.log('error on get location', JSON.stringify(error)), {
      enableHighAccuracy: true, timeout: 1000, maximumAge: 1000
    });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.props.dispatch(LocationActions.updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    });
    setTimeout(() => {
      this.props.dispatch(LocationActions.updateLocation({
        latitude: 45.3493143,
        longitude: -75.8246687
      }));
    }, 5000);
  }

  watchNetworkStatus() {
    NetInfo.addEventListener('change', this.onNetworkStatusChange);
    NetInfo.fetch().done(this.onNetworkStatusChange);
  }
  render() {
    return (
      <View style={styles.tabView}>
        <NavigationBar />
        <TabView
          ref={ref => this.tabView = ref}
          onTabRoute={this.onTabRoute}
        >
          <Router
            updateTabIndex={this.onUpdateTabIndex}
            showTabBar={this.showTabBar}
            ref={ref => this.routingRef = ref}
          />
        </TabView>
      </View>
    );
  }
}

export const MainContainer = connect()(_MainContainer);
