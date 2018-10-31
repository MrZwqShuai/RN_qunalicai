import { Platform, WebView } from 'react-native';
import IOSWebView from './components/ios-webview';

export default (Platform.OS === 'ios' ? IOSWebView : WebView);
