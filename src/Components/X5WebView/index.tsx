import React, { Component } from 'react';
import { requireNativeComponent} from 'react-native';

let X5WebViewComponent = requireNativeComponent('X5WebView', X5WebView);

export default class X5WebView extends Component {
  render() {
    return (
      <X5WebViewComponent {...this.props} />
    );
  }
}