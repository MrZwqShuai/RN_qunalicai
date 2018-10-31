import * as React from 'react';
import {
  // TouchableHighlight,
  // TouchableNativeFeedback,
  TouchableOpacity
  // Platform
} from 'react-native';

// const Touchable1 = props => {
//   return (
//     <TouchableHighlight underlayColor="transparent" {...props}>
//       {props.children}
//     </TouchableHighlight>
//   );
// };

// const Component = Platform.OS === 'ios' ? Touchable1 : TouchableNativeFeedback;
export default props => (
  <TouchableOpacity activeOpacity={0.7} {...props}>
    {props.children}
  </TouchableOpacity>
);
