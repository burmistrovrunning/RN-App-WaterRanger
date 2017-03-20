import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#c1c1b3',
    borderTopColor: '$lineColor',
    borderTopWidth: 0,
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
    color: '$colorWhite',
    fontSize: 12,
    fontFamily: '$globalFont'
  },
  tabIcon: {
    color: '$colorWhite',
    fontSize: 25,
    height: 25,
    marginTop: 0,
    textAlign: 'center',
    width: 25
  },
});
