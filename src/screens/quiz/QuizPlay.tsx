import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { QuizStackParamList } from '../../navigation/QuizStack';
import { quizLevelsData } from '../../data/quizLevelsData';

type Props = NativeStackScreenProps<QuizStackParamList, 'QuizPlay'>;

const { width, height } = Dimensions.get('window');
const isVerySmall = height < 640;
const QUIZ_CURRENT_LEVEL_KEY = 'quiz_current_level';

export default function QuizPlay({ route, navigation }: Props) {
  const levelNumber = route.params.level;

  const levelData = useMemo(() => {
    return quizLevelsData.find(item => item.id === levelNumber) ?? quizLevelsData[0];
  }, [levelNumber]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [confirmedAnswer, setConfirmedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuestion = levelData.questions[questionIndex];
  const totalQuestions = levelData.questions.length;
  const isLastQuestion = questionIndex === totalQuestions - 1;

  const handleConfirm = () => {
    if (!selectedAnswer || confirmedAnswer) {
      return;
    }

    setConfirmedAnswer(selectedAnswer);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (!confirmedAnswer) {
      return;
    }

    if (isLastQuestion) {
      const passed = score >= 3;
      const nextLevel = passed ? Math.min(levelNumber + 1, quizLevelsData.length) : levelNumber;

      try {
        await AsyncStorage.setItem(QUIZ_CURRENT_LEVEL_KEY, String(nextLevel));
      } catch {}

      navigation.replace('QuizResult', {
        score,
        total: totalQuestions,
        level: levelNumber,
        passed,
      });
      return;
    }

    setQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setConfirmedAnswer(null);
  };

  const getOptionStyle = (option: string) => {
    if (!confirmedAnswer) {
      return selectedAnswer === option ? s.optionSelected : null;
    }

    if (option === currentQuestion.correctAnswer) {
      return s.optionCorrect;
    }

    if (option === confirmedAnswer && option !== currentQuestion.correctAnswer) {
      return s.optionWrong;
    }

    return null;
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboard_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.safe}>
        <View style={s.container}>
          <View style={s.topBar}>
            <TouchableOpacity style={s.closeTap} onPress={() => setShowExitModal(true)}>
              <Text style={s.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={s.resultText}>Result: {score}</Text>

            <View style={s.closeTapPlaceholder} />
          </View>

          <View style={s.questionCard}>
            <Image source={currentQuestion.image} style={s.questionImage} resizeMode="cover" />

            <View style={s.questionContent}>
              <Text style={s.questionText}>{currentQuestion.question}</Text>

              <View style={s.dotsRow}>
                {levelData.questions.map((_, index) => {
                  const active = index === questionIndex;
                  return <View key={index} style={[s.dot, active && s.dotActive]} />;
                })}
              </View>
            </View>
          </View>

          <View style={s.answersWrap}>
            {currentQuestion.options.map(option => (
              <TouchableOpacity
                key={option}
                style={[s.optionBtn, getOptionStyle(option)]}
                activeOpacity={0.9}
                onPress={() => {
                  if (!confirmedAnswer) {
                    setSelectedAnswer(option);
                  }
                }}
              >
                <Text style={s.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {!confirmedAnswer ? (
            <TouchableOpacity
              style={[s.bottomBtn, !selectedAnswer && s.bottomBtnDisabled]}
              activeOpacity={0.9}
              disabled={!selectedAnswer}
              onPress={handleConfirm}
            >
              <Text style={s.bottomBtnText}>Confirm</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={s.bottomBtn} activeOpacity={0.9} onPress={handleNext}>
              <Text style={s.bottomBtnText}>{isLastQuestion ? 'Finish' : 'Next'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {showExitModal && (
          <View style={s.modalOverlay}>
            <View style={s.modalCard}>
              <Text style={s.modalTitle}>Exit Quiz?</Text>
              <Text style={s.modalText}>Are you sure? All data will be lost.</Text>

              <View style={s.modalRow}>
                <TouchableOpacity
                  style={[s.modalBtn, s.modalConfirmBtn]}
                  onPress={() => {
                    setShowExitModal(false);
                    navigation.goBack();
                  }}
                >
                  <Text style={s.modalBtnText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[s.modalBtn, s.modalCancelBtn]}
                  onPress={() => setShowExitModal(false)}
                >
                  <Text style={s.modalBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
    paddingHorizontal: isVerySmall ? 14 : 18,
    paddingTop: 28,
    paddingBottom: isVerySmall ? 16 : 20,
  },

  topBar: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isVerySmall ? 14 : 18,
  },

  closeTap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeTapPlaceholder: {
    width: 28,
    height: 28,
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  resultText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
  },

  questionCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(22,8,37,0.88)',
    borderRadius: 14,
    padding: 6,
    marginBottom: isVerySmall ? 20 : 24,
    alignItems: 'center',
  },

  questionImage: {
    width: isVerySmall ? 84 : 96,
    height: isVerySmall ? 58 : 66,
    borderRadius: 8,
  },

  questionContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    minHeight: isVerySmall ? 58 : 66,
  },

  questionText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 11 : 12,
    fontWeight: '600',
    lineHeight: isVerySmall ? 15 : 17,
    textAlign: 'right',
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginLeft: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  dotActive: {
    backgroundColor: '#FFFFFF',
  },

  answersWrap: {
    marginTop: isVerySmall ? 10 : 14,
  },

  optionBtn: {
    minHeight: isVerySmall ? 42 : 46,
    borderRadius: 10,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    paddingHorizontal: 14,
  },

  optionSelected: {
    borderWidth: 2,
    borderColor: '#2DA1FF',
  },

  optionCorrect: {
    backgroundColor: '#1CB311',
  },

  optionWrong: {
    backgroundColor: '#FF6A6A',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 12 : 13,
    fontWeight: '600',
  },

  bottomBtn: {
    marginTop: isVerySmall ? 2 : 6,
    height: isVerySmall ? 44 : 48,
    borderRadius: 12,
    backgroundColor: '#FF6A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBtnDisabled: {
    opacity: 0.35,
  },

  bottomBtnText: {
    color: '#FFFFFF',
    fontSize: isVerySmall ? 13 : 14,
    fontWeight: '700',
  },

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  modalCard: {
    width: Math.min(width - 48, 320),
    borderRadius: 18,
    backgroundColor: '#25113A',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  modalText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 16,
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  modalBtn: {
    flex: 1,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalConfirmBtn: {
    backgroundColor: '#FF6A6A',
  },

  modalCancelBtn: {
    backgroundColor: '#30B10F',
  },

  modalBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});