import { AppRegistry, YellowBox } from 'react-native';
import AppManifest from './src/AppManifest';

// Ignore isMounted tip.
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

/**
 * userId取出来之后再启动项目
 */
AppRegistry.registerComponent('RN_qunalicai', () => AppManifest);
