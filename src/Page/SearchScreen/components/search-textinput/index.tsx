import * as React from 'react';
import {Platform, TextInput} from 'react-native';

class SearchTextInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { value, defaultValue } = this.props;
    return Platform.OS !== 'ios'
    || (value === nextProps.value && !nextProps.defaultValue)
    || (defaultValue === nextProps.defaultValue && !nextProps.value);
  }

  render() {
    return <TextInput {...this.props} style={{ height: 40, padding: 0 }} />;
  }
};

export default SearchTextInput;