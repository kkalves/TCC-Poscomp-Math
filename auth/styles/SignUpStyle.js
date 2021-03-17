import { Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009362",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: screen.height * 0.2,
    height: screen.height * 0.2,
    borderRadius: (screen.height * 0.2) / 2,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  photo: {
    width: screen.height * 0.2,
    height: screen.height * 0.2,
    borderRadius: (screen.height * 0.2) / 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    marginRight: 60,
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
  signUp: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15,
  },
  signUpText: {
    color: "#000A06",
    fontSize: 14,
    fontFamily: "Regular",
  },
});

export default styles;
