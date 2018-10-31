import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import styles from './styles';

@inject('CapticalRecordStore')
@observer
export default class RecordList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { itemData, noBorder } = this.props;
    return (
      <View style={styles.listItemContainer}>
        <View style={[styles.listItem, noBorder ? styles.noBorder : '']}>
          <View style={styles.listInfo}>
            <Text style={styles.listType}>{itemData.recordType}</Text>
            <Text style={styles.listTime}>{itemData.recordTimeString}</Text>
          </View>
          <Text style={styles.amountText}>
            {itemData.recordType === '提现' ? '-' : '+'}
            {itemData.moneyAccount}
          </Text>
        </View>
      </View>
    );
  }
}
