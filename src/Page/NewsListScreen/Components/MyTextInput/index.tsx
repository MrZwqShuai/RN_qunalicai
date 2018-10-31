import React, {Component} from 'react';
import {Button, Platform, TextInput, View} from 'react-native';
import { inject, observer } from 'mobx-react'

@inject('NewsListStore')
@observer class MyTextInput extends Component {
  shouldComponentUpdate(nextProps){
    return Platform.OS !== 'ios' || (this.props.value === nextProps.value &&
      (nextProps.defaultValue == undefined || nextProps.defaultValue == '' )) ||
      (this.props.defaultValue === nextProps.defaultValue &&  (nextProps.value == undefined || nextProps.value == '' ));
  }
  componentWillReact() {
    this.props.NewsListStore.isFocus && this._textInput.focus()
  }
  render() {
    return (
        <TextInput isFocus={this.props.NewsListStore.isFocus} ref={ref => this._textInput = ref} {...this.props} />
      )
  }
}

export default MyTextInput;
