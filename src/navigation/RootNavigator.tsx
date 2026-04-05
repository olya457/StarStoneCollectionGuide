import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import StoneDetail from '../screens/stones/StoneDetail';
import LocationDetail from '../screens/locations/LocationDetail';

export type RootStackParamList = {
  Tabs: undefined;
  StoneDetail: { id: string };
  LocationDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />

      <Stack.Screen name="StoneDetail" component={StoneDetail} />
      <Stack.Screen name="LocationDetail" component={LocationDetail} />
    </Stack.Navigator>
  );
}