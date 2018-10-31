import EStylesheet from "react-native-extended-stylesheet";
import { pxToDp } from "~utils";
const styles = EStylesheet.create({
  receiptContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: pxToDp(56),
    paddingBottom: pxToDp(15),
    marginBottom: pxToDp(16),
    backgroundColor: "#fff"
  },
  receiptItem: {
    width: pxToDp(366),
    height: pxToDp(173)
  },
  receiptBg: {
    width: pxToDp(366),
    height: pxToDp(173),
    paddingLeft: pxToDp(31),
    paddingTop: pxToDp(38)
  },
  receiptTitle: {
    fontSize: pxToDp(32),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: pxToDp(12)
  },
  receiptDesc: {
    fontSize: pxToDp(22),
    color: "#fff"
  }
});
export default styles;
