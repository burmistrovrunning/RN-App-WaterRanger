import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '$colorWhite',
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 50,
    paddingVertical: 3
  },
  tabContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  tabLabel: {
    color: '$colorMidGrey',
    fontSize: 12,
    fontFamily: '$globalFont'
  },
  tabIcon: {
    color: '$colorMidGrey',
    fontSize: 25,
    height: 25,
    marginTop: 0,
    textAlign: 'center',
    width: 25
  },
});
