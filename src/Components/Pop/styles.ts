import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp, deviceWidth, deviceHeight } from '~utils'
const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    left:0,
    top: 0
  },
  mask: {
    // justifyContent:"center",
    backgroundColor:'$maskBgColor',
    opacity:0.8,
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    left:0,
    top: 0
  }
});

export default styles;