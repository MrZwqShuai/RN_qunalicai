import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
import { tabUnderlineDefaultStyle, tabBarDefaultStyle } from './shared/common.style';

type Props = {
  heading: string;
  tabFontSize: number;
  isTabActive: boolean;
  activeTextStyle: object;
  textStyle: object;
  currentTab: boolean;
  goToPage: (page: number) => void;
  onTabContainerLayout: (e: any) => void;
}
export default class QNTabBar extends React.Component<Props> {

  static defaultProps = {
    underlineStyle: {
      backgroundColor: '#FFAD2C',
    }
  }

  constructor(props: Props) {
    super(props);
  }

  public render() {
    if (this.props.columLayout) {
      return this.renderColumnLayout();
    } else {
      return (
        <View style={[styles.tabBarDefaultStyle, this.props.tabBarHeight]}
          onLayout={(e) => { this.props.onTabContainerLayout(e) }}
        >
          {
            this.props.tabs.map((heading, index) => {
              const isTabActive = this.props.currentTab === index;
              return this.renderTab(heading, isTabActive, index);
            })
          }
        </View>
      )
    }
  }

  public renderColumnLayout() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', backgroundColor: '#fff', }}>
        <View style={{ flex: .52 }}>
          <View style={[styles.tabBarDefaultStyle, this.props.tabBarHeight]}
            onLayout={(e) => { this.props.onTabContainerLayout(e) }}
          >
            {
              this.props.tabs.map((heading, index) => {
                const isTabActive = this.props.currentTab === index;
                return this.renderTab(heading, isTabActive, index);
              })
            }
          </View>
        </View>
        <View style={{ flex: .1, alignItems: 'center',justifyContent: 'center', }}>
          {this.props.tabBarRight}
        </View>
      </View>
    )
  }

  public renderTab(heading: string, isTabActive: boolean, index: number) {
    const { tabFontSize, activeTextStyle, textStyle } = this.props;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    if (this.checkString(heading)) {
      const tabUnderlineStyle = tabUnderlineDefaultStyle;
      return (
        <TouchableOpacity onPress={() => { this.props.goToPage(index) }} key={index} style={{ justifyContent: 'center', }}>
          <Text style={[isTabActive ? activeTextStyle : textStyle, {
            fontWeight: fontWeight,
          }]}>
            {heading}
          </Text>
          <View
            style={[isTabActive ? tabUnderlineStyle : null, this.props.underlineStyle]}
          />
        </TouchableOpacity>
      )
    } else {
      return this.props.heading;
    }
  }


  public checkString(target: string | JSX.Element): boolean {
    return typeof target === 'string';
  }
}

const styles = EStylesheet.create({
  tabBarDefaultStyle: tabBarDefaultStyle
})
