import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { articles } from '../../data/articlesData';

type Props = NativeStackScreenProps<RootStackParamList, 'StoneDetail'>;

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function StoneDetail({ route, navigation }: Props) {
  const article = articles.find(a => a.id === route.params.id);

  if (!article) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.notFound}>
          <Text style={s.notFoundText}>Article not found</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={s.back}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        <Image source={article.image} style={s.hero} resizeMode="cover" />

        <View style={s.body}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <Text style={s.title}>{article.title}</Text>
          <Text style={s.content}>{article.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0a1e',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  hero: {
    width: '100%',
    height: isSmall ? 220 : 260,
  },

  body: {
    paddingHorizontal: isSmall ? 16 : 20,
    paddingTop: 20,
    paddingBottom: isSmall ? 24 : 32,
  },

  backBtn: {
    marginBottom: 14,
  },

  backBtnText: {
    color: '#a78bfa',
    fontSize: isSmall ? 14 : 15,
    fontWeight: '600',
  },

  title: {
    fontSize: isSmall ? 20 : 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    lineHeight: isSmall ? 28 : 30,
  },

  content: {
    fontSize: isSmall ? 14 : 15,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: isSmall ? 23 : 26,
  },

  notFound: {
    flex: 1,
    backgroundColor: '#0f0a1e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  notFoundText: {
    color: '#fff',
    fontSize: isSmall ? 16 : 18,
    marginBottom: 16,
    textAlign: 'center',
  },

  back: {
    color: '#a78bfa',
    fontSize: isSmall ? 14 : 15,
  },
});