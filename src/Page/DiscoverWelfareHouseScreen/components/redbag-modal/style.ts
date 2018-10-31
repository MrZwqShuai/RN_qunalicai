import EStylesheet from "react-native-extended-stylesheet";
import { pxToDp } from "~utils";
const styles = EStylesheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: pxToDp(50),
    marginRight: pxToDp(50),
    borderRadius: pxToDp(10),
    zIndex: 101
  },
  openRedBag: {
    width: pxToDp(327),
    height: pxToDp(395)
  },
  saveRedBag: {
    width: pxToDp(345),
    height: pxToDp(426),
    alignItems: "center"
  },
  redBagDetail: {
    flexDirection: "row",
    marginTop: pxToDp(110)
  },
  money: {
    fontSize: pxToDp(73),
    lineHeight: pxToDp(75),
    color: "#F04401",
    fontWeight: "bold",
    marginLeft: pxToDp(10)
  },
  moneyText: {
    fontSize: pxToDp(24),
    color: "#F04401",
    marginTop: pxToDp(26),
    fontWeight: "bold"
  },
  saveBtn: {
    width: pxToDp(204),
    height: pxToDp(62),
    borderRadius: pxToDp(31),
    marginTop: pxToDp(96)
  }
});
export default styles;
