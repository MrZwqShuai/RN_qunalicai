import * as React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { withNavigation } from 'react-navigation';
import { Image, TouchableOpacity } from 'react-native';
import { pxToDp } from '~utils';
import { throttle } from '../../Config/utils';
// Custom Components
const BACKGROUND_COLOR = 'transparent';
const COLOR = '#000';
export default withNavigation(({ navigation, onPress, backPath }) => {
  function onHandlePress() {
    if (onPress) {
      onPress();
    } else {
      if (backPath) {
        navigation.navigate(backPath);
      } else {
        navigation.goBack(null);
      }
    }
  }
  return (
    <TouchableOpacity
      onPress={() => {
        throttle(onHandlePress, 500)
      }}
      style={{
        width: pxToDp(60),
        height: pxToDp(120),
        justifyContent: 'center',
      }}>
      <Image
        source={require('./assets/images/hl_arrow-left-white.png')}
        style={{
          width: pxToDp(19),
          height: pxToDp(34)
        }}
      />
    </TouchableOpacity>
  );
});
