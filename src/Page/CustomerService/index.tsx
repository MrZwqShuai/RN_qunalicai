import * as React from 'react';
import Webview from '~components/Webview';
import {serviceUrl} from "~utils"
class CustomerServiceScreen extends React.Component {

  render() {
    return (
      <Webview
      url={serviceUrl}
    />
  )
  }
}

export default CustomerServiceScreen;
