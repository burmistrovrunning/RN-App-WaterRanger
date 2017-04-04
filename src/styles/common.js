import EStyleSheet from 'react-native-extended-stylesheet';
import './GlobalStyles.js';

// Basic styles
export const styles = EStyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '$colorBeige',
    flex: 1,
    padding: 20,
  },
  settingsWrapper: {
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    flex: 1,
    padding: 20
  },
  settingsContainer: {
    marginBottom: 20
  },
  settingsFooter: {
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20
  },
  noPadContainer: {
    backgroundColor: '$colorBeige',
    flex: 1
  },
  buttonText: {
    fontSize: 22,
    fontFamily: '$globalFontHeader',
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '$colorBrightBlue',
    borderColor: '$colorBrightBlue',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    marginBottom: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  logOutButton: {
    backgroundColor: '$colorRed',
    borderColor: '$colorRed'
  },
  findMeButton: {
    backgroundColor: '$colorBrightBlue',
    borderRadius: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
    paddingRight: 8
  },
  findMeButtonText: {
    color: '$colorWhite',
    fontFamily: '$globalFontHeader'
  },
  findMeButtonIcon: {
    color: '$colorWhite',
    fontSize: 15,
    marginTop: 1
  },
  linkColor: {
    color: '$colorBrightBlue'
  },
  mapMarker: {
    height: 24,
    width: 34
  },
  // Fonts
  headerOne: {
    fontSize: 26,
    fontFamily: '$globalFontHeader',
    marginBottom: 15
  },
  headerTwo: {
    fontSize: 24,
    fontFamily: '$globalFontHeader',
    marginBottom: 10
  },
  headerThree: {
    fontSize: 20,
    fontFamily: '$globalFontHeader',
    marginBottom: 10
  },
  fixedHeader: {
    borderBottomColor: '$lineColor',
    borderBottomWidth: 1,
    marginBottom: 0,
    padding: 20
  },
  smallHeader: {
    color: '$colorDarkBeige',
    fontSize: 14,
    fontFamily: '$globalFontHeader',
  },
  helpText: {
    lineHeight: 20,
    marginBottom: 20
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
