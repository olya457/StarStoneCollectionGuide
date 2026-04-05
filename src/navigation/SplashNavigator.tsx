import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingNavigator from './OnboardingNavigator';

export type SplashStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

type Props = {
  onFinish: () => void;
};

const Stack = createNativeStackNavigator<SplashStackParamList>();

export default function SplashNavigator({ onFinish }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding">
        {() => <OnboardingNavigator onFinish={onFinish} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}