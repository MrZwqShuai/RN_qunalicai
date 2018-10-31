import * as React from 'react';
import { View } from 'react-native';
import LSWebView from '~components/LSWebView';

export default class extends React.Component {
  render() {
    const uri = 'https://www.baidu.com';
    return <LSWebView uri={uri} />;
  }
}
