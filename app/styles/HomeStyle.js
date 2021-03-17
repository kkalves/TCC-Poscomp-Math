import { Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009362",
  },
  messageContainer: {
    flexDirection: "row",
  },
  message: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  title: {
    color: "#fff",
    fontSize: 33,
    fontFamily: "ExtraBold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Medium",
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: screen.width,
    height: screen.height,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default styles;
