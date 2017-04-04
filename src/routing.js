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
  name: 'LoginScene',
  ref: null
}, {
  name: 'MapScene',
  ref: null
}, {
  name: 'AddScene',
  ref: null
}, {
  name: 'MyObservationScene',
  ref: null
}, {
  name: 'SettingsScene',
  ref: null
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
    }
    return '';
  };
  jumpTo = (index) => {
    if (scenes[index].ref) {
      if (scenes[index].ref.getWrappedInstance) {
        scenes[index].ref.getWrappedInstance().forceRefreshUpdate();
      } else {
        scenes[index].ref.forceRefreshUpdate();
      }
    }
    this.navigationRef.jumpTo(scenes[index]);
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
          <MapScene {...props} ref={ref => (scenes[1].ref = ref)} />
        );
      case 'AddScene':
        return (
          <AddScene {...props} ref={ref => (scenes[2].ref = ref)} />
        );
      case 'MyObservationScene':
        return (
          <MyObservationScene {...props} ref={ref => (scenes[3].ref = ref)} />
        );
      case 'SettingsScene':
        return (
          <SettingsScene
            {...props}
            onLogout={this.onLogout}
            ref={ref => (scenes[4].ref = ref)}
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
        initialRoute={this.props.hasToken ? scenes[1] : scenes[0]}
        initialRouteStack={scenes}
        renderScene={this.renderScene}
        configureScene={this.renderConfig}
        style={styles.tabView}
        ref={ref => this.navigationRef = ref}
      />
    );
  }
}
