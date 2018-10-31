import { Platform } from 'react-native';
import { Toast } from 'native-base';

const DEFAULT_CONFIG = {
  buttonText: '确定',
  position: 'top',
  duration: 5000
};

const PLATFORM_CONFIG =
  Platform.OS === 'android'
    ? {
        style: {
          top: 20,
          paddingVertical: 0,
          height: 80
        },
        textStyle: {
          paddingTop: 0,
          paddingBottom: 20,
          height: 50
        }
      }
    : {};

class QNToast {
  static success(text) {
    Toast.show({
      text,
      type: 'success',
      ...DEFAULT_CONFIG,
      ...PLATFORM_CONFIG
    });
  }
  static warning(text) {
    Toast.show({
      text,
      type: 'warning',
      ...DEFAULT_CONFIG,
      ...PLATFORM_CONFIG
    });
  }
  static error(text) {
    Toast.show({
      text,
      type: 'error',
      ...DEFAULT_CONFIG,
      ...PLATFORM_CONFIG
    });
  }
}
export default QNToast;
