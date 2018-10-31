import * as React from 'react';
import { TouchableOpacity } from 'react-native';

export default props => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.6}>
      {props.children}
    </TouchableOpacity>
  );
};
