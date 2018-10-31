import * as React from 'react';
import { View, Image, Text } from 'react-native';
// import { observable, flow, action } from 'mobx';
import { observer, inject } from 'mobx-react';
// import { fetchUserInfo } from '~apis';
import QNHeader from '~components/QNHeader';
import Touch from '~components/QNTouch';
import style from './assets/style';
import MyCard from './components/my-card';

@inject('CardStore')
@observer
export default class extends React.Component {
  _bindCard = () => {
    this.props.CardStore.setIsClickBindCard(true);
  };

  componentDidMount() {
    this.props.CardStore.getUserInfo();
  }

  componentWillUnmount() {
    this.props.CardStore.hidePicker();
  }

  render() {
    const { _bindCard } = this;

    return (
      <View style={style.wrap}>
        <QNHeader title="收款账号" backIcon />
        {(this.props.CardStore.isHaveCard === 0 &&
          !this.props.CardStore.isClickBindCard && (
            <Touch style={style.accountContainer} onPress={_bindCard}>
              <Image
                source={require('./assets/images/ac_icon_add.png')}
                style={style.accountImage}
              />
              <Text style={style.accountText}>绑定收款账号</Text>
            </Touch>
          )) ||
          null}
        {this.props.CardStore.isClickBindCard ||
        this.props.CardStore.isHaveCard === 1 ? (
          <MyCard
            type={this.props.CardStore.isHaveCard}
            cardMessage={this.props.CardStore.cardMessage}
          />
        ) : null}
      </View>
    );
  }
}
