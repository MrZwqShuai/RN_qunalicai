import * as React from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import QNRefreshModel from '~components/QNRefreshModel';
import { inject, observer } from 'mobx-react';

interface InvitingRecord {
  ID: number;
  RegistrationTime: string;
  award: string;
  investState: string;
}
type Props = {
  invitingRecord: InvitingRecord[];
  AllPage: number;
}

@inject('InvitingRecordStore')
@observer
export default class QNInvitingRecord extends React.Component<Props> {

  page: number = 1;

  _keyExtractor = (item, index) => String(index);

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.recordListContainer}>
        <View style={[styles.recordListHeader, { backgroundColor: '#F9F9F9', }]}>
          <Text style={styles.listHeaderItem}>邀请时间</Text>
          <Text style={styles.listHeaderItem}>手机号</Text>
          <Text style={styles.listHeaderItem}>投资记录</Text>
          <Text style={styles.listHeaderItem}>奖励红包</Text>
        </View>
        <View style={styles.recordListContent}>
          {this.renderRecordListContent()}
        </View>
      </View>
    )
  }

  private renderRecordListContent() {
    console.log(this.props.invitingRecord, this.props.AllPage, 'this.props.invitingRecord');
    const invitingListLen = this.props.invitingRecord.length;
    const AllPage = this.props.AllPage;
    if (invitingListLen > 0) {
      if (invitingListLen > 5) {
        return (
          <View style={{height: pxToDp(900)}}>
            <QNRefreshModel
              list
              dataSource={this.props.invitingRecord}
              renderFooter={this._renderFooter}
              loadMore={() => {
                return this._loadMore()
              }}
              heightForIndexPath={pxToDp(50)}
              renderRow={this._renderRow}
              isLast={this.page >= AllPage}
              onRefresh={() => {
                this._refresh();
              }}
            />
          </View>
        )
      } else {
        return (
          <FlatList
            keyExtractor={this._keyExtractor}
            data={this.props.invitingRecord}
            alwaysBounceHorizontal={false}
            renderItem={({ item }) => {
              return this._renderRow(item)
            }}
          />
        )
      }
    } else {
      return (
        <ImageBackground
          style={styles.emptyStyle}
          source={require('../QNRefreshModel/assets/images/empty2.png')}
        >
          <Text style={styles.emptyTxt}>您还没有邀请好友哦!</Text>
        </ImageBackground>
      )
    }
  }


  _renderRow(item) {
    return (
      <View style={styles.recordListHeader} >
        <Text style={styles.listHeaderItem}>{item.RegistrationTime}</Text>
        <Text style={styles.listHeaderItem}>{item.PhoneNumber}</Text>
        <Text style={styles.listHeaderItem}>{item.investState}</Text>
        <Text style={styles.listHeaderItem}>{item.award}</Text>
      </View>
    )
  }

  _loadMore = () => {
    this.page++;
    console.log(this.page, '当前页数');
    return this.getInvitingRecordList(this.page);
  };

  _renderFooter = () => {
    return (
      <View style={styles.moreWrapper}>
        <View style={styles.moreLine} />
        <Text style={styles.moreText}>天呐，你已经看到底部啦！</Text>
        <View style={styles.moreLine} />
      </View>
    );
  }

  _refresh() {
    this.page = 1;
    this.props.InvitingRecordStore.setRefresh(true);
    return this.getInvitingRecordList();
  }

  getInvitingRecordList(page: number = 1) {
    this.props.InvitingRecordStore.getInvitingRecordList({
      page: this.page,
      pageSize: 12
    });
  }
}

const styles = EStylesheet.create({
  recordListContainer: {
    marginTop: pxToDp(44),
    marginLeft: pxToDp(32),
    marginRight: pxToDp(32),
  },
  recordListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(90),
  },
  recordListContent: {
    alignItems: 'center',
  },
  listHeaderItem: {
    width: pxToDp(171.5),
    textAlign: 'center',
    fontSize: pxToDp(26),
    color: '#666666'
  },
  emptyStyle: {
    width: pxToDp(300),
    height: pxToDp(300),
    marginTop: pxToDp(41),
  },
  emptyTxt: {
    marginTop: pxToDp(250),
    textAlign: 'center',
  },
  // more
  moreWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(42)
  },
  moreLine: {
    width: pxToDp(56),
    height: pxToDp(1),
    backgroundColor: 'rgb(191,187,187)'
  },
  moreText: {
    fontSize: pxToDp(24),
    color: 'rgb(191,187,187)',
    marginHorizontal: pxToDp(20)
  }
})