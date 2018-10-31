import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PlatScrollData } from '../../../ManageFinancialScreen/shared/manage-financial.model';
import { inject, observer } from 'mobx-react';
import { pxToDp } from '~utils';
import Toast from '~components/NewToast';
import SearchTextInput from '../search-textinput/index';

type Props = {};

type State = {
  name: string;
  platList: PlatScrollData[];
};

@inject('SearchBiaoListStore')
@inject('RootStore')
@observer
class SearchHeaderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      platList: []
    };
  }

  public render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.searchContainer}>
        <View style={{marginRight: pxToDp(28),}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={styles.searchLeft}
            >
            <Image
              source={require('../../../../Components/QNHeader/assets/images/icon_arrow_left.png')}
              style={{
                width: pxToDp(19),
                height: pxToDp(34)
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchInput}>
          <SearchTextInput 
            defaultValue={this.props.SearchBiaoListStore.searchName}
            placeholder="请输入平台名称"
            underlineColorAndroid="transparent"
            onChangeText={name => {
              this.props.SearchBiaoListStore.setSearchName(name);
            }}
          />
        </View>
        <View style={{ marginLeft: pxToDp(21) }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.getBiaoList(this.props.SearchBiaoListStore.searchName);
            }}>
            <Image
              source={require('../../assets/images/search.png')}
              style={styles.searchBtn}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  getBiaoList(name: string, page: number = 1) {
    this.props.SearchBiaoListStore.setSearchName(name);
    this.props.SearchBiaoListStore.setRefresh(true);
    if (this.hasInput()) {
      this.props.RootStore.setLoading(true);
      this.props.SearchBiaoListStore.getBiaoList({
        page: page,
        pageSize: 2,
        name: name,
      });
    } else {
      Toast.show('请输入搜索内容~');
    }
  }

  hasInput() {
    console.log(this.props.SearchBiaoListStore)
    return this.props.SearchBiaoListStore.searchName;
  }

  componentDidMount() {
    // this.props.SearchBiaoListStore.setInputVal('');
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 50,
    // paddingLeft: pxToDp(16),
    backgroundColor: '#fff'
  },
  searchInput: {
    justifyContent: 'center',
    width: pxToDp(561),
    height: pxToDp(64),
    paddingLeft: pxToDp(32),
    backgroundColor: '#f8f8f8',
    borderRadius: 20
  },
  searchBtn: {
    width: pxToDp(40),
    height: pxToDp(41.4),
  },
  searchLeft: {
    width: pxToDp(30),
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  }
});

export default SearchHeaderComponent;
