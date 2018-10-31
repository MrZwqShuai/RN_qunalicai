import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const styles = EStyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  container: {
    paddingHorizontal: pxToDp(15),
    paddingVertical: pxToDp(15)
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: pxToDp(10),
    marginBottom: pxToDp(15),
    padding: pxToDp(32)
  },
  title: {
    marginBottom: pxToDp(20),
    fontSize: pxToDp(32),
    fontWeight: 'bold',
    color: '#333'
  },
  infoItem: {
    flexDirection: 'row'
  },
  infoLeft: {
    width: pxToDp(208),
    color: '#666666',
    fontSize: pxToDp(28),
    fontWeight: '500',
    lineHeight: pxToDp(62)
  },
  infoRight: {
    color: '#333',
    fontSize: pxToDp(28),
    fontWeight: '500',
    lineHeight: pxToDp(62)
  }
});

export default styles;
