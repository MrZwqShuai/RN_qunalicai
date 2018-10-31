import * as React from 'react';
// import { Button } from 'native-base';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { pxToDp } from '~utils';

const style = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    height: pxToDp(88),
    borderRadius: pxToDp(10)
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: pxToDp(30)
  },
  /**
   * 通过修改背景色来避免直接改变opacity无效的BUG
   */
  disabled: {
    backgroundColor: 'rgba(255,173,44, .5)'
  },
  abled: {
    backgroundColor: 'rgb(255,173,44)'
  }
});

export default ({ disabled, title, style: pstyle, onPress }) => (
  <TouchableOpacity
    style={[
      style.buttonContainer,
      pstyle,
      disabled ? style.disabled : style.abled
    ]}
    onPress={disabled ? null : onPress}
    activeOpacity={disabled ? 1 : 0.7}>
    <Text style={style.buttonText}>{title}</Text>
  </TouchableOpacity>
);
