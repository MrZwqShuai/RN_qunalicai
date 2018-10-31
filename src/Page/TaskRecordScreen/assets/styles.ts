import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const styles = EStyleSheet.create({
  wrap: {
    backgroundColor: '#F8F8F8',
    flex: 1
  },
  recordList: {
    flex: 1
  },
  dateWrapper: {
    height: pxToDp(96),
    lineHeight: pxToDp(96),
    paddingLeft: pxToDp(32),
    color: '#666666',
    fontSize: pxToDp(28)
  },
  recordContainer: {
    paddingHorizontal: pxToDp(32),
    backgroundColor: '#fff'
  },
  recordDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: pxToDp(40),
    borderBottomColor: '#E8E6E6',
    borderBottomWidth: pxToDp(1)
  },
  noBorder: {
    borderBottomWidth: 0
  },
  recordTitle: {
    color: '#333',
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    marginBottom: pxToDp(6)
  },
  recordTime: {
    fontWeight: '500',
    fontSize: pxToDp(26),
    color: '#999999'
  },
  recordRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  recordMoney: {
    fontSize: pxToDp(34),
    color: '#FFAD2C'
  },
  redfont: {
    color: '#F76757'
  },
  redFont: {
    color: '#F76757'
  },
  footer: {
    height: pxToDp(43)
  },
  noMore: {
    marginTop: pxToDp(15),
    fontSize: pxToDp(24),
    height: pxToDp(60),
    textAlign: 'center'
  }
});

export default styles;
