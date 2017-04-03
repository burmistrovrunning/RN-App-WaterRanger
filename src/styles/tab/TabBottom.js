import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '$colorBlue',
    borderTopColor: '$lineColor',
    borderTopWidth: 0,
    flexDirection: 'row',
    height: 49,
    paddingVertical: 3,
    '@media android': {
      borderTopWidth: 1,
      borderTopColor: '#264364',
      overflow: 'visible',
      justifyContent: 'flex-start'
    },
  },
  tabContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    '@media android': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 5
    },
  },
  tabLabel: {
    color: '$colorWhite',
    fontSize: 10,
    fontFamily: '$globalFont',
    '@media android': {
      fontSize: 11,
      fontFamily: '$globalFontHeader'
    },
  },
  tabIcon: {
    color: '$colorWhite',
    marginTop: 3,
    textAlign: 'center',
    '@media android': {
      marginRight: 5,
    },
  },
});
