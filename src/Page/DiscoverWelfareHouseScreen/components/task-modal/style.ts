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
    zIndex: 101,
    paddingHorizontal: pxToDp(30),
    paddingVertical: pxToDp(15)
  },
  title: {
    fontSize: pxToDp(34),
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: pxToDp(30)
  },
  desc: {
    fontSize: pxToDp(26),
    color: "#333",
    lineHeight: pxToDp(48)
  },
  btnContainer: {
    marginHorizontal: pxToDp(10),
    marginVertical: pxToDp(30),
    flexDirection: "row",
    height: pxToDp(80),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFAD2C",
    borderRadius: pxToDp(10)
  },
  btnText: {
    color: "#fff",
    fontSize: pxToDp(28)
  }
});
export default styles;
