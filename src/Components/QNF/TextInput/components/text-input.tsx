import * as React from 'react';
import { Platform, TextInput } from 'react-native';

class MyTextInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    /**
     * 解决textInput不能输入中文和不能消除的问题
     */
    return (
      Platform.OS !== 'ios' ||
      (this.props.value === nextProps.value &&
        (nextProps.defaultValue == undefined ||
          nextProps.defaultValue == '')) ||
      (this.props.defaultValue === nextProps.defaultValue &&
        (nextProps.value == undefined || nextProps.value == ''))
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('np:', nextProps.defaultValue);
  //   if (nextProps.defaultValue === '') {
  //     this.refs['textEle'].setNativeProps({ text: '' });
  //     console.log('in');
  //   }
  // }

  render() {
    return <TextInput {...this.props} ref="textEle" />;
  }
}

export default MyTextInput;
