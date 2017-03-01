import EStyleSheet from 'react-native-extended-stylesheet';
import './GlobalStyles.js';

// Basic styles
export const styles = EStyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '$colorBrightBlue',
    borderColor: '$colorBrightBlue',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  mapMarker: {
    height: 24,
    width: 34
  },
  // Forms
  errorTextContainer: {
    backgroundColor: '$colorRed',
    borderRadius: 5,
    height: 36,
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  },
  errorText: {
    color: '$colorWhite',
    textAlign: 'center'
  }
});
