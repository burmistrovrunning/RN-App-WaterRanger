import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import '../GlobalStyles.js';

export const styles = EStyleSheet.create({
  statusBar: {
    backgroundColor: '$colorBlue',
  },
  navBarContainer: {
    backgroundColor: '$colorBlue',
  },
  navBar: {
    borderTopWidth: 0,
    borderBottomColor: '$colorBlue',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // default iOS styles:
    backgroundColor: '$colorBlue',
    // height: IOS_NAV_BAR_HEIGHT,
    paddingLeft: 8,
    paddingRight: 8,
    height: 44,
    // default Android styles:
    // height: ANDROID_NAV_BAR_HEIGHT,
  },
  navHidden: {
    position: 'absolute',
    top: Dimensions.get('window').height
  },
  logoContainer: {
    alignItems: 'center',
    height: 19,
    width: 23
  },
  logo: {
    alignSelf: 'center',
    height: 19,
    width: 23
  },
  title: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
});
