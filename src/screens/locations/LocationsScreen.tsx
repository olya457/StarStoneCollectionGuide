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
import { locations } from '../../data/locationsData';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 700;
const SAVED_LOCATIONS_KEY = 'saved_locations_ids';

export default function LocationsScreen() {
  const navigation = useNavigation<NavProp>();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const loadSaved = async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_LOCATIONS_KEY);
      if (raw) {
        setSavedIds(JSON.parse(raw));
      } else {
        setSavedIds([]);
      }
    } catch {
      setSavedIds([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [])
  );

  const toggleSave = async (id: string) => {
    try {
      const updated = savedIds.includes(id)
        ? savedIds.filter(item => item !== id)
        : [...savedIds, id];

      setSavedIds(updated);
      await AsyncStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updated));
    } catch {}
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <Text style={s.header}>Locations</Text>

        <FlatList
          data={locations}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.list}
          renderItem={({ item }) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <View style={s.card}>
                <Image source={item.image} style={s.cardImage} resizeMode="cover" />
                <View style={s.cardOverlay} />

                <View style={s.cardBody}>
                  <Text style={s.cardName}>{item.name}</Text>
                  <Text style={s.cardCoords}>📍 {item.coordinates}</Text>

                  <View style={s.stonesRow}>
                    {item.stones.map(stone => (
                      <View key={stone.id} style={s.stoneChip}>
                        <Image source={stone.image} style={s.stoneChipImg} />
                        <Text style={s.stoneChipName} numberOfLines={1}>
                          {stone.name}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={s.actionRow}>
                    <TouchableOpacity
                      style={s.openBtn}
                      onPress={() => navigation.navigate('LocationDetail', { id: item.id })}
                    >
                      <Text style={s.openText}>Open</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[s.saveBtn, isSaved && s.saveBtnActive]}
                      onPress={() => toggleSave(item.id)}
                    >
                      <Text style={s.saveText}>{isSaved ? 'Saved' : 'Save'}</Text>
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
    gap: isSmall ? 12 : 14,
  },

  card: {
    borderRadius: 20,
    overflow: 'hidden',
    height: isSmall ? 210 : 228,
  },

  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,5,30,0.55)',
  },

  cardBody: {
    flex: 1,
    padding: isSmall ? 14 : 16,
    justifyContent: 'flex-end',
  },

  cardName: {
    fontSize: isSmall ? 16 : 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },

  cardCoords: {
    fontSize: isSmall ? 11 : 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 10,
  },

  stonesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },

  stoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingHorizontal: isSmall ? 8 : 10,
    paddingVertical: isSmall ? 4 : 5,
    gap: 6,
    maxWidth: '48%',
  },

  stoneChipImg: {
    width: isSmall ? 18 : 20,
    height: isSmall ? 18 : 20,
    borderRadius: isSmall ? 9 : 10,
  },

  stoneChipName: {
    fontSize: isSmall ? 11 : 12,
    color: '#fff',
    fontWeight: '600',
    flexShrink: 1,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },

  openBtn: {
    flex: 1,
    backgroundColor: '#f97316',
    paddingVertical: isSmall ? 9 : 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  openText: {
    color: '#fff',
    fontSize: isSmall ? 12 : 14,
    fontWeight: '700',
  },

  saveBtn: {
    flex: 1,
    backgroundColor: '#2d1f4e',
    paddingVertical: isSmall ? 9 : 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  saveBtnActive: {
    backgroundColor: '#4c3a8a',
  },

  saveText: {
    color: '#fff',
    fontSize: isSmall ? 12 : 14,
    fontWeight: '700',
  },
});