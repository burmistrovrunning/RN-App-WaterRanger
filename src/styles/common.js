import EStyleSheet from 'react-native-extended-stylesheet';
import './GlobalStyles.js';

// Basic styles
export const styles = EStyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 10,
  },
  noPadContainer: {
    backgroundColor: '#FFF',
    flex: 1
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
    marginBottom: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  mapMarker: {
    height: 24,
    width: 34
  },
  // Fonts
  headerOne: {
    fontSize: 22,
    fontFamily: '$globalFont',
    fontWeight: 'bold',
    marginBottom: 15
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
