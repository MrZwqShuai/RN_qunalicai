import * as React from 'react';
// import { Text, WebView } from 'react-native';
import Webview from '~components/Webview';

class RegisterActivityScreen extends React.Component {

  static navigationOptions = (({navigate}) => {
    return {
      header: null,
    }
  })

  render() {
    return (
      <Webview url={'https://tg.tuandai.com/phone/reg0520_new/index.aspx?tdfrom=SEOLC9843d2012-0713'} />
    );
  }
}

export default RegisterActivityScreen;
