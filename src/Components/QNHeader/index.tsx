import * as React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import estyle from './assets/style';
import { pxToDp } from '~utils';

type Props = {
  border: boolean;
  backIcon: boolean;
  HeaderRight: any;
  title: string;
  onGoBack: Function;
  navigation: any;
  arrowSpace: boolean;
};

class QNHeader extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    backIcon: false,
    // HeaderRight: null,
    arrowSpace: true
  };

  static propTypes = {
    border: PropTypes.bool,
    backIcon: PropTypes.bool,
    HeaderRight: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.object
    ]),
    title: PropTypes.string,
    onGoBack: PropTypes.func,
    arrowSpace: PropTypes.bool
  };

  _handleGoBack = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const {
      props: { backIcon, HeaderRight, title, onGoBack, arrowSpace },
      _handleGoBack
    } = this;
    return (
      <View style={[estyle.container]} {...this.props}>
        <View style={estyle.left}>
          {(backIcon && (
            <TouchableOpacity
              onPress={() => {
                if (onGoBack) {
                  return onGoBack();
                }
                _handleGoBack();
              }}
              style={[
                estyle.arrow,
                arrowSpace ? { paddingRight: pxToDp(30) } : null
              ]}>
              <Image source={require('./assets/images/icon_arrow_left.png')} />
            </TouchableOpacity>
          )) ||
            null}
          <Text style={estyle.title}>{title}</Text>
        </View>
        {(HeaderRight && (
          <View style={estyle.right}>
            {typeof HeaderRight === 'function' ? HeaderRight() : HeaderRight}
          </View>
        )) ||
          null}
      </View>
    );
  }
}

export default withNavigation(QNHeader);
