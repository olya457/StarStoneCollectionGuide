import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import Dots from '../../components/Dots';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Onboard5'> & {
  onFinish: () => void;
};

export default function Onboard5({ onFinish }: Props) {
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;

  return (
    <ImageBackground
      source={require('../../assets/images/onboard_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.safe}>
        <View
          style={[
            s.content,
            {
              paddingBottom: 39,
              transform: [{ translateY: -30 }],
            },
          ]}
        >
          <Image
            source={require('../../assets/images/onboard5.png')}
            style={[
              s.illustration,
              {
                height: isVerySmall ? 190 : isSmall ? 220 : 300,
                marginBottom: isVerySmall ? 20 : isSmall ? 28 : 40,
              },
            ]}
            resizeMode="contain"
          />

          <View
            style={[
              s.card,
              {
                paddingTop: isVerySmall ? 16 : isSmall ? 20 : 32,
                paddingBottom: isVerySmall ? 18 : isSmall ? 24 : 40,
                paddingHorizontal: isVerySmall ? 18 : isSmall ? 22 : 28,
                gap: isVerySmall ? 8 : isSmall ? 10 : 16,
                borderTopLeftRadius: isVerySmall ? 34 : 50,
                borderTopRightRadius: isVerySmall ? 34 : 50,
                borderBottomLeftRadius: isVerySmall ? 34 : 50,
                borderBottomRightRadius: isVerySmall ? 34 : 50,
              },
            ]}
          >
            <Dots active={5} />
            <Text
              style={[
                s.title,
                {
                  fontSize: isVerySmall ? 16 : isSmall ? 18 : 22,
                },
              ]}
            >
              Track and Explore More
            </Text>
            <Text
              style={[
                s.sub,
                {
                  fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
                  lineHeight: isVerySmall ? 16 : isSmall ? 18 : 22,
                },
              ]}
            >
              Revisit favorite locations and continue your discovery journey.
            </Text>

            <TouchableOpacity
              style={[
                s.btn,
                s.btnStart,
                {
                  paddingVertical: isVerySmall ? 10 : isSmall ? 12 : 16,
                  marginTop: isVerySmall ? 2 : isSmall ? 4 : 8,
                  borderRadius: isVerySmall ? 44 : 50,
                },
              ]}
              onPress={onFinish}
            >
              <Text
                style={[
                  s.btnText,
                  {
                    fontSize: isVerySmall ? 13 : isSmall ? 14 : 16,
                  },
                ]}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  illustration: {
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#1a0d2e',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  sub: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f97316',
  },
  btnStart: {
    backgroundColor: '#ec4899',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});