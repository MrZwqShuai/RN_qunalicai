import * as React from 'react';
import { View, Text } from 'react-native';
import DebtComponent from '~components/Debt';
import { ScrollableTabView } from '~components/ScrollTabView';
import QNRefreshModel from '~components/QNRefreshModel';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import QNHeader from '~components/QNHeader';
import Touch from '~components/QNTouch';
import HeaderRight from '~components/TransferHeaderRight';

export default class extends React.Component {
  private tabbar = ['全部', '承接中', '申诉中', '已完成'];

  private projects = [0];

  private scrollableTabView: any = {
    goToPage: () => {}
  };

  // state

  private renderFooter = () => {
    return (
      <View style={styles.moreWrapper}>
        <View style={styles.moreLine} />
        <Text style={styles.moreText}>天呐，你已经看到底部啦！</Text>
        <View style={styles.moreLine} />
      </View>
    );
  };

  public onChangeTab = i => {};

  private loadMore = (page: number) => {
    return this.projects.concat([88]);
  };

  private renderRow = item => {
    return <DebtComponent uiType={1} />;
  };

  public render() {
    const {
      onChangeTab,
      projects,
      renderFooter,
      loadMore,
      renderRow,
      props: { navigation }
    } = this;

    return (
      <View style={styles.container}>
        <QNHeader
          title="我的承接"
          backIcon
          HeaderRight={<HeaderRight navigation={navigation} />}
        />
        <ScrollableTabView
          ref={r => (this.scrollableTabView = r)}
          initialPage={0}
          onChangeTab={({ i }) => onChangeTab(i)}>
          {this.tabbar.map((tab, i) => {
            return (
              <QNRefreshModel
                list
                scrollableTabView={this.scrollableTabView}
                defaultPageType={1}
                key={i}
                tabLabel={tab}
                dataSource={projects}
                renderFooter={renderFooter}
                loadMore={() => loadMore(i)}
                // heightForIndexPath={pxToDp(543)}
                renderRow={renderRow}
                isLast={true}
                onRefresh={() => {
                  return this.projects.concat([88]);
                }}
              />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
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
});
