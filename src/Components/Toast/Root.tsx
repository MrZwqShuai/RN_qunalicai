import React, { Component } from "react";
import { View, ViewPropTypes } from "react-native";
import ToastBox from './ToastBox' 

export default class Root extends Component {
  render() {
    return (
      <View>
        {this.props.children}
        <ToastBox
        ref={c => {
          if(c) ToastBox.toastInstance = c
        }}
        />
      </View>
    )
  }
}