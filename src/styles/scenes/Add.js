import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  waitingContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addSceneContainer: {
    backgroundColor: '$colorWhite',
    flex: 1,
    justifyContent: 'center',
  },
  addScrollContainer: {
    flex: 1
  },
  addSceneTabBarContainer: {
    backgroundColor: '$colorLightGrey',
    borderBottomColor: '$lineColor',
    borderBottomWidth: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  addSceneTabBarButton: {
    backgroundColor: '$colorMidGrey',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 5
  },
  addSceneTabBarButtonActive: {
    backgroundColor: '$colorBrightBlue'
  },
  addSceneTabBarText: {
    color: '$colorDarkGrey',
    textAlign: 'center'
  },
  addSceneTabBarTextActive: {
    color: '$colorWhite'
  },
  addSceneLatLngContainer: {
    borderBottomColor: '$lineColor',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  addSceneLatLngBlock: {
    flex: 1
  },
  addSceneSmallTitle: {
    color: '$colorMidGrey',
    fontSize: 12
  },
  // Offline page
  offlineFormsHeader: {
    marginBottom: 0,
    padding: 10
  },
  offlineFormsContainer: {
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    flex: 1
  },
  offlineFormsFooter: {
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20
  },
  offlineListRowContainer: {
    padding: 20
  },
  offlineListTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  offlineListDate: {
    color: '$colorMidGrey',
    fontSize: 12
  },
  listSeparator: {
    backgroundColor: '$lineColor',
    height: 1
  },
  groupSelectContainer: {
    borderBottomColor: '$lineColor',
    borderBottomWidth: 1,
    padding: 20
  },
  groupItem: {
    fontSize: 15,
    marginLeft: 0,
    fontFamily: '$globalFont',
    marginBottom: 5
  },
  // Observation data layout
  headingLabel: {
    fontFamily: '$globalFont',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left'
  },
  observationDataContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  observationDataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  observationDataCol: {
    backgroundColor: '$colorLightGrey',
    borderRadius: 5,
    maxHeight: 125,
    marginBottom: 10,
    padding: 15,
    width: '43%'
  },
  // Image upload
  imageUploadContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20
  },
  uploadImage: {
    backgroundColor: '$colorLightGrey',
    borderRadius: 10,
    height: 100,
    width: 100
  },
  imageButtonContainer: {
    padding: 20
  },
  imageButton: {
    borderColor: '$colorBrightBlue',
    borderRadius: 5,
    borderWidth: 1,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  },
  imageButtonText: {
    color: '$colorBrightBlue',
    fontFamily: '$globalFont',
    fontWeight: 'bold'
  }
});

