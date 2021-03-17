import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { subject } from "../../database/json/Subjects";

const screen = Dimensions.get("window");

export default ({ type, onPress }) => {
  return (
    <View style={styles.container}>
      {type === "subject" ? (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.ALG)}
          >
            <Text style={styles.buttonText}>{subject.ALG}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.ANAL)}
          >
            <Text style={styles.buttonText}>{subject.ANAL}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.CALC)}
          >
            <Text style={styles.buttonText}>{subject.CALC}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.GEO)}
          >
            <Text style={styles.buttonText}>{subject.GEO}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.LOG)}
          >
            <Text style={styles.buttonText}>{subject.LOG}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.MAT)}
          >
            <Text style={styles.buttonText}>{subject.MAT}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(subject.PBE)}
          >
            <Text style={styles.buttonText}>{subject.PBE}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress("2016")}
          >
            <Text style={styles.buttonText}>{"2016"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress("2017")}
          >
            <Text style={styles.buttonText}>{"2017"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress("2018")}
          >
            <Text style={styles.buttonText}>{"2018"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress("2019")}
          >
            <Text style={styles.buttonText}>{"2019"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    width: screen.width * 0.9,
    borderRadius: 30,
    margin: 10,
    padding: 30,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009387",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: screen.width * 0.8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    margin: 10,
    textTransform: "uppercase",
  },
});
