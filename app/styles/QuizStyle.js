import { Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009362",
    padding: 5,
  },
  insideContainer: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  textCount: {
    margin: 10,
    color: "#000A06",
    fontSize: 20,
    fontFamily: "Bold",
    textAlign: "center",
    letterSpacing: 1.5,
  },
  headerImage: {
    borderRadius: 5,
    width: screen.width * 0.9,
  },
  answerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e2e2",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    margin: 5,
  },
  button: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009362",
  },
  buttonDisable: { backgroundColor: "#e1fff5" },
  buttonText: {
    color: "#000A06",
    fontSize: 14,
    fontFamily: "Bold",
  },
});

export default styles;
