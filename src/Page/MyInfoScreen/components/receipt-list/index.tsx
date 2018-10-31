import * as React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import getIcon from '../preload-icon';
import Tocuh from '~components/QNTouch';
import styles from './style';
@inject('MyInfoStore')
@observer
class ReceiptList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.receiptContainer}>
        {this.props.MyInfoStore.receiptList.map((item, index) => {
          return (
            <Tocuh
              style={styles.receiptItem}
              key={index}
              onPress={() => this.props.navClick(item.link)}>
              <ImageBackground
                source={getIcon(item.bgImg)}
                style={styles.receiptBg}>
                <Text style={styles.receiptTitle}>{item.title}</Text>
                <Text style={styles.receiptDesc}>{item.desc}</Text>
              </ImageBackground>
            </Tocuh>
          );
        })}
      </View>
    );
  }
}
export default withNavigation(ReceiptList);
