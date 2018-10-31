import React, { Component } from "react";
import { View, Text } from "react-native";


export default class Toast extends Component {
  render() {
    return <View ref={c => (this._root = c)} {...this.props} />;
  }
}