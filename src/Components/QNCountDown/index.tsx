import * as React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { countDownFormat } from '../../Config/utils';
// 简单的ViewText diff算法效率会提升

type Props = {
  time: number;
}

type State = {
  timeFormat: string;
}

class QNCountDownComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      timeFormat: ""
    };
  }

  public render() {
    return (
      <View>
        <Text style={styles.projectCountDownV}>
          {countDownFormat(this.state.timeFormat)}
        </Text>
      </View>
    )
  }

  componentDidMount(nextProps: Props) {
    this.countDown();
  }

  public countDown() {
    if (this.countDownTimer) clearInterval(this.countDownTimer);
    let time = Math.floor(this.props.time / 1000);
    this.countDownTimer = setInterval(() => {
      if (time <= 0) {
        // dosomething
        clearInterval(this.countDownTimer);
        return;
      } else {
        time--;
        this.setState({
          timeFormat: time
        });
      }
    }, 1000);
  }
}

const styles = EStyleSheet.create({
  projectCountDownV: {
    marginLeft: pxToDp(14),
    fontSize: pxToDp(26),
    color: '#FF4B17'
  },
});

export default QNCountDownComponent;