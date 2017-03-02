import React, { Component } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';
import {
  LoginScene,
  MapScene,
  AddScene,
  MyObservationScene,
  SettingsScene
} from './scenes';
import { localStorage } from './services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export class Router extends Component {
  constructor(props, context) {
    super(props, context);
    this.navigationRef = null;
    this.state = {
      hasToken: false,
      waiting: true
    };
  }
  componentDidMount() {
    localStorage.get('accessToken')
      .then((token) => {
        const hasToken = !!token;
        this.setState({ hasToken, waiting: false });
      })
      .catch(() => this.setState({ hasToken: false, waiting: false }));
  }

  resetScene = (sceneName) => {
    const scenes = ['MapScene', 'AddScene', 'MyObservationScene', 'SettingsScene', 'LoginScene'];
    if (scenes.indexOf(sceneName) > -1) {
      return this.navigationRef.jumpTo(sceneName);
    }
    return '';
  };
  renderScene = (route, navigator) => {
    const currentRoute = typeof route === 'string' ? { name: route } : route;
    const props = {
      ...route.passProps,
      navigator,
      resetScene: this.resetScene,
      onBack: () => navigator.pop(),
    };
    switch (currentRoute.name) {
      case 'MapScene':
        return (
          <MapScene {...props} />
        );
      case 'AddScene':
        return (
          <AddScene {...props} />
        );
      case 'MyObservationScene':
        return (
          <MyObservationScene {...props} />
        );
      case 'SettingsScene':
        return (
          <SettingsScene {...props} />
        );
      case 'LoginScene':
        return (
          <LoginScene {...props} />
        );
      default:
        return (
          <MapScene {...props} />
        );
    }
  };
  renderConfig() {
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    const { waiting } = this.state;
    if (waiting) {
      return <View />;
    }
    const scenes = ['LoginScene', 'MapScene', 'AddScene', 'MyObservationScene', 'SettingsScene'];
    return (
      <Navigator
        sceneStyle={styles.container}
        initialRoute={this.state.hasToken ? scenes[1] : scenes[0]}
        initialRouteStack={scenes}
        renderScene={this.renderScene}
        configureScene={this.renderConfig}
        style={{ backgroundColor: '#FFF' }}
        ref={ref => this.navigationRef = ref}
      />
    );
  }
}
