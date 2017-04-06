import React, { Component } from 'react';
import { View, NetInfo, ActivityIndicator, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { Router } from './routing';
import { LocationActions } from './redux/actions';
import { NavigationBar } from './components';
import {
  localStorage,
  clearWatchLocation,
  watchLocation,
  startSubmitFailedDataInterval
} from './services';
import { TabView } from './tab/TabView';
import { styles } from './styles/MainContainer';

class _MainContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.navigator = null;
    this.tabView = null;
    this.watchID = null;
    this.networkStatus = false;
    this.state = {
      hasToken: false,
      waiting: true,
      showPage: Platform.OS === 'ios'
    };
    if (Platform.OS === 'android') {
      this.checkIsLocation();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      watchLocation(location => this.props.dispatch(LocationActions.updateLocation(location)));
      this.watchNetworkStatus();
      localStorage.get('accessToken')
        .then(async (token) => {
          console.log('token', token);
          const hasToken = !!token;

          this.setState({ hasToken, waiting: false });
          startSubmitFailedDataInterval();
        })
        .catch(() => this.setState({ hasToken: false, waiting: false }));
      SplashScreen.hide();
    }, 100);
  }
  componentWillUnmount() {
    NetInfo.removeEventListener('change', this.onNetworkStatusChange);
    clearWatchLocation();
  }
  onNetworkStatusChange = (connectionInfo) => {
    if (connectionInfo) {
      this.networkStatus = true;
      if (connectionInfo.toLowerCase() === 'none') {
        this.networkStatus = false;
      }
    }
    if (!this.networkStatus && this.tabView && this.tabView.getTabIndex() === 0) {
      this.routingRef.resetScene('AddScene');
    }
  };
  onUpdateTabIndex = (index) => {
    this.tabView.updateTabIndex(index);
    this.onTabRoute(index);
  };
  onTabViewInitialized = (ref) => {
    this.tabView = ref;
    if (this.state.hasToken) {
      this.showTabBar(true);
    }
    this.onNetworkStatusChange(null);
  };
  onTabRoute = (activeItem, oldItem) => {
    console.log('onTabRoute', activeItem);
    if (activeItem !== oldItem) {
      if (!this.networkStatus && activeItem === 0) {
        Alert.alert('No network access', 'Map is not available when you’re offline.',
          [{ text: 'Close', onPress: () => this.routingRef.jumpTo(3) }], { cancelable: true }
        );
      } else {
        this.routingRef.jumpTo(activeItem + 1);
      }
    }
  };
  resetScene = (sceneName) => {
    if (sceneName && sceneName.length > 0) {
      this.routingRef.resetScene(sceneName);
    }
  };
  showTabBar = visible => this.tabView.updateTabVisible(visible);
  checkIsLocation() {
    setTimeout(async () => {
      try {
        LocationServicesDialogBox.enableLocationPermission();
        const check = await LocationServicesDialogBox.checkLocationService({
          message: 'You have to turn on location to use this application. Do you want to turn on it now?',
          ok: 'YES',
          cancel: 'NO'
        });
        if (check === 'enabled') {
          this.setState({ showPage: true });
        }
      } catch (err) {
        console.log('err', err);
      }
    }, 100);
  }
  watchNetworkStatus() {
    NetInfo.addEventListener('change', this.onNetworkStatusChange);
    NetInfo.fetch().done(this.onNetworkStatusChange);
  }
  render() {
    const { waiting, showPage } = this.state;
    if (waiting || !showPage) {
      return (
        <ActivityIndicator animating={true} color="white" style={styles.centering} size="large" />
      );
    }

    return (
      <View style={styles.tabView}>
        <NavigationBar />
        <TabView ref={this.onTabViewInitialized} onTabRoute={this.onTabRoute}>
          <Router
            hasToken={this.state.hasToken}
            onTabRoute={this.onTabRoute}
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
