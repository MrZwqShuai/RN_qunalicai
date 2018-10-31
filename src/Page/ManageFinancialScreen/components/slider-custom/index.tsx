import * as React from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { ScrollView, Dimensions } from 'react-native';
import {
  PlatForm,
  PlatFormItem,
  FindObjectParams
} from '../../shared/manage-financial.model';
import { inject, observer } from 'mobx-react';
import { getHotList } from '~apis/index';
import { pxToDp } from '~utils';
import { toJS } from 'mobx';

type Props = {
  closeDrawer(): void;
  goToPage(page: number): void;
};

type State = {
  currentItemIdx: number;
  sections: PlatForm[];
};

@inject('ManageFinancialStore', 'HomeStore')
@observer
class SliderCustomComponent extends React.Component<Props, State> {
  findObjectParams: FindObjectParams = {};

  initAllItem: PlatFormItem[] = [{ Platform: '全部' }];

  hotPlatFormID: number;

  // 用来重置赋值的hotlist
  hotList = [];

  initSections: PlatForm[] = [
    {
      title: '首投复投',
      data: [
        { Platform: '全部', sign: true },
        { Platform: '首投', Type: 1 },
        { Platform: '复投', Type: 2 }
      ]
    },
    {
      title: '综合收益',
      data: [
        { Platform: '默认排序', sign: true },
        { Platform: '收益升序', Type: 2 },
        { Platform: '收益降序', Type: 1 }
      ]
    },
    {
      title: '投资期限',
      data: [
        { Platform: '默认排序', sign: true },
        { Platform: '期限升序', Type: 2 },
        { Platform: '期限降序', Type: 1 }
      ]
    },
    { title: '推荐项目', data: this.hotList }
  ];

  constructor(props: Props) {
    super(props);
    this.state = {
      currentItemIdx: 0,
      sections: this.initSections
    };
  }

  public SectionList(sections: PlatForm[]) {
    const SectionList: JSX.Element = sections.map(
      (platFormItem: PlatForm, index: number) => {
        const SectionListItem: JSX.Element = platFormItem.data.map(
          (item: PlatFormItem, itemIndex: number) => {
            return (
              <Text
                key={itemIndex}
                style={[
                  styles.platformName,
                  item.sign ? styles.platformNameActive : styles.platformName
                ]}
                onPress={() => {
                  this.selectPlatName(itemIndex, index);
                }}>
                {item.Platform}
              </Text>
            );
          }
        );
        return (
          <View style={styles.platform} key={index}>
            <Text style={styles.ulTitle}>{platFormItem.title}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {SectionListItem}
            </View>
          </View>
        );
      }
    );
    return SectionList;
  }

  public render() {
    return (
      <View style={{flex: 1}}
      >
        <View
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderTitle}>条件筛选</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.closeDrawer();
              }}>
              <Image
                source={require('../../assets/images/s_close.png')}
                style={styles.closeBtn}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView style={{flex: 1}}
            horizontal={false}
            bounces={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
          >
          {this.SectionList(this.state.sections)}
          <View style={styles.platButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.reset();
              }}>
              <Text style={[styles.platButton, styles.reset]}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.sure();
              }}>
              <Text style={[styles.platButton, styles.sure]}>确定</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  componentWillMount() {
    // this.getHotList();
    this.getRecommendList();
  }

  getHotList(recommendList: object[]) {
    let sections = this.state.sections;
    this.hotList = sections[3].data = recommendList;
    this.hotList.unshift({ Platform: '全部', sign: true });
    this.setState({
      sections: sections
    });
  }

  getRecommendList() {
    const recommendList = toJS(this.props.HomeStore.recommendList);
    if (recommendList) {
      this.getHotList(recommendList);
    } else {
      this.props.HomeStore.loadRecommendList();
      this.getHotList(recommendList);
    }
  }

  selectPlatName(itemIndex: number, index: number) {
    let sections = this.state.sections.concat();
    sections[index].data.map((k: PlatFormItem) => {
      console.log(k, '-------');
      k.sign = false;
    });
    sections[index].data[itemIndex].sign = true;
    this.setState({
      sections: sections
    });
    this.createFindObjectParams(itemIndex, index, sections);
  }

  createFindObjectParams(itemIndex, index, sections) {
    // 这块处理的有点乱后期优化下 包括布局
    // currentRowIdx 当前第几行的下标 分别赋值
    function createField(currentRowIdx, field) {
      let findObjectField =
        currentRowIdx === index
          ? sections[index].data[itemIndex].Type
          : field
            ? field
            : undefined;
      return findObjectField;
    }
    let investLimit = this.findObjectParams.investLimit;
    let profitType = this.findObjectParams.profitType;
    let investType = this.findObjectParams.investType;
    this.setHotPlatFormID(sections[index].data[itemIndex].platID, index);
    this.findObjectParams = {
      page: 1,
      pageSize: 8,
      investLimit: createField(2, investLimit),
      profitType: createField(1, profitType),
      investType: createField(0, investType),
      id: this.hotPlatFormID
    };
    console.log(this.findObjectParams, '点击了');
  }

  reset(): void {
    this.setHotPlatFormID(undefined, 3);
    this.hotList.forEach((item: PlatFormItem, index: number) => {
      item.sign = false;
      if (index === 0) {
        item.sign = true;
      }
    });
    this.initSections.forEach((item: PlatForm, index: number) => {
      item.data.forEach(item => {
        item.sign = false;
      });
      try {
        item.data[0].sign = true;
      } catch (e) {
        console.log('错误信息', e);
      }
      if (index === 3) {
        item.data = this.hotList;
      }
    });
    this.setState({
      sections: this.initSections
    });
    this.findObjectParams = {
      page: 1,
      pageSize: 8
    };
  }

  sure(): void {
    this.closeDrawer();
    this.goToPage();
    // this.props.ManageFinancialStore.clearPlatFormList(0);
    this.props.ManageFinancialStore.setRefresh(true);
    this.findObjectParams.page = 1;
    this.findObjectParams.pageSize = 8;
    this.props.resetPage();
    this.props.ManageFinancialStore.getPlatFormList(
      this.findObjectParams,
      this.getCurrentPage()
    );
  }

  closeDrawer(): void {
    this.props.closeDrawer();
  }

  goToPage(): void {
    if (this.findObjectParams.investType != undefined) {
      this.props.goToPage(Number(this.findObjectParams.investType));
    } else {
      this.props.goToPage(0);
    }
  }

  getCurrentPage(): number {
    if (this.findObjectParams.investType === undefined) {
      return 0;
    } else {
      return Number(this.findObjectParams.investType);
    }
  }

  setHotPlatFormID(targetId: number | undefined, columnIndex: number): void {
    if (columnIndex === 3) {
      this.hotPlatFormID = targetId;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff'
  },
  sliderHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: pxToDp(30)
  },
  sliderTitle: {
    marginLeft: pxToDp(27),
    fontSize: pxToDp(38),
    fontWeight: 'bold',
    color: '#333'
  },
  closeBtn: {
    width: pxToDp(42),
    height: pxToDp(42),
    marginRight: 12.5
  },
  platform: {
    marginTop: 27.5
  },
  ulTitle: {
    marginLeft: pxToDp(28),
    fontSize: pxToDp(26),
    color: '#999999'
  },
  platformName: {
    width: pxToDp(183),
    marginLeft: 11.5,
    marginTop: pxToDp(22),
    paddingVertical: 7.5,
    borderRadius: pxToDp(10),
    fontSize: pxToDp(26),
    color: '#333',
    backgroundColor: '#F8F8F8',
    textAlign: 'center',
    overflow: 'hidden'
  },
  platformNameActive: {
    color: '#fff',
    backgroundColor: '#FFAD2C'
  },
  platButtonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  platButton: {
    width: pxToDp(272),
    height: pxToDp(81),
    borderRadius: pxToDp(10),
    textAlign: 'center',
    overflow: 'hidden',
    lineHeight: pxToDp(81)
  },
  reset: {
    borderWidth: pxToDp(1),
    color: '#FFAD2C',
    borderColor: '#FFAD2C',
    backgroundColor: '#fff'
  },
  sure: {
    borderWidth: pxToDp(1),
    borderColor: '#FFAD2C',
    backgroundColor: '#FFAD2C',
    color: '#fff'
  }
});

export default SliderCustomComponent;
