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

const scenes = [{
  name: 'LoginScene'
}, {
  name: 'MapScene'
}, {
  name: 'AddScene'
}, {
  name: 'MyObservationScene'
}, {
  name: 'SettingsScene'
}];
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
        console.log('token', token);
        const hasToken = !!token;
        this.setState({ hasToken, waiting: false });
        this.props.showTabBar(hasToken);
      })
      .catch(() => this.setState({ hasToken: false, waiting: false }));
  }
  onLoginSuccess = () => {
    this.props.showTabBar(true);
    this.navigationRef.jumpTo(scenes[1]);
  };
  onLogout = () => {
    this.props.showTabBar(false);
    this.navigationRef.jumpTo(scenes[0]);
  };
  resetScene = (name) => {
    let index = -1;
    scenes.forEach((scene, idx) => {
      if (scene.name === name) {
        index = idx;
      }
    });
    if (index > -1) {
      this.props.updateTabIndex(index - 1);
      return this.navigationRef.jumpTo(scenes[index]);
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
    console.log('route', currentRoute.name, props);
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
          <SettingsScene
            {...props}
            onLogout={this.onLogout}
          />
        );
      case 'LoginScene':
        return (
          <LoginScene
            {...props}
            onLoginSuccess={this.onLoginSuccess}
          />
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
    console.log('scene', this.state.hasToken, this.state.hasToken ? scenes[1] : scenes[0]);
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
