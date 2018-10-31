import * as React from 'react';
import Webview from '~components/Webview';
class AboutScreen extends React.Component {
  render() {
    return (
      <Webview
        showHeader={false}
        url={
          'http://36.7.138.114:124/app/rebate/#/' +
          this.props.navigation.getParam('url') +
          '?header=0&tabbar=0'
        }
      />
    );
  }
}

export default AboutScreen;
