import React, { Component, PropTypes } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var styles = StyleSheet.create({
  scroll_container: {
    flex:1,
  },
  loginContainer: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    flex:1,
  },
  statusBar: {
    backgroundColor: '#1c3653',
  },
  navBarContainer: {
    backgroundColor: '#1c3653',
    // NavBarContainer styles here (all view styles are valid)
    // unlikely that you will need to add any styles here
  },
  navBar: {
    borderTopWidth: 0,
    borderBottomColor: '#1c3653',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // default iOS styles:
    backgroundColor: '#1c3653',
    //height: IOS_NAV_BAR_HEIGHT,
    paddingLeft: 8,
    paddingRight: 8,

    // default Android styles:
    backgroundColor: '#1c3653',
    //height: ANDROID_NAV_BAR_HEIGHT,
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    flex:1,
    height: 19,
    width: 23
  },
  logo: {
    alignSelf: 'center',
    height: 19,
    width: 23
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  title: {
    alignItems: 'center',
    flex:1,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  uploadImage: {
    width:100,
    height:100,
  },
  myCallout: {
      flex: 1,
      width: 100
  },
  map: {
      flex: 2,
      margin: 0,
      borderWidth: 0,
      flexDirection: 'column',
      // height: Dimensions.get('window').height - 93,
      // width: Dimensions.get('window').width
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  textInput: {
      width: 150,
      height: 20,
      borderWidth: 0.5,
      borderColor: '#aaaaaa',
      fontSize: 13,
      padding: 4
  },
  changeButton: {
      alignSelf: 'center',
      marginTop: 5,
      padding: 3,
      borderWidth: 0.5,
      borderColor: '#777777'
  },
  tabContent: {
      paddingTop: 20,
      flex: 1
  },
  tabText: {
      color: '#4A729F',
      margin: 50
  },
  tabStyle: {
    marginTop: 2,
    marginBottom: 4
  },
  tabTitleStyle: {
    color: '#4A729F'
  },
  selectedTabTitleStyle: {
    color: '#1c3653'
  },
  tabIcon: {
    color: '#4A729F',
    fontSize: 25,
    height: 25,
    marginTop: 20
  },
  tabIconSelected: {
    color: '#1c3653',
    fontSize: 25,
    height: 25,
    marginTop: 20
  },
  mapMarker: {
    height: 24,
    width: 34
  }
});


module.exports = styles;
