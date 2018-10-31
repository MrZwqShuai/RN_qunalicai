import EStylesheet from "react-native-extended-stylesheet";
import { pxToDp, deviceWidth, deviceHeight } from "~utils";
const styles = EStylesheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: pxToDp(32),
    paddingTop: pxToDp(43)
  },
  welfareIcon: {
    width: pxToDp(72),
    height: pxToDp(72),
    marginRight: pxToDp(35)
  },
  welfareContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E8E6E6",
    paddingBottom: pxToDp(40),
    borderBottomWidth: pxToDp(1)
  },
  noBorder: {
    borderBottomWidth: 0
  },
  welfareDetail: {
    width: pxToDp(378)
  },
  title: {
    color: "#333",
    fontWeight: "bold",
    fontSize: pxToDp(32),
    marginBottom: pxToDp(4)
  },
  reward: {
    fontSize: pxToDp(24),
    fontWeight: "500",
    color: "#999999"
  },
  btnContainer: {
    width: pxToDp(136),
    height: pxToDp(56),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFAD2C",
    borderRadius: pxToDp(28)
  },
  btnText: {
    color: "#fff",
    fontSize: pxToDp(26),
    fontWeight: "bold"
  },
  completedBtn: {
    backgroundColor: "#BBBBBB"
  }
});
export default styles;
