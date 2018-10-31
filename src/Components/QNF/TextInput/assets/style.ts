import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const codeStyle = {
  fontSize: pxToDp(28),
  fontWeight: 'bold'
};

const leftMargin = {
  marginLeft: pxToDp(20)
};

export default EStyleSheet.create({
  container: {
    width: pxToDp(656),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgb(221,221,221)',
    borderBottomWidth: pxToDp(1),
    '@media ios': {
      paddingBottom: pxToDp(30)
    },
    '@media android': {
      paddingBottom: 0
    }
  },
  leftBox: {
    width: pxToDp(40)
  },
  rightBox: {
    height: pxToDp(40),
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBox: {
    width: pxToDp(40),
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(20),
    color: 'rgb(51,51,51)',
    fontSize: pxToDp(34),
    '@media ios': {
      fontWeight: '500'
    },
    '@media android': {
      fontWeight: '300'
    }
  },
  closeIcon: {
    width: pxToDp(35),
    height: pxToDp(35)
  },
  // verifyCode
  codeBox: {
    width: pxToDp(200),
    justifyContent: 'center',
    alignItems: 'flex-end',
    ...leftMargin
  },
  inActiveText: {
    ...codeStyle,
    height: pxToDp(70),
    lineHeight: pxToDp(70),
    color: 'rgb(255,173,44)'
  },
  activeText: {
    ...codeStyle,
    color: 'rgb(170,179,192)'
  },
  secureBox: {
    ...leftMargin
    // marginRight: pxToDp(15)
  },
  closeIconContainer: {
    width: pxToDp(45),
    height: pxToDp(45),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
