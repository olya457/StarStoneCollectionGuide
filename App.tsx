import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashNavigator from './src/navigation/SplashNavigator';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [onboarded, setOnboarded] = useState(false);

  return (
    <NavigationContainer>
      {onboarded ? (
        <RootNavigator />
      ) : (
        <SplashNavigator onFinish={() => setOnboarded(true)} />
      )}
    </NavigationContainer>
  );
}