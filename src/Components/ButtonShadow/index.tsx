import * as React from 'react';
import { Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { Text, Button } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp, AUTH_MARGIN } from '~utils';

const WIDTH = Dimensions.get('window').width - AUTH_MARGIN * 2;
const HEIGHT = pxToDp(80);
const RADIUS = pxToDp(40);

const SHADOW_SETTING = {
  width: WIDTH,
  height: HEIGHT,
  color: '#ffe3b8',
  border: 2,
  radius: RADIUS,
  opacity: 0.52,
  x: 0,
  y: 5,
  style: {
    marginTop: pxToDp(50),
    marginLeft: AUTH_MARGIN
  }
};

const SHADOW_SETTING_RED = {
  width: WIDTH,
  height: HEIGHT,
  color: '#FFC5BD',
  border: 2,
  radius: RADIUS,
  opacity: 0.52,
  x: 0,
  y: 5,
  style: {
    marginTop: pxToDp(50),
    marginLeft: AUTH_MARGIN
  }
};

const style = EStyleSheet.create({
  button: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: RADIUS
  },
  activeBg: {
    backgroundColor: '$colorYellow'
  },
  activeBg_Red: {
    backgroundColor: '$colorTheme'
  },
  text: {
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center'
  }
});

/**
 * 接口参数
 * text {String} - 按钮的内容
 * onPress {Function} - 按钮onPress事件函数
 * disabled {Boolean} - 是否禁用按钮
 * type {String} - 切换按钮颜色
 */
export default ({ text, onPress, disabled = false, type }) => {
  const activeBg = type === 'red' ? style.activeBg_Red : style.activeBg
  return  (
      <BoxShadow
      setting={Object.assign(
        {},
        type === 'red' ? SHADOW_SETTING_RED : SHADOW_SETTING,
        disabled
          ? {
              color: '#b5b5b5'
            }
          : {}
      )}>
      <Button
        block
        style={[style.button, !disabled ? activeBg : {}]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={style.text}>{text}</Text>
      </Button>
    </BoxShadow>
    )
};
