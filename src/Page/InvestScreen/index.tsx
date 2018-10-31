import * as React from 'react';
// import { Text, WebView } from 'react-native';
import Webview from '~components/Webview';

class InvestScreen extends React.Component {
  render() {
    return (
      <Webview
        url="http://36.7.138.114:124/app/rebate/#/contacts?reload=1&tabbar=0"
        showHeader={false}
      />
    );
  }
}

export default InvestScreen;
