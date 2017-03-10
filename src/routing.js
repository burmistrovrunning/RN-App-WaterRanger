import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';
import {
  LoginScene,
  MapScene,
  AddScene,
  MyObservationScene,
  SettingsScene
} from './scenes';
import { clearFailedForm } from './services';

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
  }
  onLoginSuccess = () => {
    this.props.showTabBar(true);
    this.navigationRef.jumpTo(scenes[1]);
  };
  onLogout = async () => {
    this.props.showTabBar(false);
    this.navigationRef.jumpTo(scenes[0]);
    await clearFailedForm();
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
  jumpTo = (index) => {
    this.navigationRef.jumpTo(scenes[index]);
  }
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
    return (
      <Navigator
        sceneStyle={styles.container}
        initialRoute={this.props.hasToken ? scenes[1] : scenes[1]}
        initialRouteStack={scenes}
        renderScene={this.renderScene}
        configureScene={this.renderConfig}
        style={{ backgroundColor: '#FFF' }}
        ref={ref => this.navigationRef = ref}
      />
    );
  }
}
