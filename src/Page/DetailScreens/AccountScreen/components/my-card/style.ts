import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const fdr = {
  flexDirection: 'row'
};

export default EStyleSheet.create({
  fdr,
  leftText: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: 'rgb(51,51,51)'
  },
  textInput: {
    flex: 1,
    marginLeft: pxToDp(100),
    textAlign: 'right',
    padding: 0,
    fontSize: pxToDp(26)
  },
  bankContainer: {
    ...fdr,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  //
  tipContainer: {
    marginHorizontal: pxToDp(50),
    marginTop: pxToDp(47)
  },
  tipText: {
    fontSize: pxToDp(24),
    fontWeight: '500',
    color: 'rgb(153,153,153)',
    lineHeight: pxToDp(40),
    marginBottom: pxToDp(40)
  },
  //
  buttonContainer: {
    height: pxToDp(88),
    marginTop: pxToDp(195),
    marginHorizontal: pxToDp(30),
    backgroundColor: 'rgb(255,173,44)',
    borderRadius: pxToDp(10)
  },
  buttonText: {
    textAlign: 'center',
    color: '$white',
    fontWeight: 'bold',
    fontSize: pxToDp(30)
  },
  defaultText: {
    fontSize: pxToDp(26),
    color: '#999'
  },
  submitContainer: {
    marginHorizontal: pxToDp(30)
  },
  uneditable: {}
});
