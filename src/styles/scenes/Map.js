import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  map: {
    backgroundColor: '$colorWhite',
    flex: 1,
    margin: 0,
    borderWidth: 0,
    flexDirection: 'column'
  },
  findMe: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});

