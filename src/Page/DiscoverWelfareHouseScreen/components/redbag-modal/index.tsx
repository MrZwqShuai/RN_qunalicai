import * as React from 'react';
import { View, Text, Image, Modal, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import Touch from '~components/QNTouch';
import styles from './style';
@inject('WelfareCenterStore')
@observer
class RedBagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOpenModal: true
    };
  }
  _handleOpenPress = () => {
    this.props.WelfareCenterStore.openRedBag();
    this.setState({
      showOpenModal: false
    });
  };
  _handelSavePress = () => {
    this.props.WelfareCenterStore.getCurrentBeans();
  };
  _renderOpenModal = () => {
    return (
      <Touch onPress={this._handleOpenPress}>
        <ImageBackground
          source={require('../../assets/images/openRedBag.png')}
          style={styles.openRedBag}
        />
      </Touch>
    );
  };
  _renderSaveModal = () => {
    return (
      <ImageBackground
        source={require('../../assets/images/saveRedBag.png')}
        style={styles.saveRedBag}>
        <View style={styles.redBagDetail}>
          <Text style={styles.money}>
            {this.props.WelfareCenterStore.redBagMoney}
          </Text>
          <Text style={styles.moneyText}>元</Text>
        </View>
        <Touch style={styles.saveBtn} onPress={this._handelSavePress} />
      </ImageBackground>
    );
  };
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          this.props.navigation.goBack(null);
        }}>
        <View style={styles.wrap}>
          {this.state.showOpenModal
            ? this._renderOpenModal()
            : this._renderSaveModal()}
        </View>
      </Modal>
    );
  }
}

export default withNavigation(RedBagModal);
