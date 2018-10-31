import * as React from "react";
import { createStackNavigator } from "react-navigation";
import CapitalRecordScreen from "~pages/CapitalRecordScreen";
import HeaderLeft from "~components/HeaderLeft";
import { headerTitleStyle } from "~utils";

export default createStackNavigator(
  {
    CapitalRecord: {
      screen: CapitalRecordScreen,
      navigationOptions: {
        title: "资金记录",
        headerTitleStyle: headerTitleStyle({ left: -56 })
      }
    }
  },
  {
    initialRouteName: "CapitalRecord",
    navigationOptions: {
      header: null
    },
    cardStyle: {
      backgroundColor: "#fff"
    }
  }
);
