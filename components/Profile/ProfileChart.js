import React from "react";
import { ScrollView, Text } from "react-native";
import { VictoryPie } from "victory-native";
import * as Animatable from "react-native-animatable";

export default ({ quizDatas }) => {
  const colors = [
    "#25DA48",
    "#00BB7E",
    "#00939B",
    "#006999",
    "#003C74",
    "#565A95",
    "#A178B1",
  ];

  let sumTotalAnsweredQuestion = 0;
  let sumTotalCorrectAnsweredQuestion = 0;
  let pieces = [0, 0, 0, 0, 0, 0, 0];

  for (let index = 0; index < quizDatas.length; index++) {
    sumTotalAnsweredQuestion =
      sumTotalAnsweredQuestion + quizDatas[index].answerTotalNumber;
    sumTotalCorrectAnsweredQuestion =
      sumTotalCorrectAnsweredQuestion + quizDatas[index].answerCorrect;
    quizDatas[index].answerCorrectBySubjects.map(
      ({ key, points }) => (pieces[key] = pieces[key] + points)
    );
  }

  const pieChart = [
    { y: pieces[0], label: `${pieces[0]}` },
    { y: pieces[1], label: `${pieces[1]}` },
    { y: pieces[2], label: `${pieces[2]}` },
    { y: pieces[3], label: `${pieces[3]}` },
    { y: pieces[4], label: `${pieces[4]}` },
    { y: pieces[5], label: `${pieces[5]}` },
    { y: pieces[6], label: `${pieces[6]}` },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <VictoryPie
        data={pieChart}
        colorScale={colors}
        innerRadius={70}
        labelRadius={140}
      />
      <Animatable.View
        animation="bounceIn"
        duration={3000}
        style={{ position: "absolute", top: "35%", right: "36%" }}
      >
        <Text
          style={{
            fontFamily: "ExtraBold",
            textAlign: "center",
            fontSize: 50,
            color: "#000A06",
          }}
        >
          {sumTotalCorrectAnsweredQuestion}
        </Text>
        <Text
          style={{
            fontFamily: "Medium",
            textAlign: "center",
            fontSize: 20,
            width: 100,
            color: "#000A06",
          }}
        >
          Respostas Corretas
        </Text>
      </Animatable.View>
    </ScrollView>
  );
};
