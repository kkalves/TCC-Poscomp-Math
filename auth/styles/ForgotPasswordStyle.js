import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009362",
  },
  floatContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 10,
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#000A06",
    fontSize: 18,
    fontFamily: "Bold",
  },
  title: {
    color: "#000A06",
    fontSize: 32,
    fontFamily: "ExtraBold",
    marginBottom: 10,
  },
  subTitle: {
    color: "#000A06",
    fontSize: 16,
    fontFamily: "Regular",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#000A06",
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: "Regular",
    color: "#000A06",
  },
  errorMessage: {
    marginTop: 5,
    color: "#e74c3c",
    fontSize: 12,
    fontFamily: "Semibold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#009362",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Semibold",
  },
});

export default styles;
