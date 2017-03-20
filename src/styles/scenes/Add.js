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
  formWrapper: {
    backgroundColor: '$colorBeige'
  },
  formFieldset: {
    borderBottomColor: '$borderColor',
    borderBottomWidth: 1,
    padding: 20
  },
  formImageUpload: {
    padding: 20
  },
  formSubmit: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20
  },
  // formRow: {
  //   borderBottomColor: '$borderColor',
  //   borderBottomWidth: 1,
  // },
  addSceneContainer: {
    backgroundColor: '$colorBeige',
    flex: 1,
    justifyContent: 'center',
  },
  addScrollContainer: {
    backgroundColor: '$colorBeige',
    flex: 1
  },
  addSceneTabBarContainer: {
    backgroundColor: '$colorWhite',
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0
  },
  addSceneTabBarButton: {
    backgroundColor: '$colorWhite',
    borderBottomWidth: 3,
    borderBottomColor: '$colorWhite',
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  addSceneTabBarButtonActive: {
    borderBottomColor: '$colorBrightBlue'
  },
  addSceneTabBarText: {
    color: '$colorDarkGrey',
    fontFamily: '$globalFontHeader',
    textAlign: 'center'
  },
  addSceneTabBarTextActive: {
    color: '$colorBrightBlue'
  },
  addSceneLatLngContainer: {
    backgroundColor: '$colorBeige',
    borderBottomColor: '$lineColor',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addSceneLatLngBlock: {
    flex: 1,
    padding: 20
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
    borderBottomWidth: 1
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
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  observationDataCol: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 150
  },
  // Collapsible sections
  formCollapsibleContainer: {
    paddingTop: 20
  },
  formCollapsibleButton: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flex: 1,
    justifyContent: 'flex-start'
  },
  formCollapsibleButtonIcon: {
    borderRadius: 15,
    borderWidth: 1,
    fontFamily: '$globalFontHeader',
    fontSize: 24,
    height: 30,
    lineHeight: 32,
    marginRight: 10,
    textAlign: 'center',
    width: 30
  },
  formCollapsibleButtonActive: {
    lineHeight: 29
  },
  formCollapsibleButtonText: {
    fontFamily: '$globalFontHeader',
    fontSize: 24,
    lineHeight: 30
  },
  // Image upload
  formImageUploadContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  formImageUploadPlaceHolder: {
    backgroundColor: '$colorLightGrey',
    borderRadius: 10,
    height: 100,
    width: 100
  },
  formImageUploadButtonContainer: {
    padding: 20
  },
  formImageUploadButton: {
    borderColor: '$colorBrightBlue',
    borderRadius: 5,
    borderWidth: 1,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  },
  formImageUploadButtonText: {
    color: '$colorBrightBlue',
    fontFamily: '$globalFont',
    fontWeight: 'bold'
  }
  // Custom elements
  // datePickerView: {
  //   backgroundColor: '$colorWhite'
  // }
});

