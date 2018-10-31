import * as React from 'react';
import {
  View,
  Text,
  processColor,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import Echarts from '../../Components/NativeEcharts';

import EStyleSheet from 'react-native-extended-stylesheet';
import { getPieChart } from '~apis/index';
import {
  PieChartResponse,
  IPieChartData,
  IpipeChartInfo
} from './shared/Invest.model';
import InvestTableComponent from './component/invest-table/index';
import HeaderLeft from '~components/HeaderLeft';
import { pxToDp } from '../../Config/utils';
import QNHeader from '~components/QNHeader';
import { ScrollView, Image, Dimensions } from 'react-native';

enum PlatFormColor {
  Blue = 1,
  Green,
  Orange,
  Red
}

class MyInvestScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '投资概括',
      headerLeft: <HeaderLeft />,
      headerRight: <View />,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'normal',
        color: '#333'
      }
    };
  };

  private platFormColor: string[] = ['#85D1FC', '#7AD68B', '#F7954A', '#E05A45'];
  private totalInvest: number = 0;
  // private restChartData: object[] = [];
  constructor(props) {
    super(props);

    this.state = {
      option: {
        tooltip: {},
        toolbox: {},
        series: []
      },
      // 接口字段 投资收益返利info
      info: [],
      infoMap: {
      },
      charData: [],
      restCharData: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <QNHeader title="投资概况" backIcon />
        {this.state.charData.length ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Echarts
                option={this.state.option}
                height={300}
                width={pxToDp(750)}
              />
              <View style={styles.investDistribution}>
                {this.state.restCharData.map((platform, v) => {
                  return (
                    <View style={styles.investDistributionItem} key={v}>
                      <View style={[styles.investDistributionItemBlock, { backgroundColor: `${this.platFormColor[v]}` }]}></View>
                      <Text style={styles.investDistributionItemText}>{platform.name}  {(Number(platform.value / this.totalInvest).toFixed(4))*1000000/10000}%  {platform.value}笔</Text>
                    </View>
                  )
                })}
              </View>
              <View style={styles.accumulativeContainer}>
                <View style={styles.accumulativeItem}>
                  <Text style={styles.accumulativeItemNum}>{this.state.infoMap.investmentMoney || 0}</Text>
                  <Text style={styles.accumulativeItemTitle}>累计投资(元)</Text>
                </View>
                <View style={styles.accumulativeItem}>
                  <Text style={styles.accumulativeItemNum}>{this.state.infoMap.fanli || 0}</Text>
                  <Text style={styles.accumulativeItemTitle}>累计收益(元)</Text>
                </View>
              </View>
              <InvestTableComponent info={this.state.info} />
            </View>
          </ScrollView>
        ) : (
            <View style={styles.emptyBox}>
              <Image style={styles.emptyImage} source={require('../../Components/QNRefreshModel/assets/images/empty2.png')} />
            </View>
          )}
      </View>
    );

  }

  componentWillMount() {
    this.getPieChart();
  }

  getPieChart() {
    getPieChart().then((data: PieChartResponse) => {
      console.log(data, '投资分布图概况');
      let chartData = data.chartData;
      this.setState({
        restChartData: data.rest
      });
      this.setStateChartData(chartData);
      try {
        this.getPlatInfo(data.info);
        this.totalInvest = data.platNum;
        this.getPlatInfoMap(data.infoMap);
        if (this.emptyPieChart(chartData)) {
          return;
        } else {
          this.hasDPieChart(chartData);
        }
      } catch (e) {
        console.log('错误信息' + e.message);
      }
    });
  }

  repaint(seriesData) {
    this.setState({
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} 笔 ({d}%)'
        },
        toolbox: {
          feature: {
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            }
          }
        },
        series: [
          {
            name: '数据详情',
            type: 'pie',
            radius: '55%',
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 500, //饼图的位置
            data: seriesData,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: { //去掉折线
              normal: {
                show: false
              }
            },
            itemStyle: { // 此配置白色间隙
              normal: {
                borderWidth: 4,
                borderColor: '#ffffff',
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        color: this.platFormColor,
        backgroundColor: '#fff'
      }
    });
  }

  emptyPieChart(chartData: IPieChartData[]): boolean {
    if (chartData.length === 0) {
      this.repaint([
        {
          name: '暂无数据',
          value: 0
        }
      ]);
      return true;
    }
    return false;
  }

  hasDPieChart(chartData: IPieChartData[]) {
    chartData.forEach((item: IPieChartData) => {
      item.value = Number(item.value);
    });
    let newChartData = [];
    if (chartData.length > 3) {
      newChartData = chartData.slice(0, 3);
      newChartData.push(this.createRestCharData());
      this.setState({
        restCharData: newChartData
      })
    } else {
      this.setState({
        restCharData: chartData
      });
      newChartData = chartData;
    }
    this.repaint(newChartData);
  }

  createRestCharData() {
    let newRestChartData = { name: '', value: 0 };
    this.state.restChartData.forEach((data) => {
      newRestChartData.value += Number(data.value);
      newRestChartData.name = "其他";
    });
    return newRestChartData;
  }

  // 平台收益table
  getPlatInfo(info: IpipeChartInfo[]) {
    if (info.length > 3) {
      let newInfo = info.slice(0, 3);
      let restInfo = info.slice(3, info.length);
      let newRestInfo = { platNum: 0, fanli: 0, InvestmentMoney: 0 };
      restInfo.forEach((data, key) => {
        newRestInfo.Platform = "其他";
        newRestInfo.platNum += data.platNum;
        newRestInfo.fanli += data.fanli;
        newRestInfo.InvestmentMoney += data.InvestmentMoney;
      });
      newInfo.push(newRestInfo);
      this.setState({
        info: newInfo
      });
    } else {
      this.setState({
        info: info
      });
    }
  }

  getPlatInfoMap(infoMap) {
    if (infoMap) {
      this.setState({
        infoMap: infoMap
      });
    } else {
      this.setState({
        infoMap: {}
      });
    }
  }

  setStateChartData(chartData: object[]) {
    this.setState({
      charData: chartData
    });
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  headerLeftIcon: {
    width: 7.5,
    height: 14
  },
  accumulativeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: pxToDp(200),
    borderTopWidth: pxToDp(15),
    borderTopColor: '#F5F5F5',
    borderBottomWidth: pxToDp(15),
    borderBottomColor: '#F5F5F5',
  },
  accumulativeItem: {
    alignItems: 'center',
  },
  accumulativeItemNum: {
    fontSize: pxToDp(36),
    color: '#333',
  },
  accumulativeItemTitle: {
    marginTop: pxToDp(10),
    fontSize: pxToDp(24),
    color: '#A9A9A9',
  },
  investDistribution: {
    width: '100%',
    marginLeft: pxToDp(46),
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  investDistributionItem: {
    width: '50%',
    marginBottom: pxToDp(54),
    flexDirection: 'row',
    alignItems: 'center',

  },
  investDistributionItemBlock: {
    width: pxToDp(40),
    height: pxToDp(40),
  },
  investDistributionItemText: {
    marginLeft: pxToDp(26),
  },
  emptyBox: { height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center', },
  emptyImage: { width: pxToDp(500), height: pxToDp(500) }
});

export default MyInvestScreen;
