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
    paddingVertical: 3
  },
  tabContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  tabLabel: {
    color: '$colorWhite',
    fontSize: 10,
    fontFamily: '$globalFont'
  },
  tabIcon: {
    color: '$colorWhite',
    fontSize: 30,
    height: 30,
    marginTop: 0,
    textAlign: 'center',
    width: 30
  },
});
