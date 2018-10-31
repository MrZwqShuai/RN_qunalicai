import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Alert
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import QNHeader from '~components/QNHeader';
import Touch from '~components/QNTouch';
import Toast from '~components/NewToast';
import WelfareItem from './components/welfare-item';
import RedBagModal from './components/redbag-modal';
import TaskModal from './components/task-modal';
import CustomPlaceholder from './components/custom-placeholder';
import styles from './assets/styles';
@inject('WelfareCenterStore', 'RootStore')
@observer
class DiscoverWelfareHouseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskModal: false
    };
  }
  _welfareBtnPress = item => {
    if (
      item.code === 'SIGN' ||
      item.code === 'SHARE' ||
      item.code === 'COMMENT' ||
      item.code === 'HOT_COMMENT'
    ) {
      if (this.props.RootStore.isLogin) {
        if (item.code === 'SIGN') {
          return this.props.WelfareCenterStore.getSignIn();
        } else {
          return this.props.navigation.goBack(null);
        }
      } else {
        return this.props.navigation.navigate('Login');
      }
    } else {
      let link;
      switch (item.code) {
        case 'ZHUCE':
          link = 'Register';
          break;
        case 'BANGKA':
          link = 'Account';
          break;
        case 'INVITE':
          link = 'DiscoverInviting';
          break;
        case 'INVEST':
          link = 'ManageFinancial';
          break;
        case 'INVEST_SUM':
          link = 'ManageFinancial';
          break;
      }
      this._handleNavigation(link);
    }
  };
  _taskWarning = () => {
    Toast.show('您的金豆还没攒够100，请继续努力哦');
  };
  _toggleTaskModal = () => {
    const taskModal = !this.state.taskModal;
    this.setState({
      taskModal
    });
  };
  _handleNavigation = nav => {
    if (this.props.RootStore.isLogin) {
      this.props.navigation.navigate(nav);
    } else {
      this.props.navigation.navigate('Login');
    }
  };
  _renderUserInfo = () => {
    const { nickName, headPicture } = this.props.WelfareCenterStore;
    if (this.props.RootStore.isLogin) {
      return (
        <View style={styles.userInfoLeft}>
          <Image
            style={styles.avator}
            source={
              headPicture
                ? { uri: headPicture }
                : require('./assets/images/welfareAvator.png')
            }
          />
          <Text style={styles.userName}>{nickName}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.userInfoLeft}>
          <Image
            style={styles.avator}
            source={require('./assets/images/welfareAvator.png')}
          />
          <Touch onPress={() => this._handleNavigation('Login')}>
            <Text style={styles.userName}>点击登录</Text>
          </Touch>
        </View>
      );
    }
  };
  _renderNewPersonView = () => {
    const { taskList } = this.props.WelfareCenterStore;
    const bool = taskList.find(
      item =>
        (item.code === 'ZHUCE' && item.status === 0) ||
        (item.code === 'BANGKA' && item.status === 0)
    );
    if (!this.props.RootStore.isLogin || bool) {
      return (
        <View style={styles.welfareContainer}>
          <Text style={styles.subTitle}>新人福利</Text>
          <View style={styles.welffareList}>
            {taskList.map((item, index) => {
              if (item.code == 'ZHUCE' || item.code == 'BANGKA') {
                return (
                  <WelfareItem
                    key={index}
                    itemData={item}
                    noBorder={index == 1 ? true : false}
                    btnPress={this._welfareBtnPress}
                  />
                );
              }
            })}
          </View>
        </View>
      );
    }
  };
  componentDidMount() {
    this.screenListen = this.props.navigation.addListener('didFocus', obj => {
      const { isLogin } = this.props.RootStore;
      this.props.WelfareCenterStore.getTaskList(isLogin);
      if (isLogin) {
        this.props.WelfareCenterStore.getCurrentBeans();
        this.props.WelfareCenterStore.getUserInfo();
      }
    });
  }
  componentWillUnmount() {
    this.screenListen.remove();
  }
  render() {
    const { _renderNewPersonView } = this;
    const {
      taskList,
      needBeans,
      currentBeans,
      taskReady
    } = this.props.WelfareCenterStore;
    const percent = currentBeans > 100 ? '100%' : currentBeans + '%';
    return (
      <View style={styles.wrap}>
        <QNHeader title="福利中心" backIcon />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.topContainer}
            source={require('./assets/images/topBg.png')}>
            <View style={styles.userInfo}>
              {this._renderUserInfo()}
              <Touch
                style={styles.userInfoRight}
                onPress={this._toggleTaskModal}>
                <Text style={styles.taskText}>任务攻略</Text>
                <Image
                  style={styles.arrowIcon}
                  source={require('./assets/images/welfare_arrow.png')}
                />
              </Touch>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>距离领取红包还需</Text>
                <Touch onPress={() => this._handleNavigation('TaskRecord')}>
                  <Text style={styles.needBeans}>{needBeans}</Text>
                </Touch>
                <Text style={styles.progressText}>点金豆</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={styles.barTop}>
                  <Text style={styles.currentBeans}>{currentBeans}</Text>
                  <Touch
                    onPress={this._taskWarning}
                    style={styles.fullBeanContainer}>
                    <Image
                      style={styles.fullBean}
                      source={require('./assets/images/fullBeans.png')}
                    />
                  </Touch>
                </View>
                <View style={styles.barMiddle}>
                  <View style={styles.lineContainer}>
                    <View style={[styles.line, { width: percent }]} />
                  </View>

                  <Image
                    style={[styles.progressIcon, { left: percent }]}
                    source={require('./assets/images/progressEnd.png')}
                  />
                </View>
                <View style={styles.barBottom}>
                  <View style={styles.bottomContainer}>
                    <View style={styles.circle} />
                    <Text style={styles.bottomText}>0</Text>
                  </View>
                  <View style={styles.bottomContainer}>
                    <View style={styles.circle} />
                    <Text style={styles.bottomText}>100</Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
          {_renderNewPersonView()}
          <View style={styles.welfareContainer}>
            <Text style={styles.subTitle}>赚钱任务</Text>
            <CustomPlaceholder onReady={taskReady} lineNumber={7}>
              <View style={styles.welffareList}>
                {taskList.map((item, index) => {
                  if (item.code != 'ZHUCE' && item.code != 'BANGKA') {
                    return (
                      <WelfareItem
                        key={index}
                        itemData={item}
                        noBorder={index == taskList.length - 3 ? true : false}
                        btnPress={this._welfareBtnPress}
                      />
                    );
                  }
                })}
              </View>
            </CustomPlaceholder>
          </View>
        </ScrollView>
        {needBeans == 0 ? <RedBagModal /> : null}
        {this.state.taskModal ? (
          <TaskModal onPress={this._toggleTaskModal} />
        ) : null}
      </View>
    );
  }
}
export default withNavigation(DiscoverWelfareHouseScreen);
