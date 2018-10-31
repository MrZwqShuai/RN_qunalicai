import * as React from 'react';
import { View, Text } from 'react-native';
import { Textarea } from 'native-base';
import { observer, inject } from 'mobx-react';
import Toast from '~components/NewToast';
import QNHeader from '../../../Components/QNHeader';
import Touch from '../../../Components/QNTouch';
import style from './assets/style';

@inject('SuggestStore')
@observer
export default class extends React.Component {
  _onChangeText = v => {
    this.props.SuggestStore.setText(v);
  };

  _handleSave = async () => {
    await this.props.SuggestStore.saveText();
  };

  _renderRight = () => (
    <Touch onPress={this._handleSave}>
      <Text style={style.saveButton}>保存</Text>
    </Touch>
  );

  render() {
    return (
      <View>
        <QNHeader title="意见反馈" backIcon HeaderRight={this._renderRight} />
        <View style={style.relativeBox}>
          <Textarea
            style={style.inputText}
            maxLength={500}
            onChangeText={v => this._onChangeText(v)}
            rowSpan={6}
            placeholderTextColor="rgb(153,153,153)"
            placeholder="欢迎您提出宝贵的意见，如果您的意见被采纳，平台会有红包奖励哦。"
          />
          <Text style={style.tipText}>
            {this.props.SuggestStore.suggestText.length}
            /500
          </Text>
        </View>
      </View>
    );
  }
}
