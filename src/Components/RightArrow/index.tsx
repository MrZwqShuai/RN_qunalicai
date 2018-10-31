import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { pxToDp } from '~utils';

export default props => (
  <Image
    source={require('./assets/images/icon_arrow_right.png')}
    style={{
      width: pxToDp(17),
      height: pxToDp(27),
      marginLeft: pxToDp(15)
    }}
  />
);
