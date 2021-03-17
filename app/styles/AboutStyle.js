import { Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#033e37",
    padding: 10,
  },
  headerTitleContainer: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#26E636",
    fontSize: 40,
    fontFamily: "ExtraBold",
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Regular",
  },
  image: {
    width: screen.width,
  },
  logo: {
    width: screen.height * 0.14,
    height: screen.height * 0.14,
    margin: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    width: screen.width / 2.5,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#00472f",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Bold",
  },
  buttonValue: {
    marginLeft: 5,
    color: "#26E636",
    fontSize: 18,
    fontFamily: "Bold",
  },
  title: {
    color: "#000A06",
    lineHeight: 50,
    fontSize: 34,
    fontFamily: "ExtraBold",
    letterSpacing: 1.5,
  },
  paragraph: {
    color: "#000A06",
    lineHeight: 20,
    fontSize: 16,
    marginTop: 15,
    fontFamily: "Medium",
    letterSpacing: 1.5,
    textAlign: "justify",
  },
});

export default styles;
