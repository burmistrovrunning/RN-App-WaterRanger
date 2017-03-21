import React, { Component } from 'react';
import { View, NetInfo, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
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
import SplashScreen from 'react-native-splash-screen';

class _MainContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.navigator = null;
    this.tabView = null;
    this.watchID = null;
    this.networkStatus = false;
    this.state = {
      hasToken: false,
      waiting: true
    };
  }

  componentDidMount() {
    watchLocation(location => this.props.dispatch(LocationActions.updateLocation(location)));
    this.watchNetworkStatus();
    localStorage.get('accessToken')
      .then((token) => {
        console.log('token', token);
        const hasToken = !!token;
        this.setState({ hasToken, waiting: false });
        this.showTabBar(hasToken);
        startSubmitFailedDataInterval();
      })
      .catch(() => this.setState({ hasToken: false, waiting: false }));
      SplashScreen.hide();
  }
  componentWillUnmount() {
    NetInfo.removeEventListener('change', this.onNetworkStatusChange);
    clearWatchLocation();
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
  onUpdateTabIndex = (index) => {
    this.tabView.updateTabIndex(index);
    this.onTabRoute(index);
  };
  onTabRoute = (activeItem, oldItem) => {
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
  watchNetworkStatus() {
    NetInfo.addEventListener('change', this.onNetworkStatusChange);
    NetInfo.fetch().done(this.onNetworkStatusChange);
  }
  render() {
    const { waiting } = this.state;
    if (waiting) {
      return (
        <ActivityIndicator animating={true} color="white" style={styles.centering} size="large" />
      );
    }
    return (
      <View style={styles.tabView}>
        <NavigationBar />
        <TabView ref={ref => this.tabView = ref} onTabRoute={this.onTabRoute}>
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
