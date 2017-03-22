import { Platform } from 'react-native';
import './GlobalStyles.js';

const LABEL_COLOR = '#000000';
const INPUT_COLOR = '#000000';
const ERROR_COLOR = '#a94442';
const HELP_COLOR = '#999999';
const BORDER_COLOR = '#c3c3a9';
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#eeeeee';
const FONT_SIZE = 16;
const FONT_WEIGHT = '500';

const stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textboxView: {
    normal: {
      marginBottom: 5
    },
    error: {
      marginBottom: 5
    },
    notEditable: {
      marginBottom: 5
    }
  },
  textbox: {
    normal: {
      backgroundColor: '#fff',
      borderColor: BORDER_COLOR,
      borderRadius: 5,
      borderWidth: 1,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 42,
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7,
    },
    // the style applied when a validation error occours
    error: {
      backgroundColor: '#fff',
      borderColor: ERROR_COLOR,
      borderRadius: 5,
      borderWidth: 1,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 42,
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7
    },
    // the style applied when the textbox is not editable
    notEditable: {
      borderColor: BORDER_COLOR,
      borderRadius: 5,
      borderWidth: 1,
      fontSize: FONT_SIZE,
      height: 42,
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  pickerContainer: {
    normal: {},
    error: {},
    open: {}
  },
  select: {
    normal: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: BORDER_COLOR,
      borderWidth: 1
    },
    error: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: ERROR_COLOR,
      borderWidth: 1
    }
  },
  pickerTouchable: {
    normal: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      height: 42,
      marginBottom: 5,
      overflow: 'hidden',
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7,
    },
    error: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      height: 42,
      marginBottom: 5,
      overflow: 'hidden',
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7,
    },
    active: {}
  },
  pickerValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      lineHeight: 26
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      lineHeight: 26
    }
  },
  datepicker: {
    normal: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: BORDER_COLOR,
      borderWidth: 1
    },
    // the style applied when a validation error occours
    error: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: ERROR_COLOR,
      borderWidth: 1
    }
  },
  dateTouchable: {
    normal: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      height: 42,
      marginBottom: 5,
      overflow: 'hidden',
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7,
    },
    error: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      height: 42,
      marginBottom: 5,
      overflow: 'hidden',
      paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
      paddingHorizontal: 7,
    }
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      lineHeight: 26
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      lineHeight: 26
    }
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Oswald Regular',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = stylesheet;
