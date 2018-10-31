import * as React from 'react';
import { View, Text } from 'react-native';
import DebtComponent from '../../Components/Debt/index';
import { ScrollableTabView } from '~components/ScrollTabView';
import QNRefreshModel from '~components/QNRefreshModel';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import Projects from '~pages/MyDebt/shared/project.model';
import { fetchPersonRights } from '../../Api/index';

class MyDebtScreen extends React.Component{

  private tabbar: object[] = [
    {head: '全部', id: 0},
    {head: '承接中', id: 0},
    {head: '申诉中', id: 0},
    {head: '已下架', id: 0},
    {head: '已完成', id: 0}
  ]

  private projects = [
    0,
    1,
    2,
    3
  ]

  private _scrollableTabView: any = {
    goToPage: () => {}
  };

  public render() {
    return (
      <View style={{flex: 1,backgroundColor: '#F5F5F5'}}>
        <ScrollableTabView
          ref={r => (this._scrollableTabView = r)}
          initialPage={1}
          onChangeTab={({ i }) => {
            this._onChangeTab(i);
          }}
        >
          {
            this.tabbar.map((tab, i) => {
              return (
                <QNRefreshModel
                  list
                  scrollableTabView={this._scrollableTabView}
                  defaultPageType={1}
                  key={tab.id}
                  tabLabel={tab.head}
                  dataSource={this.projects}
                  renderFooter={this._renderFooter}
                  loadMore={() => {
                    this._loadMore(i);
                  }}
                  heightForIndexPath={pxToDp(543)}
                  renderRow={this._renderRow}
                  isLast={true}
                  onRefresh={() => {
                    return this.projects.concat([88]);
                  }}
                />
              )
            })
          }
        </ScrollableTabView>
      </View>
    )
  }

  componentDidMount() {
    let result = fetchPersonRights({
      rightState: null,
      lowerShelves: 0,
      pageIndex: 1,
      pageSize: 10
    }).then((error) => {
      console.log(error)
    }, (data) => {
      console.log(data,'回家覅JFK', result);
    });
  }

  public _onChangeTab() {
  }
  
  _renderFooter = () => {
    return (
      <View style={styles.moreWrapper}>
        <View style={styles.moreLine} />
        <Text style={styles.moreText}>天呐，你已经看到底部啦！</Text>
        <View style={styles.moreLine} />
      </View>
    );
  };
  
  _loadMore = (page: number) => {
    // this.page++;
    return this.projects.concat([88]);
  };
  
  _renderRow = item => {
    return <DebtComponent />;
  };

}


const styles = EStyleSheet.create({
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
  },
})

export default MyDebtScreen;