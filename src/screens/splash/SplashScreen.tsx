import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SplashStackParamList } from '../../navigation/SplashNavigator';

type Props = NativeStackScreenProps<SplashStackParamList, 'Splash'>;

const RIPPLE_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  .container {
    display: flex;
    gap: 0.625em;
  }
  .container span {
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    position: relative;
  }
  .container span::before {
    content: "";
    display: block;
    border-radius: inherit;
    height: inherit;
    width: inherit;
    background-color: inherit;
    animation: ripple 1.8s ease-out infinite;
    animation-delay: inherit;
    position: absolute;
    top: 0; left: 0;
  }
  .container span:nth-of-type(1) { background-color: #84cdfa; animation-delay: 0s; }
  .container span:nth-of-type(2) { background-color: #5ad1cd; animation-delay: 0.2s; }
  .container span:nth-of-type(3) { background-color: #9b59b6; animation-delay: 0.4s; }
  @keyframes ripple {
    from { opacity: 1; transform: scale(0); }
    to   { opacity: 0; transform: scale(3); }
  }
</style>
</head>
<body>
  <div class="container">
    <span></span>
    <span></span>
    <span></span>
  </div>
</body>
</html>
`;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.webviewWrap}>
        <WebView
          source={{ html: RIPPLE_HTML }}
          style={s.webview}
          scrollEnabled={false}
          backgroundColor="transparent"
          androidLayerType="hardware"
        />
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
  },
  webviewWrap: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    height: 80,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});