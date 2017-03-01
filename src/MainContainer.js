import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Router } from './routing';
import { NavigationBar } from './components';
import { TabView } from './tab/TabView';
import { styles } from './styles/MainContainer';

class _MainContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.navigator = null;
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
      this.updatePage(sceneName);
    }
  };

  // updatePage = (page) => {
  //   // this.props.dispatch(UIActions.updatePage(page));
  //   return page;
  // };

  render() {
    return (
      <View style={styles.tabView}>
        <NavigationBar />
        <TabView onTabRoute={this.onTabRoute}>
          <Router
            ref={ref => this.routingRef = ref}
            // updatePage={this.updatePage}
          />
        </TabView>
      </View>
    );
  }
}

export const MainContainer = connect()(_MainContainer);
