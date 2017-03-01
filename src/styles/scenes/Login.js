import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  loginContainer: {
    backgroundColor: '$colorBlue',
    flex: 2,
    margin: 0,
    borderWidth: 0,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center'
  },
  loginLogoContainer: {
    alignSelf: 'center',
    height: 150,
    width: 150
  },
  loginFormContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loginLogo: {
    height: 150,
    width: 150
  }
});

