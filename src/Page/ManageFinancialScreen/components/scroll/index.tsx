import * as React from 'react';
import { StyleSheet, Text, FlatList, RefreshControl, View, Image, ImageBackground, TouchableWithoutFeedback, Dimensions, ActivityIndicator } from 'react-native';
import { PlatScrollData } from '../../shared/manage-financial.model';
import { LogoUrl } from '../../../../Config/config';
import { inject, observer } from 'mobx-react';
import ListEmptyComponent from '../../../../Components/EmptyList/index';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as RootStore from '~store';
import { Button } from 'native-base';
import { renderPlatListItem } from '../../../../Components/PlatFormInFormation/index';
type Props = {
  AllPage: number;
  platScrollList: PlatScrollData[];
  navigation: any;
}

type State = {
  isRefresh: boolean;
}


@inject('ManageFinancialStore')
@inject('RootStore')
@observer
class ScrollComponent extends React.Component<Props, State> {

  static defaultProps: Props = {
    platScrollList: [],
    navigation: null
  }

  _keyExtractor = (item, index) => String(index);

  page: number = 2;

  constructor(props: Props = ScrollComponent.defaultProps) {
    super(props);
  }


  public render() {
    console.log(this.props.platScrollList, 'this.props.platScrollList')
    return this.props.platScrollList.map((platScrollData, index) => {
      return renderPlatListItem(platScrollData, this.props.navigation);
    })
  }

  componentDidMount() {
  }

  handleReload() {
    this.props.ManageFinancialStore.getPlatFormList({
      page: 1,
      pageSize: 10
    });
  }

  showRefresh() {
    this.props.RootStore.setLoading(true);
  }

  hideRefresh() {
    this.props.RootStore.setLoading(false);
  }

  _onRefresh() {
    if (!this.props.RootStore.loading) {
      this.showRefresh();
      this.props.ManageFinancialStore.getPlatFormList({
        page: 1,
        pageSize: 10
      });
    }
  }

  renderFooterComponent() {
    if (this.isLoadCompleted()) {
      if (this.props.AllPage <= 1) {
        return (
          <View style={{ height: 30, alignItems: 'center' }}>
          </View>
        )
      } else {
        return (
          <View style={{ height: 30, alignItems: 'center' }}>
            <Text style={{ color: '#999999', fontSize: 14, marginBottom: 5, }}>
              没有更多数据了
              </Text>
          </View>
        );
      }
    } else {
      return (
        <View style={{ height: 50, alignItems: 'center' }}>
          <ActivityIndicator />
          <Text style={{ color: '#999999', fontSize: 14, marginBottom: 25, }}>
            正在加载更多数据...
        </Text>
        </View>
      );
    }
  }

  handleOnEndReached() {
    console.log(this.page, 'this.page++')
    if (this.isLoadCompleted()) {
      return;
    } else {
      this.props.ManageFinancialStore.getPlatFormList({
        page: this.page,
        pageSize: 10
      });
      this.page++;
    }
  }

  isLoadCompleted() {
    if (this.page >= this.props.AllPage) {
      return true;
    }
    return false;
  }

}


export default ScrollComponent;