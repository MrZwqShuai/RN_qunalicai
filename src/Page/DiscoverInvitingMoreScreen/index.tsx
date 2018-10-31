import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import QNHeader from '~components/QNHeader';
import QNInvitingRecord from '../../Components/QNInvitingRecord/index';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { pxToDp } from '~utils';

@inject('InvitingRecordStore')
@observer
export default class DiscoverInvitingMoreScreen extends React.Component {
  public render() {
    const { AllPage } = toJS(this.props.InvitingRecordStore.invitingRecordList);
    const YQLB = toJS(this.props.InvitingRecordStore.YQLB);
    return (
      <View
        style={{
          height: Dimensions.get('window').height,
          backgroundColor: '#fff'
        }}>
        <QNHeader title="邀请" backIcon />
        <View style={{ height: pxToDp(17), backgroundColor: '#F8F8F8' }} />
        <QNInvitingRecord AllPage={AllPage} invitingRecord={YQLB} />
      </View>
    );
  }
}
