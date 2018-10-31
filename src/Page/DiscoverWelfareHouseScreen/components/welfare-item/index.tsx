import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import Touch from '~components/QNTouch';
import getIcon from '../preload-icon';
import styles from './style';
class WelfareItem extends React.Component {
  constructor(props) {
    super(props);
  }
  PropTypes: {
    noBorder: PropTypes.boolean;
    itemData: PropTypes.Object;
    btnPress: PropTypes.func;
  };
  _renderBtn = data => {
    if (data.status == 0) {
      // 未完成
      return (
        <Touch
          style={styles.btnContainer}
          onPress={() => {
            this.props.btnPress(data);
          }}>
          <Text style={styles.btnText}>
            {data.code === 'SHARE'
              ? '分享'
              : data.code === 'SIGN'
                ? '签到'
                : data.code === 'INVITE'
                  ? '邀请'
                  : '去完成'}
          </Text>
        </Touch>
      );
    } else {
      //已完成
      return (
        <Touch style={[styles.btnContainer, styles.completedBtn]}>
          <Text style={styles.btnText}>已完成</Text>
        </Touch>
      );
    }
  };
  render() {
    const { itemData, noBorder } = this.props;
    return (
      <View style={styles.wrap}>
        <Image style={styles.welfareIcon} source={getIcon(itemData.code)} />
        <View
          style={[styles.welfareContainer, noBorder ? styles.noBorder : '']}>
          <View style={styles.welfareDetail}>
            <Text style={styles.title}>{itemData.desc}</Text>
            <Text style={styles.reward}>
              +{itemData.award}
              {itemData.task_explain}
            </Text>
          </View>
          {this._renderBtn(itemData)}
        </View>
      </View>
    );
  }
}

export default WelfareItem;
