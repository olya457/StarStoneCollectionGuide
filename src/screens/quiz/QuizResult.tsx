import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { QuizStackParamList } from '../../navigation/QuizStack';
import { quizLevelsData } from '../../data/quizLevelsData';

type Props = NativeStackScreenProps<QuizStackParamList, 'QuizResult'>;

const { height } = Dimensions.get('window');
const isVerySmall = height < 640;

export default function QuizResult({ route, navigation }: Props) {
  const { score, total, level, passed } = route.params;
  const isLastLevel = level >= quizLevelsData.length;

  return (
    <ImageBackground
      source={require('../../assets/images/onboard_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.safe}>
        <View style={s.container}>
          <Text style={s.title}>Your Result: {score}/{total}</Text>

          <Text style={s.desc}>
            {passed
              ? 'You are building a strong understanding of stones and how to find them. Keep exploring and your knowledge will grow with every discovery.'
              : 'You made a good start. Read a little more, try again, and improve your result on the next attempt.'}
          </Text>

          <Image
            source={require('../../assets/images/result_stone.png')}
            style={s.resultImage}
            resizeMode="contain"
          />

          {passed && !isLastLevel && (
            <TouchableOpacity
              style={[s.actionBtn, s.nextBtn]}
              onPress={() => navigation.replace('QuizPlay', { level: level + 1 })}
            >
              <Text style={s.actionBtnText}>Next Level</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[s.actionBtn, s.retryBtn]}
            onPress={() => navigation.replace('QuizPlay', { level })}
          >
            <Text style={s.actionBtnText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.backLink} onPress={() => navigation.popToTop()}>
            <Text style={s.backLinkText}>Back to Start</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#231235',
  },

  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: isVerySmall ? 20 : 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 20 : 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },

  desc: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: isVerySmall ? 12 : 13,
    lineHeight: isVerySmall ? 18 : 20,
    textAlign: 'center',
    marginBottom: 24,
  },

  resultImage: {
    width: isVerySmall ? 150 : 180,
    height: isVerySmall ? 150 : 180,
    marginBottom: 26,
  },

  actionBtn: {
    width: '100%',
    height: isVerySmall ? 44 : 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  nextBtn: {
    backgroundColor: '#30B10F',
  },

  retryBtn: {
    backgroundColor: '#FF6A3D',
  },

  actionBtnText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
  },

  backLink: {
    marginTop: 8,
    paddingVertical: 8,
  },

  backLinkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '500',
  },
});