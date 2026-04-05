import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { QuizStackParamList } from '../../navigation/QuizStack';

type Props = NativeStackScreenProps<QuizStackParamList, 'QuizIntro'>;

const QUIZ_CURRENT_LEVEL_KEY = 'quiz_current_level';

export default function QuizIntro({ navigation }: Props) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const { height } = useWindowDimensions();

  const isVerySmall = height < 640;
  const isSmall = height < 700;
  const isMedium = height < 780;

  const loadCurrentLevel = async () => {
    try {
      const stored = await AsyncStorage.getItem(QUIZ_CURRENT_LEVEL_KEY);
      const parsed = stored ? Number(stored) : 1;
      setCurrentLevel(parsed > 0 ? parsed : 1);
    } catch {
      setCurrentLevel(1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCurrentLevel();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../assets/images/onboard_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.safe}>
        <View
          style={[
            s.container,
            {
              paddingHorizontal: isVerySmall ? 14 : isSmall ? 16 : 18,
              paddingTop: isVerySmall ? 8 : isSmall ? 10 : 14,
              paddingBottom: isVerySmall ? 14 : isSmall ? 18 : 22,
            },
          ]}
        >
          <Image
            source={require('../../assets/images/onboard3.png')}
            style={[
              s.hero,
              {
                height: isVerySmall ? 220 : isSmall ? 255 : isMedium ? 290 : 330,
                width: isVerySmall ? '90%' : isSmall ? '92%' : '94%',
                marginTop: 20,
                marginBottom: 12,
              },
            ]}
            resizeMode="contain"
          />

          <View
            style={[
              s.bottomCard,
              {
                borderRadius: isVerySmall ? 18 : isSmall ? 20 : 22,
                paddingHorizontal: isVerySmall ? 14 : isSmall ? 16 : 18,
                paddingTop: isVerySmall ? 14 : isSmall ? 18 : 22,
                paddingBottom: isVerySmall ? 14 : isSmall ? 16 : 20,
                marginBottom: 120,
              },
            ]}
          >
            <Text
              style={[
                s.title,
                {
                  fontSize: isVerySmall ? 16 : isSmall ? 18 : 20,
                  marginBottom: isVerySmall ? 8 : 12,
                },
              ]}
            >
              Test Your Stone Knowledge
            </Text>

            <Text
              style={[
                s.sub,
                {
                  fontSize: isVerySmall ? 11 : isSmall ? 12 : 13,
                  lineHeight: isVerySmall ? 16 : isSmall ? 18 : 20,
                  marginBottom: isVerySmall ? 14 : isSmall ? 16 : 18,
                },
              ]}
            >
              Answer a few simple questions and see how well you know stones,
              colors, and formations.
            </Text>

            <TouchableOpacity
              style={[
                s.startBtn,
                {
                  height: isVerySmall ? 42 : isSmall ? 46 : 50,
                  borderRadius: isVerySmall ? 12 : 14,
                },
              ]}
              onPress={() => navigation.navigate('QuizPlay', { level: currentLevel })}
            >
              <Text
                style={[
                  s.startBtnText,
                  {
                    fontSize: isVerySmall ? 13 : isSmall ? 14 : 15,
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
  bg: {
    flex: 1,
    backgroundColor: '#1b0f2b',
  },

  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  hero: {
    alignSelf: 'center',
  },

  bottomCard: {
    width: '100%',
    backgroundColor: 'rgba(25,10,44,0.95)',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },

  sub: {
    color: 'rgba(255,255,255,0.70)',
    textAlign: 'center',
  },

  startBtn: {
    width: '100%',
    backgroundColor: '#FF6A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  startBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});