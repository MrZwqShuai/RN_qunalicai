import * as React from 'react';
import { Text, View } from 'react-native';
import {
  textDefaultStyle,
  activeDefaultTextStyle
} from '~components/QNTab/shared/common.style';

export default class QNTab extends React.Component {
  static defaultProps = {
    textStyle: textDefaultStyle,
    activeTextStyle: activeDefaultTextStyle
  };

  public render() {
    return (
      <View ref={ref => (this._ref = ref)} {...this.props} style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}
