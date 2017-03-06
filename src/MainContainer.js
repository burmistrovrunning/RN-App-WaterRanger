import React, { Component } from 'react';
import { View, NetInfo, ActivityIndicator } from 'react-native';
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
  onUpdateTabIndex = index => this.tabView.updateTabIndex(index);
  onTabRoute = (activeItem, oldItem) => {
    if (activeItem !== oldItem) {
      let index = activeItem + 1;
      if (!this.networkStatus && index === 1) {
        index = 2;
      }
      this.routingRef.jumpTo(index);
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
        <ActivityIndicator animating={true} style={styles.centering} size="large" />
      );
    }
    return (
      <View style={styles.tabView}>
        <NavigationBar />
        <TabView ref={ref => this.tabView = ref} onTabRoute={this.onTabRoute}>
          <Router
            hasToken={this.state.hasToken}
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
