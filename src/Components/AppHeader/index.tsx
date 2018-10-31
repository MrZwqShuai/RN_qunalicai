import * as React from 'react';
import { View, Platform } from 'react-native';
import { isIphoneX } from '~utils';

// export default ({ navigation }) => {
//   return (
//     (Platform.OS === 'ios' &&
//       navigation.state.routeName !== 'NewGuideLines' &&
//       navigation.state.routeName !== 'FillReceiptForm' &&
//       navigation.state.routeName !== 'ManageFinancialDetail' && (
//         <View
//           style={{
//             height: 20 + (isIphoneX() ? 20 : 0),
//             backgroundColor: '#fff'
//           }}
//         />
//       )) ||
//     null
//   );
// };
export default () => {
  if (Platform.OS === 'android') {
    return null;
  }
  return (
    <View
      style={{
        height: 20 + (isIphoneX() ? 20 : 0),
        backgroundColor: '#fff'
      }}
    />
  );
};
