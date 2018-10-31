import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { pxToDp } from '~utils';

const style = StyleSheet.create({
  box: {
    width: pxToDp(38),
    height: pxToDp(38)
  }
});

const tabImg = {
  inactive: {
    home: require('./images/home.png'),
    coin: require('./images/coin.png'),
    discover: require('./images/discover.png'),
    memb: require('./images/memb.png'),
    transfer: require('./images/transfer.png')
  },
  active: {
    home: require('./images/active_home.png'),
    coin: require('./images/active_coin.png'),
    discover: require('./images/active_discover.png'),
    memb: require('./images/active_memb.png'),
    transfer: require('./images/active_transfer.png')
  }
};

type Props = {
  type: string;
  isFocused: boolean;
};

export default class TabButton extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    type: PropTypes.string,
    isFocused: PropTypes.bool
  };

  render() {
    const { type, isFocused } = this.props;
    const selectedImg = isFocused ? tabImg.active[type] : tabImg.inactive[type];
    return (
      <Image source={selectedImg} style={style.box} resizeMode="contain" />
    );
  }
}
