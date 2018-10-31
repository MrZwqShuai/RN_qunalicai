import * as React from 'react';
import { Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Icon, Item } from 'native-base';
import { pxToDp } from '~utils';

const style = EStyleSheet.create({
  modalMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 10
  },
  modalContent: {
    // position: 'absolute',
    // top: 200,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  iconBox: {
    position: 'absolute',
    top: 18,
    right: 15,
    zIndex: 10,
    borderBottomWidth: 0
  },
  closeIcon: {
    width: 30,
    height: 30,
    fontSize: 25,
    color: '#666'
  },
  closeIcon2: {
    width: pxToDp(65),
    height: pxToDp(65)
  },
  iconBox2: {
    marginTop: pxToDp(54),
    borderBottomWidth: 0
  }
});

export default ({
  visible = false,
  closeable = true,
  children,
  onCloseModal,
  containerStyle,
  closeIconType = 1 // 弹窗类型 1 向右 2 向下
}) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={style.modalMask}>
      <View style={[style.modalContent, containerStyle]}>
        {(closeable &&
          closeIconType === 1 && (
            <Item onPress={onCloseModal} style={style.iconBox}>
              <Icon name="ios-close-circle-outline" style={style.closeIcon} />
            </Item>
          )) ||
          null}
        {children}
      </View>
      {closeable &&
        closeIconType === 2 &&
        ((
          <Item onPress={onCloseModal} style={style.iconBox2}>
            <Image
              source={require('./assets/images/icon_close_2.png')}
              style={style.closeIcon2}
            />
          </Item>
        ) ||
          null)}
    </View>
  );
};
