import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { articles } from '../../data/articlesData';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 700;
const SAVED_ARTICLES_KEY = 'saved_articles_ids';

export default function StonesScreen() {
  const navigation = useNavigation<NavProp>();
  const [saved, setSaved] = useState<string[]>([]);

  const loadSaved = async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
      if (raw) {
        setSaved(JSON.parse(raw));
      } else {
        setSaved([]);
      }
    } catch {
      setSaved([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [])
  );

  const toggleSave = async (id: string) => {
    try {
      const updated = saved.includes(id)
        ? saved.filter(item => item !== id)
        : [...saved, id];

      setSaved(updated);
      await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updated));
    } catch {}
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <Text style={s.header}>Articles</Text>

        <FlatList
          data={articles}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.list}
          renderItem={({ item }) => {
            const isSavedItem = saved.includes(item.id);

            return (
              <View style={s.card}>
                <Image source={item.image} style={s.cardImage} resizeMode="cover" />

                <View style={s.cardBody}>
                  <Text style={s.cardTitle}>{item.title}</Text>

                  <View style={s.cardRow}>
                    <TouchableOpacity
                      style={s.readBtn}
                      onPress={() => navigation.navigate('StoneDetail', { id: item.id })}
                    >
                      <Text style={s.readBtnText}>Read</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[s.saveBtn, isSavedItem && s.saveBtnActive]}
                      onPress={() => toggleSave(item.id)}
                    >
                      <Text style={s.saveBtnIcon}>{isSavedItem ? '✓' : '🔖'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0a1e',
  },

  container: {
    flex: 1,
    paddingHorizontal: isSmall ? 14 : 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },

  header: {
    fontSize: isSmall ? 22 : 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 16,
  },

  list: {
    paddingBottom: Platform.OS === 'android' ? 164 : 104,
    gap: 12,
  },

  card: {
    backgroundColor: '#1a1133',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },

  cardImage: {
    width: isSmall ? 82 : 90,
    height: isSmall ? 82 : 90,
  },

  cardBody: {
    flex: 1,
    paddingHorizontal: isSmall ? 10 : 12,
    paddingVertical: isSmall ? 9 : 10,
    gap: isSmall ? 8 : 10,
  },

  cardTitle: {
    fontSize: isSmall ? 13 : 14,
    fontWeight: '700',
    color: '#fff',
    lineHeight: isSmall ? 18 : 20,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  readBtn: {
    backgroundColor: '#f97316',
    paddingHorizontal: isSmall ? 16 : 20,
    paddingVertical: isSmall ? 6 : 7,
    borderRadius: 20,
  },

  readBtnText: {
    color: '#fff',
    fontSize: isSmall ? 12 : 13,
    fontWeight: '700',
  },

  saveBtn: {
    width: isSmall ? 32 : 34,
    height: isSmall ? 32 : 34,
    borderRadius: isSmall ? 16 : 17,
    backgroundColor: '#2d1f4e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveBtnActive: {
    backgroundColor: '#4c3a8a',
  },

  saveBtnIcon: {
    fontSize: isSmall ? 14 : 16,
    color: '#fff',
  },
});