import * as React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { RootStore } from '~store';

// Custom Components
const BACKGROUND_COLOR = 'transparent';
const COLOR = '#666';
export default () => {
  return (
    <Icon.Button
      name="question"
      backgroundColor={BACKGROUND_COLOR}
      size={30}
      color={COLOR}
      iconStyle={{
        fontWeight: '600'
      }}
      onPress={() => {
        RootStore.toggleMyRedBagModal();
      }}
    />
  );
};
