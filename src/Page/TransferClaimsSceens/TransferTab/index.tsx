import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import QNHeader from '~components/QNHeader';
import styles from './assets/style';
import { navTitleList } from './shared/config';
import Touchable from '~components/Touchable';
import QNRefreshModel from '~components/QNRefreshModel';
import Echarts from '~components/NativeEcharts';
// import echarts from 'echarts';
// import { echarts } from '~components/NativeEcharts/components';
// console.log('ech:', echarts);

// import { pxToDp } from '~utils';

type Props = {
  RootStore: any;
  TransferClaimStore: any;
  navigation: any;
};

@inject('TransferClaimStore', 'RootStore')
@observer
export default class extends React.Component<Props> {
  state = {
    activeNavTitle: '',
    ascType: true,
    option: {
      title: {
        text: '债权折扣（近6笔）',
        x: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          show: false
        }
      },
      yAxis: {
        name: '（折）',
        type: 'value',
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            barBorderRadius: 10,
            // color: new echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       offset: 0,
            //       color: '#FDD100' // 0% 处的颜色
            //     },
            //     {
            //       offset: 1,
            //       color: '#FFAD2C' // 100% 处的颜色
            //     }
            //   ],
            //   false
            // )
          }
        }
      ]
    }
  };

  //
  gotoByRouteName = routeName => {
    this.props.navigation.navigate(routeName);
  };

  // headerRight
  private renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => this.gotoByRouteName('MyUndertake')}>
        <Text style={styles.headerRight}>债转中心</Text>
      </TouchableOpacity>
    );
  };

  // nav
  private handleActivateNav = title => {
    const {
      state: { activeNavTitle, ascType },
      props: { TransferClaimStore }
    } = this;

    const retType = title === activeNavTitle ? !ascType : false;
    this.setState({
      activeNavTitle: title,
      ascType: retType
    });

    TransferClaimStore.updateCondition(title, Number(retType));
  };

  // list
  /**
   * Modal.
   */
  _count = 0;
  private handlePopTrend = () => {
    if (this._count === 1) {
      this.state.option.series[0].data = [120, 0, 0, 0, 0, 10, 10];
    }
    this.props.RootStore.toggleRootModal();
    this.props.RootStore.setRenderRoot(this.renderRoot);
    this.props.RootStore.setRootOnCloseModal(this.onCloseModal);
    this._count++;
  };

  private renderRoot = () => {
    return <Echarts option={this.state.option} containerHeight="100%" />;
  };

  private onCloseModal = () => {
    this.props.RootStore.toggleRootModal();
  };

  private renderListItem = (item, index) => {
    return (
      <View style={styles.projectWrapper} key={index}>
        <View style={styles.projectHead}>
          <View style={styles.projectHeadLeft}>
            <View style={styles.projectLogo}>
              <Image
                source={{
                  uri:
                    item.platPic ||
                    'https://upload-images.jianshu.io/upload_images/2759192-e06b647fc555892f.jpg'
                }}
                style={styles.projectLogoIcon}
              />
            </View>
            <View style={styles.projectDescContainer}>
              <View style={styles.projectTop}>
                <Text style={styles.projectName}>{item.platName}</Text>
                {(item.prepay && (
                  <Image
                    source={require('./assets/images/icon_pre.png')}
                    style={styles.projectBadgeIcon}
                  />
                )) ||
                  null}
                {(item.delflag && (
                  <Image
                    source={require('./assets/images/icon_shield.png')}
                    style={styles.projectBadgeIcon}
                  />
                )) ||
                  null}
              </View>
              <Text style={styles.projectDesc}>
                有效期：
                {item.effectiveDays}天
              </Text>
            </View>
          </View>
          <Touchable
            style={styles.projectHeadRight}
            onPress={this.handlePopTrend}>
            <Text style={styles.projectHeadRightStatus}>交易走势</Text>
            <Image
              source={
                item.rightsState
                  ? require('./assets/images/icon_arrow_down.png')
                  : require('./assets/images/icon_arrow_up.png')
              }
              style={styles.projectTrendIcon}
            />
          </Touchable>
        </View>
        <View style={styles.projectBody}>
          <View style={styles.projectDetail}>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{item.payMoney}</Text>
              <Text style={styles.projectDetailItemV}>债转金额(元)</Text>
            </View>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{item.returnMoney}</Text>
              <Text style={styles.projectDetailItemV}>返现金额(元)</Text>
            </View>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{item.discount}</Text>
              <Text style={styles.projectDetailItemV}>折扣(折)</Text>
            </View>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{item.rest}</Text>
              <Text style={styles.projectDetailItemV}>剩余天数(元)</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  private renderFooter = () => {
    return (
      <View style={styles.moreWrapper}>
        <View style={styles.moreLine} />
        <Text style={styles.moreText}>天呐，你已经看到底部啦！</Text>
        <View style={styles.moreLine} />
      </View>
    );
  };

  private loadMore = () => {
    this.props.TransferClaimStore.loadMore();
  };

  private onRefresh = () => {
    this.props.TransferClaimStore.refresh();
  };

  // lifeCycle
  componentDidMount() {
    const { TransferClaimStore } = this.props;
    this.props.RootStore.setRootContainerStyle({
      width: `${(688 / 750) * 100}%`,
      height: `${(816 / 1334) * 100}%`
    });
    if (TransferClaimStore.transfer.data.length === 0) {
      TransferClaimStore.fetchTransferList();
    }
  }

  componentWillMount() {}

  public render() {
    const {
      state: { activeNavTitle, ascType },
      props: { TransferClaimStore },
      renderHeaderRight,
      renderListItem,
      handleActivateNav,
      loadMore,
      onRefresh,
      renderFooter
    } = this;

    return (
      <View style={styles.container}>
        <QNHeader title="债转专区" HeaderRight={renderHeaderRight} />
        <View style={styles.navContainer}>
          {navTitleList.map(({ title, sortName }) => {
            return (
              <Touchable
                style={styles.navItem}
                key={title}
                onPress={() => handleActivateNav(title, sortName)}
                activeOpacity={1}>
                <Text
                  style={[
                    styles.navTitleText,
                    activeNavTitle === title ? styles.activeNavTitleText : null
                  ]}>
                  {title}
                </Text>
                {ascType === true && activeNavTitle === title ? (
                  <Image
                    source={require('./assets/images/icon_triangle_up.png')}
                    style={styles.triangleIcon}
                  />
                ) : (
                  <Image
                    source={require('./assets/images/icon_triangle_down.png')}
                    style={styles.triangleIcon}
                  />
                )}
              </Touchable>
            );
          })}
        </View>
        <View style={styles.listContainer}>
          <QNRefreshModel
            list
            defaultPageType={2}
            dataSource={TransferClaimStore.transfer.data}
            renderFooter={renderFooter}
            renderRow={renderListItem}
            loadMore={loadMore}
            isLast={TransferClaimStore.transfer.isLast}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    );
  }
}
