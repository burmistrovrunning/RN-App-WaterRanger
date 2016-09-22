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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
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
      height: 300,
      margin: 10,
      borderWidth: 1,
      borderColor: '#000000',
      flexDirection: 'column'
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
      color: 'white',
      margin: 50
  },
});


module.exports = styles;
