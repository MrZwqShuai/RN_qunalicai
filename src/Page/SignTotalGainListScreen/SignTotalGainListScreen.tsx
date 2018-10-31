import * as React from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';
import {toJS} from 'mobx';
import styles from './styles'
import { ListFooter } from '~components/ListFooter'

@inject('SignStore')
@observer
export default class SignTotalGainListScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        refreshing: false,
      }
    }
    _renderSectionHeader = ({ section }) => {
      const { title } = section;
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderYear}>{title.split('年')[0] + '年'}</Text>
          <Text style={styles.sectionHeaderMonth}>{title.split('年')[1]}</Text>
        </View>
      )
    }
    _renderItem = ({item}) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemLeftDate}>{new Date(item.signDateString).getDate()}</Text>
          <Text style={styles.itemLeftWeek}>{item.dayOfWeek}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.itemRightText}>+{item.award}</Text>
        </View>
      </View>
    )
    _renderSeparator = () => {
      return <View style={styles.separator}/>;
    }
    _renderSectionList = () => {
      return (
          <SectionList
            renderItem={this._renderItem}
            renderSectionHeader={ this._renderSectionHeader}
            ItemSeparatorComponent={this._renderSeparator}
            ListFooterComponent={()=><ListFooter status={toJS(this.props.SignStore.status)}/>}
            sections={toJS(this.props.SignStore.gainList)}
            refreshing={this.state.refreshing}
            onRefresh = {this.onRefresh}
            onEndReached = {this.onEndReached}
            onEndReachedThreshold={0.3}
            keyExtractor={(item) => item.signDate}
          />
      )
    }
    onRefresh = () => {
      this.setState({
        refreshing: true
      })
      this.props.SignStore.setStatus(0)
      this.props.SignStore.setCurrentPage(1)
      this.props.SignStore.setParams('page',1)
      this.props.SignStore.fetchSignAppList()
      this.setState({
        refreshing: false
      })
    }
    onEndReached = () => {
      if(this.props.SignStore.status == 2){
        return
      }
      if(this.props.SignStore.currentPage >= this.props.SignStore.allPage){
        this.props.SignStore.setStatus(2)
      }
      if(this.props.SignStore.currentPage < this.props.SignStore.allPage){
          this.props.SignStore.setStatus(1)
          const num = this.props.SignStore.currentPage + 1;
          this.props.SignStore.setCurrentPage(num)
          this.props.SignStore.setParams('page',num)
          this.props.SignStore.fetchSignAppList()
          this.props.SignStore.setStatus(0)
      }
    }
    componentWillMount() {
      this.props.SignStore.fetchSignAppList()
    }
    render () {
      return this._renderSectionList();
    }
}