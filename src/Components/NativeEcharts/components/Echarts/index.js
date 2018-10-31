import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: this.props.containerHeight || this.props.height || 400
        }}>
        <WebView
          ref="chart"
          originWhitelist={['*']}
          scrollEnabled={false}
          scalesPageToFit={true}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400
          }}
          source={
            Platform.OS === 'android'
              ? {
                  uri: 'file:///android_asset/tpl.html'
                }
              : require('./tpl.html')
          }
        />
      </View>
    );
  }
}
