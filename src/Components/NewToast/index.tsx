import Toast from 'react-native-root-toast';

export default class NewToast {
  _toast;

  static show(message, position = 'center', backgroundColor="#fff", textColor="#333", duration=1500) {
    switch (position) {
      case 'bottom':
        position = Toast.positions.BOTTOM
        break;
      case 'top':
        position = Toast.positions.TOP
        break;
      default:
        position = Toast.positions.CENTER
    }
    this._toast = Toast.show(message, {
      duration: duration, // toast显示时长
      position: position, // toast位置
      backgroundColor: backgroundColor,
      shadowColor: '#666',
      textColor: textColor,
      shadow: true, // toast是否出现阴影
      animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
      hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
      delay: 0 // toast显示的延时
    });
  }

  static hide() {
    Toast.hide(this._toast);
  }
}
