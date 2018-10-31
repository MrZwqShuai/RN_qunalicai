import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const comFD = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};

export default EStyleSheet.create({
  comFD,
  listItem: {
    ...comFD,
    height: pxToDp(100),
    justifyContent: 'space-between'
  },
  wrapper: {
    paddingLeft: pxToDp(52),
    paddingRight: pxToDp(32),
    paddingTop: pxToDp(40),
    backgroundColor: '$white'
  },
  switchContainer: {
    width: pxToDp(78),
    height: pxToDp(45)
    // fontSize: pxToDp(30)
  },
  listItemTitle: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: 'rgb(51,51,51)'
  },
  rightText: {
    color: 'rgb(86,83,83)',
    fontSize: pxToDp(26),
    fontWeight: '500'
  },
  rightIcon: {
    width: pxToDp(17),
    height: pxToDp(27),
    marginLeft: pxToDp(16)
  },
  buttonContainer: {
    height: pxToDp(88),
    marginTop: pxToDp(426),
    marginHorizontal: pxToDp(30),
    backgroundColor: 'rgb(255,173,44)',
    borderRadius: pxToDp(10)
  },
  buttonText: {
    textAlign: 'center',
    color: '$white',
    fontWeight: 'bold',
    fontSize: pxToDp(30)
  }
});
