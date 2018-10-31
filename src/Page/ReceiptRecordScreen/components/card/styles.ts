import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp, deviceHeight, deviceWidth } from '~utils';
const styles = EStyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginLeft: pxToDp(15),
    marginRight: pxToDp(15),
    marginBottom: pxToDp(15),
    paddingLeft: pxToDp(17),
    paddingRight: pxToDp(15),
    borderRadius: pxToDp(10)
  },
  cardTop: {
    paddingLeft: pxToDp(17),
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40),
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardLogo: {
    width: pxToDp(72),
    height: pxToDp(75)
  },
  investContainer: {
    marginLeft: pxToDp(60),
    marginRight: pxToDp(90)
  },
  moneyNumer: {
    fontSize: pxToDp(36),
    color: '#333',
    fontWeight: 'bold',
    marginBottom: pxToDp(15)
  },
  moneyText: {
    fontSize: pxToDp(24),
    color: '#A9A9A9',
    fontWeight: '500'
  },
  statusIcon: {
    position: 'absolute',
    top: pxToDp(-15),
    right: pxToDp(33)
  },
  cardSeparator: {
    height: 1,
    backgroundColor: '#EAEAEA'
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: pxToDp(25),
    paddingLeft: pxToDp(43)
  },
  introText: {
    color: '#A9A9A9',
    fontSize: pxToDp(24),
    marginBottom: pxToDp(26)
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btnContainer: {
    width: pxToDp(126),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    borderWidth: pxToDp(2),
    borderColor: '#FEAE31',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#FEAE31',
    fontSize: pxToDp(26)
  },
  delBtnContainer: {
    borderColor: '#999999',
    marginRight: pxToDp(30)
  },
  delBtnText: {
    color: '#999999'
  }
});

export default styles;
