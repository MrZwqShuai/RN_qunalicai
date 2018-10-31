import * as React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Projects from '~pages/MyDebt/shared/project.model';
import { projects } from '../../Page/MyDebt/shared/project.default';
import { pxToDp } from '~utils';
import QNCountDownComponent from '../QNCountDown/index';

type Props = Projects;

type State = {};

class DebtComponent extends React.Component<Props, State> {
  static defaultProps: Projects = projects;

  private countDown: number = new Date().getTime();

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.projectWrapper}>
        <View style={styles.projectHead}>
          <View style={styles.projectHeadLeft}>
            <View style={styles.projectLogo}>
              <Image
                source={{
                  uri:
                    'https://upload-images.jianshu.io/upload_images/2759192-e06b647fc555892f.jpg'
                }}
                style={styles.projectLogoIcon}
              />
            </View>
            <Text style={styles.projectName}>{this.props.platName}</Text>
            {this.props.prepay ? (
              <View style={styles.projectHeadPrepay} />
            ) : null}
            <View style={styles.projectHeadIcon} />
          </View>
          <View style={styles.projectHeadRight}>
            <Text style={styles.projectHeadRightStatus}>
              {this.props.projectStatus}
            </Text>
          </View>
        </View>
        <View style={styles.projectBody}>
          <View style={styles.projectDetail}>
            <View
              style={[
                styles.projectDetailItem,
                {
                  width: '26%'
                }
              ]}>
              <Text style={[styles.projectDetailItemK, { fontWeight: '800' }]}>
                {this.props.payMoney}
              </Text>
              <Text style={styles.projectDetailItemV}>债转金额(元)</Text>
            </View>
            <View style={[styles.projectDetailItem, { width: '26%' }]}>
              <Text style={styles.projectDetailItemK}>
                {this.props.payMoney}
              </Text>
              <Text style={styles.projectDetailItemV}>返现金额(元)</Text>
            </View>
            <View style={[styles.projectDetailItem, { width: '20%' }]}>
              <Text style={styles.projectDetailItemK}>
                {this.props.discountMoney}
              </Text>
              <Text style={styles.projectDetailItemV}>折扣(元)</Text>
            </View>
            {(this.props.uiType === 0 && (
              <View style={[styles.projectDetailItem, { width: '28%' }]}>
                <Text style={styles.projectDetailItemK}>
                  {this.props.serviceCharge}
                </Text>
                <Text style={styles.projectDetailItemV}>担保服务费(元)</Text>
              </View>
            )) ||
              null}
          </View>
          <View style={styles.projectCountDown}>
            <View style={styles.projectCountDownStart}>
              <Text style={styles.projectCountDownK}>倒计时:</Text>
              <QNCountDownComponent time={new Date().getTime()} />
            </View>
            <Text style={styles.projectDesc}>转让中, 请等待承接人接单</Text>
          </View>
        </View>
        {(this.props.uiType === 0 && (
          <View style={styles.projectBottom}>
            <Text style={styles.projectBottomBtn}>下架</Text>
          </View>
        )) ||
          null}
      </View>
    );
  }

  public doCountDown() {
    this.countDownTimer = setInterval(() => {
      this.countDown -= 1;
      if (this.countDown <= 0) {
        clearInterval(this.countDownTimer);
      }
    }, 1000);
  }
}

const styles = EStyleSheet.create({
  projectWrapper: {
    marginTop: pxToDp(18),
    // paddingLeft: pxToDp(31),
    // paddingRight: pxToDp(31),
    width: '100%',
    backgroundColor: '#fff'
  },
  projectHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToDp(143),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#EAEAEA',
    paddingLeft: pxToDp(31),
    paddingRight: pxToDp(31)
  },
  projectHeadLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  projectHeadRight: {},
  projectHeadRightStatus: {
    color: '#FFAD2C',
    fontSize: pxToDp(28)
  },
  projectLogo: {
    marginRight: pxToDp(25)
  },
  projectLogoIcon: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(10),
    borderColor: '#000'
  },
  projectName: {
    fontSize: pxToDp(30),
    color: '#333'
  },
  projectHeadPrepay: {},
  projectHeadIcon: {},
  projectBody: {
    paddingLeft: pxToDp(31),
    paddingRight: pxToDp(31)
  },
  projectDetail: {
    flexDirection: 'row',
    width: '100%',
    height: pxToDp(175),
    // justifyContent: '',
    alignItems: 'center'
  },
  projectDetailItem: {
    // width: '25%'
  },
  projectDetailItemK: {
    fontSize: pxToDp(36),
    color: '#333333'
  },
  projectDetailItemV: {
    marginTop: pxToDp(21),
    fontSize: pxToDp(20),
    color: '#A9A9A9'
  },
  projectCountDown: {
    justifyContent: 'center',
    height: pxToDp(118),
    backgroundColor: '#FBFBFB'
  },
  projectCountDownStart: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  projectCountDownK: {
    fontSize: pxToDp(26),
    color: '#333'
  },
  projectCountDownV: {
    marginLeft: pxToDp(14),
    fontSize: pxToDp(26),
    color: '#FF4B17'
  },
  projectDesc: {
    marginTop: pxToDp(14),
    fontSize: pxToDp(24),
    color: '#999'
  },
  projectBottom: {
    height: pxToDp(96),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  projectBottomBtn: {
    width: pxToDp(144),
    height: pxToDp(52),
    lineHeight: pxToDp(52),
    fontSize: pxToDp(22),
    textAlign: 'center',
    borderWidth: pxToDp(1),
    borderRadius: pxToDp(26)
  }
});

export default DebtComponent;
