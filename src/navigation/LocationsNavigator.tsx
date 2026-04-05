import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationsScreen from '../screens/locations/LocationsScreen';

export type LocationsStackParamList = {
  LocationsList: undefined;
};

const Stack = createNativeStackNavigator<LocationsStackParamList>();

export default function LocationsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationsList" component={LocationsScreen} />
    </Stack.Navigator>
  );
}