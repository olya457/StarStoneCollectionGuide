import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard1 from '../screens/onboarding/Onboard1';
import Onboard2 from '../screens/onboarding/Onboard2';
import Onboard3 from '../screens/onboarding/Onboard3';
import Onboard4 from '../screens/onboarding/Onboard4';
import Onboard5 from '../screens/onboarding/Onboard5';

export type OnboardingStackParamList = {
  Onboard1: undefined;
  Onboard2: undefined;
  Onboard3: undefined;
  Onboard4: undefined;
  Onboard5: undefined;
};

type Props = {
  onFinish: () => void;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator({ onFinish }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Onboard1" component={Onboard1} />
      <Stack.Screen name="Onboard2" component={Onboard2} />
      <Stack.Screen name="Onboard3" component={Onboard3} />
      <Stack.Screen name="Onboard4" component={Onboard4} />
      <Stack.Screen name="Onboard5">
        {(props) => <Onboard5 {...props} onFinish={onFinish} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}