import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

type messageItem = {
  label: string;
  content: string | number;
  textColor?: string;
  desc?: string;
};

type Props = {
  title: string;
  messageList: Array<messageItem>;
};

export default class extends React.PureComponent<Props> {
  static defaultProps = {
    title: '',
    messageList: []
  };

  static propTypes = {
    title: PropTypes.string,
    messageList: PropTypes.array
  };

  public render() {
    const { title, messageList } = this.props;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.topTitle}>{title}</Text>
        {messageList.map((item, index) => {
          return (
            <View style={styles.itemWrap} key={index}>
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.label}</Text>
                <Text style={[styles.desc, item.textColor ? { color: item.textColor } : null]}>{item.content}</Text>
              </View>
              <Text style={styles.extraDesc}>{item.desc}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: pxToDp(18),
    paddingHorizontal: pxToDp(31),
    paddingTop: pxToDp(46),
    paddingBottom: pxToDp(13),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  topTitle: {
    marginBottom: pxToDp(60),
    fontWeight: '500',
    fontSize: pxToDp(32)
  },
  itemWrap: {
    marginBottom: pxToDp(49)
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: pxToDp(28),
    color: '#666',
    fontWeight: '500'
  },
  desc: {
    fontSize: pxToDp(28),
    color: '#333',
    fontWeight: '500'
  },
  extraDesc: {
    marginTop: pxToDp(15),
    fontSize: pxToDp(24),
    color: "#999999"
  }
});
