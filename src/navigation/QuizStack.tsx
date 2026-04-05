import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizIntro from '../screens/quiz/QuizIntro';
import QuizPlay from '../screens/quiz/QuizPlay';
import QuizResult from '../screens/quiz/QuizResult';

export type QuizStackParamList = {
  QuizIntro: undefined;
  QuizPlay: { level: number };
  QuizResult: {
    score: number;
    total: number;
    level: number;
    passed: boolean;
  };
};

const Stack = createNativeStackNavigator<QuizStackParamList>();

export default function QuizStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizIntro" component={QuizIntro} />
      <Stack.Screen name="QuizPlay" component={QuizPlay} />
      <Stack.Screen name="QuizResult" component={QuizResult} />
    </Stack.Navigator>
  );
}