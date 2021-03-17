import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import QuizScreen from "../../screens/Quiz/QuizScreen";
import OptionQuizScreen from "../../screens/Quiz/OptionQuizScreen";
import StartQuizScreen from "../../screens/Quiz/StartQuizScreen";
import ExplanationScreen from "../../screens/Quiz/ExplanationScreen";
import FinishQuizScreen from "../../screens/Quiz/FinishQuizScreen";

const QuizStack = createStackNavigator();

const QuizStackNavigator = () => (
  <QuizStack.Navigator headerMode="none">
    <QuizStack.Screen name="Quiz" component={QuizScreen} />
    <QuizStack.Screen name="OptionQuiz" component={OptionQuizScreen} />
    <QuizStack.Screen name="StartQuiz" component={StartQuizScreen} />
    <QuizStack.Screen name="Explanation" component={ExplanationScreen} />
    <QuizStack.Screen name="FinishQuiz" component={FinishQuizScreen} />
  </QuizStack.Navigator>
);

export default QuizStackNavigator;
