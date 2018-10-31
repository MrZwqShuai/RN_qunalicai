import * as React from 'react';
import Touch from '~components/QNTouch';
import Button from '~components/QNYButton';
import { View, Text, Modal } from 'react-native';
import styles from './assets/style';
class QNAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      confirmText: '',
      cancelText: '',
      content: '',
      isConfirm: false
    };
  }
  callBack = function() {};
  hide = () => {
    this.setState({
      show: false
    });
  };
  init = params => {
    this.setState({
      confirmText: params.confirmText ? params.confirmText : '确定',
      cancelText: params.cancleText ? params.cancleText : '取消',
      content: params.content ? params.content : '确定进行此操作吗？',
      isConfirm: params.isConfirm ? params.isConfirm : false,
      show: true
    });
    this.callBack = () => {
      this.hide();
      if (params.handleConfirm) {
        params.handleConfirm();
      }
    };
  };
  render() {
    const { content, cancelText, confirmText, show, isConfirm } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={() => this.hide()}>
        <View style={styles.wrap}>
          <View style={styles.container}>
            <View style={styles.descContainer}>
              <Text style={styles.descText}>{content}</Text>
            </View>
            <View style={styles.btnWrapper}>
              {isConfirm ? (
                <Touch style={styles.btnContainer} onPress={() => this.hide()}>
                  <Text style={styles.btnText}>{cancelText}</Text>
                </Touch>
              ) : null}
              <Touch
                style={[styles.btnContainer, styles.confirmBtnContainer]}
                onPress={() => this.callBack()}>
                <Text style={[styles.btnText, styles.confirmBtn]}>
                  {confirmText}
                </Text>
              </Touch>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default QNAlert;
