import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  Animated,
  ViewPropTypes
} from 'react-native';
import Toast from './Toast';
import {
  toastDefaultTheme,
  toastDangerTheme,
  toastSuccessTheme,
  toastWarningTheme
} from './theme/toast';

export default class ToastBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toastVisible: true,
      fadeAnim: new Animated.Value(1)
    };
  }

  static toastInstance;
  static show(config) {
    this.toastInstance.showToast(config);
  }
  getToastStyle() {
    return {
      position: 'absolute',
      zIndex: 99999,
      opacity: 1,
      width: '100%',
      top:
        this.state.position === 'top'
          ? this.getTop()
          : this.state.position === 'center'
            ? this.getCenter()
            : undefined,
      bottom: this.state.position === 'bottom' ? 0 : undefined
    };
  }
  getTop() {
    if (Platform.OS === 'ios') {
      return 30;
    } else {
      return 10;
    }
  }
  getCenter() {
    return Dimensions.get('window').height / 2;
  }
  setThemeByType(type) {
    let toastTheme;
    switch (type) {
      case 'success':
        toastTheme = toastSuccessTheme;
        break;
      case 'danger':
        toastTheme = toastDangerTheme;
        break;
      case 'warning':
        toastTheme = toastWarningTheme;
        break;
      default:
        toastTheme = toastDefaultTheme;
    }
    return toastTheme;
  }
  showToast(config) {
    this.setState({
      toastVisible: true,
      message: config.message,
      position: config.position ? config.position : 'center',
      style: config.style ? config.style : this.setThemeByType(config.type),
      messageStyle: config.messageStyle
    });
    // 如果当前有toast显示 切断显示时间以避免影响当前toast
    this.clearPrevTimeout();
    const duration = config.duration > 0 ? config.duration : 1500;
    this.closeTimeout = setTimeout(() => {
      this.closeToast();
    }, duration);
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 200
    }).start();
    // debugger;
  }
  closeToast() {
    clearTimeout(this.closeTimeout);
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 200
    }).start(this.closeModal.bind(this));
  }
  closeModal() {
    this.setState({
      toastVisible: false
    });
  }
  clearPrevTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }
  render() {
    if (this.state.toastVisible) {
      return (
        <Animated.View style={this.getToastStyle()}>
          <Toast style={this.state.style}>
            <Text style={this.state.messageStyle}>{this.state.message}</Text>
          </Toast>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}
