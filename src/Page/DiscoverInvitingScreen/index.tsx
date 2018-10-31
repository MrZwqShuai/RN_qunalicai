import * as React from 'react';
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import QNHeader from '../../Components/QNHeader';
import EStylesheet from 'react-native-extended-stylesheet';
import {downloadURL, pxToDp} from '~utils'
import QNInvitingRecord from '../../Components/QNInvitingRecord/index';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import AnalyticsUtil from '../../Config/umeng/AnalyticsUtil.js';
import UMShareModule from '../../Config/umeng/ShareUtil.js';
import CommonConfigModule from '../../Config/common/index';
import { fetchShareReward, fetchFeRewardRules } from '../../Api/index';
import X5WebView from '../../Components/X5WebView/index';
import { Dimensions } from 'react-native';

type Props = {
  navigation: any;
};

@inject('ShareStore')
@inject('RootStore', 'ShareStore', 'InvitingRecordStore')
@observer
export default class DiscoverInvitingScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rules: [
        '邀请好友首次投资并回执审核通过，即可获得20元现金',
        '邀请的好友需在注册后30天内投资并回执审核通过，逾期无奖励。',
        '如发现用户恶意刷奖励等作弊行为，将取消奖励。'
      ]
    };
  }

  public render() {
    const login = this.isLogin();
    const { YQNum, YQRed, YQLB, AllPage } = login
      ? toJS(this.props.InvitingRecordStore.invitingRecordList)
      : { YQNum: 0, YQRed: 0, YQLB: [], AllPage: 0 };
    return (
      <View style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
        <QNHeader title="邀请" backIcon />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.invitingRewardsAndNum}>
            <View style={styles.numbers}>
              <Text style={styles.invitingVal}>{YQNum}</Text>
              <Text style={styles.invitingTxt}>累计邀请(人)</Text>
            </View>
            <View style={styles.splitLine} />
            <View style={styles.rewards}>
              <Text style={styles.invitingVal}>{YQRed}</Text>
              <Text style={styles.invitingTxt}>累计奖励(元)</Text>
            </View>
          </View>
          <View style={styles.doubleRewards}>
            <Text style={styles.commonTitle}>双赢奖励</Text>
            <View style={styles.invitingRedPackContainer}>
              <View style={styles.invitingRedPack}>
                <ImageBackground
                  source={require('./assets/images/double-rewards.png')}
                  style={styles.invitingRedPack}>
                  <View style={styles.invitingHeader}>
                    <View style={styles.line} />
                    <Text style={styles.invitingMember}>我是邀请人</Text>
                    <View style={styles.line} />
                  </View>
                  <Text style={styles.redpackCase}>20元红包</Text>
                  <Text style={styles.packKind}>现金红包</Text>
                </ImageBackground>
              </View>
              <View style={styles.invitingRedPack}>
                <ImageBackground
                  source={require('./assets/images/double-rewards.png')}
                  style={styles.invitingRedPack}>
                  <View style={styles.invitingHeader}>
                    <View style={styles.line} />
                    <Text style={styles.invitingMember}>好友是受邀人</Text>
                    <View style={styles.line} />
                  </View>
                  <Text style={styles.redpackCase}>28元新手红包</Text>
                  <Text style={styles.packKind}>10元x1+8元x1+5元x2</Text>
                </ImageBackground>
              </View>
            </View>
            <Text style={styles.invitinginvest}>
              *邀请好友首次投资并回执审核通过
            </Text>
          </View>
          <View style={styles.invitingRecords}>
            <Text style={styles.commonTitle}>邀请记录</Text>
            <QNInvitingRecord
              invitingRecord={this.getFirstFiveInvitingRcd(YQLB)}
            />
            {this.renderMoreInvitingRecord(YQLB)}
          </View>
          <View style={styles.activityRules}>
            <Text style={styles.commonTitle}>活动规则</Text>
            <View style={styles.rulesContent}>{this.renderRulesItem()}</View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.share();
          }}>
          <View style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>立即邀请</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // public render() {
  //   return (
  //     <X5WebView 
  //       style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
  //       src="http://www.baidu.com"
  //       onChange={(event) => {this._onChange(event)}}
  //       onProgressChange={(event) => {
  //         this._onProgressChange(event);
  //       }}
  //       // isLoading={!(this.loadSpeed == 100)}
  //     />
  //   );
  // }

  _onChange(event: Event) {
    console.log(event.nativeEvent, '----')
    const { navigate } = this.props.navigation;
    try {
      navigate(event.nativeEvent.url);
    } catch(e) {
      return;
    }
  }

  // _onProgressChange(event: Event) {
  //   if(typeof event.nativeEvent === "object") {
  //     this.setState({
  //       // loadSpeed: loadSpeed
  //     })
  //   }
  // }

  public getFirstFiveInvitingRcd(invitingRecord: Array<Object>) {
    if (Array.isArray(toJS(invitingRecord))) {
      let firstFiveInvitingRecord = invitingRecord.slice(0, 5);
      return firstFiveInvitingRecord;
    }
    return [];
  }

  public goMoreInvitingDetail(path) {
    const { navigate } = this.props.navigation;
    navigate(path);
  }

  public getInvitingRecord(): Array<object> {
    return [
      { key: 'a', a: 'c' },
      { key: 'b', a: 'c' },
      { key: 'b', a: 'c' },
      { key: 'b', a: 'c' },
      { key: 'b', a: 'c' }
    ];
  }

  private renderRulesItem() {
    return this.state.rules.map((rule, v) => {
      return (
        <View style={styles.rulesItem} key={v}>
          <View style={styles.rulesItemSort}>
            <Text style={styles.rulesItemSortIdx}>0{v + 1}</Text>
            <View style={styles.sortRadiusView} />
          </View>
          <Text style={styles.rulesItemText}>{rule.content}</Text>
        </View>
      );
    });
  }

  private renderMoreInvitingRecord(YQLB: object[]): JSX.Element {
    if (YQLB.length > 5) {
      return (
        <Text
          style={styles.moreInvitingRecord}
          onPress={() => {
            this.moreInvitingRecord();
          }}>
          查看更多 >
        </Text>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getInvitingRecordList();
    this.setRules();
  }

  componentWillUnmount() {
    this.props.ShareStore.resetCallback();
  }

  public getInvitingRecordList() {
    const login = this.isLogin();
    if (login) {
      this.props.InvitingRecordStore.getInvitingRecordList({
        page: 1,
        pageSize: 11
      });
    }
  }

  public share() {
    const login = this.isLogin();
    if (login) {
      AnalyticsUtil.onEvent('share_btn1');
      AnalyticsUtil.onEvent('share_btn2');
      this.setShareConfig();
      this.showShareModal();
    } else {
      this.props.navigation.navigate('Login');
    }
  }

  public setShareConfig() {
    this.props.ShareStore.setShare({
      title: '快来跟我一起瓜分现金红包',
      description: '下载注册去哪理财APP,和我一起分享理财返利现金红包!',
      picture:
        'https://wsimages.wsloan.com/images/qunalicai/di_inviteyhZ7_1mqLqd9R1mIATNrY.png',
      shareUrl: downloadURL
    });
    this.props.ShareStore.setCallBack(this.shareSuccess);
  }

  public showShareModal() {
    this.props.ShareStore.toggleShareModel();
  }

  public isLogin(): boolean {
    return this.props.RootStore.isLogin;
  }

  public moreInvitingRecord(): void {
    this.props.navigation.navigate('DiscoverInvitingMore');
  }

  public shareSuccess = async () => {
    let result = await fetchShareReward();
    this.props.ShareStore.resetCallback();
  };

  public async setRules() {
    let rules = await fetchFeRewardRules();
    if (rules.length) {
      this.setState({
        rules: rules
      });
    }
  }
}

const styles = EStylesheet.create({
  invitingRewardsAndNum: {
    width: '100%',
    height: pxToDp(175),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  numbers: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  splitLine: {
    width: pxToDp(1),
    height: pxToDp(82),
    marginLeft: pxToDp(100),
    marginRight: pxToDp(94),
    backgroundColor: '#EAEAEA'
  },
  rewards: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  invitingVal: {
    fontSize: pxToDp(54),
    fontWeight: 'bold',
    color: '#333333'
  },
  invitingTxt: {
    fontSize: pxToDp(26),
    color: '#999999'
  },
  commonTitle: {
    marginLeft: pxToDp(32),
    fontSize: pxToDp(32),
    fontWeight: 'bold',
    color: '#333'
  },
  doubleRewards: {
    marginTop: pxToDp(16),
    paddingTop: pxToDp(39),
    paddingBottom: pxToDp(29),
    backgroundColor: '#fff'
  },
  invitingRedPackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: pxToDp(40)
  },
  invitingRedPack: {
    width: pxToDp(314),
    height: pxToDp(184)
  },
  invitingHeader: {
    marginTop: pxToDp(26),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: pxToDp(31),
    height: pxToDp(1),
    backgroundColor: '#FAE2BA'
  },
  invitingMember: {
    marginLeft: pxToDp(12),
    marginRight: pxToDp(12),
    textAlign: 'center',
    fontSize: pxToDp(24),
    color: '#E9AA51'
  },
  redpackCase: {
    marginTop: pxToDp(28),
    textAlign: 'center',
    fontSize: pxToDp(32),
    color: '#fff'
  },
  packKind: {
    textAlign: 'center',
    fontSize: pxToDp(22),
    color: '#fff'
  },
  invitinginvest: {
    marginTop: pxToDp(20),
    textAlign: 'center',
    fontSize: pxToDp(24),
    color: '#999999'
  },
  invitingRecords: {
    marginTop: pxToDp(16),
    paddingTop: pxToDp(41),
    paddingBottom: pxToDp(38),
    backgroundColor: '#fff'
  },
  moreInvitingRecord: {
    marginTop: pxToDp(10),
    fontSize: pxToDp(26),
    textAlign: 'center',
    color: '#999'
  },
  activityRules: {
    marginTop: pxToDp(17),
    marginBottom: pxToDp(31),
    paddingTop: pxToDp(39),
    backgroundColor: '#fff'
  },
  rulesContent: {
    marginTop: pxToDp(64),
    marginLeft: pxToDp(32),
    marginRight: pxToDp(32)
  },
  rulesItem: {
    flexDirection: 'row',
    marginBottom: pxToDp(40)
  },
  rulesItemText: {
    marginLeft: pxToDp(31)
  },
  sortRadiusView: {
    position: 'absolute',
    width: pxToDp(28),
    height: pxToDp(28),
    top: pxToDp(18),
    left: pxToDp(15),
    borderRadius: pxToDp(14),
    backgroundColor: '#FA7566',
    opacity: 0.3,
    zIndex: -1
  },
  rulesItemSortIdx: {
    fontSize: pxToDp(26),
    fontWeight: 'bold',
    color: '#FA7566'
  },
  shareBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: pxToDp(32),
    marginRight: pxToDp(32),
    marginBottom: pxToDp(42),
    height: pxToDp(88),
    borderRadius: pxToDp(10),
    backgroundColor: '#FFAD2C'
  },
  shareBtnText: {
    fontSize: pxToDp(28),
    color: '#fff'
  }
});
