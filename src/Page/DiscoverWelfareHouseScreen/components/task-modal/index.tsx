import * as React from 'react';
import { View, Text, Modal } from 'react-native';
import { PropTypes } from 'prop-types';
import Touch from '~components/QNTouch';
import styles from './style';
class TaskModal extends React.Component {
  constructor(props) {
    super(props);
  }
  PropTypes: {
    onPress: PropTypes.function;
  };
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={this.props.onPress}>
        <View style={styles.wrap}>
          <View style={styles.container}>
            <Text style={styles.title}>任务攻略</Text>
            <Text style={styles.desc}>
              1、完成任务获得金豆，每100点金豆可以让摇钱树产生一个红包，领取红包后金豆清零，重新通过任务获取。
            </Text>
            <Text style={styles.desc}>
              2、可以每天完成任务并领取任务奖励，多做任务可以快速的积累金豆。
            </Text>
            <Text style={styles.desc}>
              3、不得通过作弊手段刷任务奖励，否则将作封号处理。
            </Text>
            <Touch style={styles.btnContainer} onPress={this.props.onPress}>
              <Text style={styles.btnText}>明白了</Text>
            </Touch>
          </View>
        </View>
      </Modal>
    );
  }
}

export default TaskModal;
