import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'native-base';
import { observer, inject } from 'mobx-react';
import QNModal from '~components/QNModal';

const style = EStyleSheet.create({
  titleBox: {
    height: 30,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '$borderGrayColor'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '$fontGray'
  },
  section: {
    flexDirection: 'row',
    margin: 5
  },
  sectionIndex: {
    width: 15,
    color: '$fontGray'
  },
  sectionContent: {
    color: '$fontGray',
    lineHeight: 20
  }
});

@inject('RootStore')
@observer
export default class MyRedBagModal extends React.Component {
  statement = [
    '红包仅适用与当前手机号，不可转赠，不能提现；',
    '红包仅适用提交回执单时使用，一笔回执单只能使用激活一个红包；',
    '红包存在有效期，请在截止日期内及时使用，过期失效；',
    '在获取和使用红包过程中，如果出现违规行为（作弊领取、恶意套现等），去哪理财有权收回红包，解释权归去哪理财所有。'
  ];

  render() {
    return (
      <QNModal
        visible={this.props.RootStore.isOpenMyRedBagModal}
        onCloseModal={() => this.props.RootStore.toggleMyRedBagModal()}>
        <View style={style.titleBox}>
          <Text style={style.title}>红包使用说明</Text>
        </View>
        {this.statement.map((content, index) => (
          <View style={style.section} key={index}>
            <Text style={style.sectionIndex}>{index + 1}. </Text>
            <Text style={style.sectionContent}>{content}</Text>
          </View>
        ))}
      </QNModal>
    );
  }
}
