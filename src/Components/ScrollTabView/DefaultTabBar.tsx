import { pxToDp } from '~utils';
import { Dimensions } from 'react-native';
const React = require('react');
const { ViewPropTypes } = (ReactNative = require('react-native'));
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const { StyleSheet, Text, View, Animated } = ReactNative;
const Button = require('./Button');

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    layoutType: PropTypes.number,
    customWidth: PropTypes.number,
    underlineWidth: PropTypes.number,
    tabBarRight: PropTypes.func
  },

  getDefaultProps() {
    return {
      backgroundColor: '#fff',
      activeTextStyle: {
        fontSize: pxToDp(42)
      },
      inactiveTextStyle: {
        fontSize: pxToDp(30)
      },
      activeTextColor: '#333',
      inactiveTextColor: '#999',
      underlineStyle: {
        backgroundColor: '#FFAD2C',
        height: pxToDp(6)
      },
      layoutType: 0,
      customWidth: pxToDp(334),
      customLeftType1: pxToDp(21),
      customLeftType2: pxToDp(125),
      underlineWidth: pxToDp(44),
      tabBarRight: () => null
    };
  },

  renderTabOption(name, page) { },

  renderTab(name, page, isTabActive, onPressHandler) {
    const {
      activeTextColor,
      inactiveTextColor,
      activeTextStyle,
      inactiveTextStyle
    } = this.props;
    // console.log(name, isTabActive, '当前滚动');
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const textStyle = isTabActive ? activeTextStyle : inactiveTextStyle;

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}>
        <View style={[styles.tab, this.props.tabStyle,]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle, { textAlign: 'center' }]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const width = this.props.layoutType ? this.props.customWidth : containerWidth;
    const left = (width / numberOfTabs / 2 - this.props.underlineWidth / 2);
    const tabUnderlineStyle = {
      position: 'absolute',
      width: this.props.underlineWidth,
      height: 4,
      left: left,
      bottom: 0
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width / numberOfTabs]
    });
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: Dimensions.get('window').width,
          backgroundColor: '#fff',
          paddingLeft: this.props.layoutType ? pxToDp(45) : 0
        }}>
        <View
          style={[
            styles.tabs,
            { backgroundColor: this.props.backgroundColor, width: width },
            this.props.style
          ]}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
          <Animated.View
            style={[
              tabUnderlineStyle,
              {
                transform: [{ translateX }]
              },
              this.props.underlineStyle
            ]}
          />
        </View>
        <View>{this.props.tabBarRight()}</View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

module.exports = DefaultTabBar;
