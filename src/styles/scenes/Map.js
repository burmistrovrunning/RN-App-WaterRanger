import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  map: {
    backgroundColor: '$colorBeige',
    flex: 1,
    margin: 0,
    borderWidth: 0,
    flexDirection: 'column'
  },
  findMe: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10
  }
});

