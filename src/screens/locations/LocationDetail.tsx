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
import { locations } from '../../data/locationsData';
import {
  addToCollection,
  removeFromCollection,
  isInCollection,
  useCollection,
} from '../../data/collectionStore';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetail'>;

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function LocationDetail({ route, navigation }: Props) {
  useCollection();
  const location = locations.find(l => l.id === route.params.id);

  if (!location) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.notFound}>
          <Text style={s.notFoundText}>Location not found</Text>
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        <Image source={location.image} style={s.hero} resizeMode="cover" />

        <View style={s.body}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <Text style={s.title}>{location.name}</Text>
          <Text style={s.coords}>📍 {location.coordinates}</Text>

          <Text style={s.sectionTitle}>Stones at this location</Text>

          <View style={s.stonesGrid}>
            {location.stones.map(stone => {
              const inCol = isInCollection(stone.id, location.id);

              return (
                <View key={stone.id} style={s.stoneCard}>
                  <Image source={stone.image} style={s.stoneImg} resizeMode="contain" />
                  <Text style={s.stoneName}>{stone.name}</Text>

                  <TouchableOpacity
                    style={[s.colBtn, inCol && s.colBtnActive]}
                    onPress={() => {
                      if (inCol) {
                        removeFromCollection(stone.id, location.id);
                      } else {
                        addToCollection({
                          stoneId: stone.id,
                          stoneName: stone.name,
                          stoneImage: stone.image,
                          locationId: location.id,
                          locationName: location.name,
                        });
                      }
                    }}
                  >
                    <Text style={s.colBtnText}>{inCol ? '✓ Saved' : '+ Collection'}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <Text style={s.sectionTitle}>About</Text>
          <Text style={s.description}>{location.description}</Text>
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

  scrollContent: {
    paddingBottom: 100,
  },

  hero: {
    width: '100%',
    height: isSmall ? 220 : 260,
  },

  body: {
    paddingHorizontal: isSmall ? 16 : 20,
    paddingTop: 20,
    paddingBottom: isSmall ? 24 : 28,
  },

  backBtn: {
    marginBottom: 16,
  },

  backBtnText: {
    color: '#a78bfa',
    fontSize: isSmall ? 14 : 15,
    fontWeight: '600',
  },

  title: {
    fontSize: isSmall ? 21 : 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },

  coords: {
    fontSize: isSmall ? 12 : 13,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: isSmall ? 15 : 16,
    fontWeight: '700',
    color: '#a78bfa',
    marginBottom: 14,
  },

  stonesGrid: {
    flexDirection: 'row',
    gap: isSmall ? 10 : 12,
    marginBottom: 28,
    flexWrap: 'wrap',
  },

  stoneCard: {
    backgroundColor: '#1a1133',
    borderRadius: 16,
    padding: isSmall ? 12 : 14,
    alignItems: 'center',
    width: '47%',
    gap: isSmall ? 8 : 10,
  },

  stoneImg: {
    width: isSmall ? 60 : 72,
    height: isSmall ? 60 : 72,
  },

  stoneName: {
    fontSize: isSmall ? 13 : 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },

  colBtn: {
    backgroundColor: '#2d1f4e',
    paddingHorizontal: isSmall ? 10 : 14,
    paddingVertical: isSmall ? 6 : 7,
    borderRadius: 20,
  },

  colBtnActive: {
    backgroundColor: '#4c3a8a',
  },

  colBtnText: {
    color: '#fff',
    fontSize: isSmall ? 11 : 12,
    fontWeight: '600',
  },

  description: {
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