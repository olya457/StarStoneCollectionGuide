import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { articles } from '../../data/articlesData';
import { locations } from '../../data/locationsData';

type TabType = 'locations' | 'articles';

const SAVED_ARTICLES_KEY = 'saved_articles_ids';
const SAVED_LOCATIONS_KEY = 'saved_locations_ids';

export default function SavedScreen() {
  const navigation = useNavigation<any>();
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const isVerySmall = height < 650;
  const isSmall = height < 760;
  const isNarrow = width < 360;

  const [activeTab, setActiveTab] = useState<TabType>('locations');
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [savedLocationIds, setSavedLocationIds] = useState<string[]>([]);

  const horizontalPadding = isNarrow ? 12 : isSmall ? 14 : 16;
  const listBottomPadding =
    Platform.OS === 'android'
      ? tabBarHeight + insets.bottom + (isVerySmall ? 96 : 88)
      : tabBarHeight + insets.bottom + (isVerySmall ? 36 : 28);

  const loadSaved = async () => {
    try {
      const [articlesRaw, locationsRaw] = await Promise.all([
        AsyncStorage.getItem(SAVED_ARTICLES_KEY),
        AsyncStorage.getItem(SAVED_LOCATIONS_KEY),
      ]);

      setSavedArticleIds(articlesRaw ? JSON.parse(articlesRaw) : []);
      setSavedLocationIds(locationsRaw ? JSON.parse(locationsRaw) : []);
    } catch {
      setSavedArticleIds([]);
      setSavedLocationIds([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [])
  );

  const removeSavedArticle = async (id: string) => {
    try {
      const updated = savedArticleIds.filter(item => item !== id);
      setSavedArticleIds(updated);
      await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updated));
    } catch {}
  };

  const removeSavedLocation = async (id: string) => {
    try {
      const updated = savedLocationIds.filter(item => item !== id);
      setSavedLocationIds(updated);
      await AsyncStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const savedArticles = useMemo(() => {
    return articles.filter(item => savedArticleIds.includes(item.id));
  }, [savedArticleIds]);

  const savedLocations = useMemo(() => {
    return locations.filter(item => savedLocationIds.includes(item.id));
  }, [savedLocationIds]);

  const handleExplorePress = () => {
    if (activeTab === 'articles') {
      navigation.navigate('Stones');
    } else {
      navigation.navigate('Locations');
    }
  };

  const renderEmpty = () => {
    const isArticles = activeTab === 'articles';

    return (
      <View
        style={[
          styles.emptyWrap,
          {
            paddingHorizontal: horizontalPadding + 8,
            paddingBottom: listBottomPadding,
            paddingTop: isVerySmall ? 8 : 16,
          },
        ]}
      >
        <Image
          source={
            isArticles
              ? require('../../assets/images/onboard1.png')
              : require('../../assets/images/onboard2.png')
          }
          style={[
            styles.emptyImage,
            {
              width: isVerySmall ? 210 : isSmall ? 240 : 290,
              height: isVerySmall ? 210 : isSmall ? 240 : 290,
              marginBottom: isVerySmall ? 18 : 26,
            },
          ]}
          resizeMode="contain"
        />

        <Text
          style={[
            styles.emptyTitle,
            {
              fontSize: isVerySmall ? 24 : isSmall ? 28 : 34,
              marginBottom: isVerySmall ? 10 : 14,
            },
          ]}
        >
          {isArticles ? 'No Saved Articles' : 'No Saved Locations'}
        </Text>

        <Text
          style={[
            styles.emptySub,
            {
              fontSize: isVerySmall ? 13 : isSmall ? 14 : 16,
              lineHeight: isVerySmall ? 20 : isSmall ? 22 : 24,
              marginBottom: isVerySmall ? 20 : 28,
              maxWidth: isNarrow ? 280 : 320,
            },
          ]}
        >
          {isArticles
            ? 'Add articles to keep your favorite reads in one place.'
            : 'Add locations to your favorites to find them faster.'}
        </Text>

        <TouchableOpacity
          style={[
            styles.emptyBtn,
            {
              minWidth: isVerySmall ? 190 : isSmall ? 210 : 240,
              height: isVerySmall ? 44 : isSmall ? 48 : 52,
            },
          ]}
          onPress={handleExplorePress}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.emptyBtnText,
              { fontSize: isVerySmall ? 14 : isSmall ? 15 : 16 },
            ]}
          >
            {isArticles ? 'Explore Articles' : 'Explore Locations'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderArticleCard = ({ item }: { item: (typeof articles)[number] }) => {
    return (
      <View
        style={[
          styles.card,
          {
            minHeight: isVerySmall ? 108 : isSmall ? 116 : 126,
            padding: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.favoriteBtn,
            {
              left: isVerySmall ? 8 : 10,
              top: isVerySmall ? 8 : 10,
            },
          ]}
          onPress={() => removeSavedArticle(item.id)}
          activeOpacity={0.85}
        >
          <Text style={styles.favoriteIcon}>🤍</Text>
        </TouchableOpacity>

        <Image
          source={item.image}
          style={[
            styles.cardImage,
            {
              width: isVerySmall ? 92 : isSmall ? 112 : 122,
              height: isVerySmall ? 78 : isSmall ? 88 : 96,
              marginRight: isVerySmall ? 10 : 12,
            },
          ]}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: isVerySmall ? 13 : isSmall ? 14 : 15,
                lineHeight: isVerySmall ? 18 : isSmall ? 20 : 22,
                marginBottom: isVerySmall ? 4 : 6,
              },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <View
            style={[
              styles.cardActions,
              {
                gap: isVerySmall ? 8 : 10,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.mainBtn,
                {
                  minWidth: isVerySmall ? 96 : isSmall ? 112 : 122,
                  height: isVerySmall ? 32 : isSmall ? 34 : 38,
                },
              ]}
              onPress={() => navigation.navigate('StoneDetail', { id: item.id })}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.mainBtnText,
                  { fontSize: isVerySmall ? 12 : isSmall ? 13 : 14 },
                ]}
              >
                Read
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.circleBtn,
                {
                  width: isVerySmall ? 28 : isSmall ? 30 : 32,
                  height: isVerySmall ? 28 : isSmall ? 30 : 32,
                  borderRadius: isVerySmall ? 14 : isSmall ? 15 : 16,
                },
              ]}
              onPress={() => navigation.navigate('StoneDetail', { id: item.id })}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.circleBtnText,
                  { fontSize: isVerySmall ? 13 : isSmall ? 14 : 15 },
                ]}
              >
                ↗
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderLocationCard = ({ item }: { item: (typeof locations)[number] }) => {
    return (
      <View
        style={[
          styles.card,
          {
            minHeight: isVerySmall ? 112 : isSmall ? 116 : 126,
            padding: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.favoriteBtn,
            {
              left: isVerySmall ? 8 : 10,
              top: isVerySmall ? 8 : 10,
            },
          ]}
          onPress={() => removeSavedLocation(item.id)}
          activeOpacity={0.85}
        >
          <Text style={styles.favoriteIcon}>🤍</Text>
        </TouchableOpacity>

        <Image
          source={item.image}
          style={[
            styles.cardImage,
            {
              width: isVerySmall ? 92 : isSmall ? 112 : 122,
              height: isVerySmall ? 78 : isSmall ? 88 : 96,
              marginRight: isVerySmall ? 10 : 12,
            },
          ]}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: isVerySmall ? 13 : isSmall ? 14 : 15,
                lineHeight: isVerySmall ? 18 : isSmall ? 20 : 22,
                marginBottom: isVerySmall ? 4 : 6,
              },
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text
            style={[
              styles.cardCoords,
              {
                fontSize: isVerySmall ? 10 : isSmall ? 11 : 12,
                marginBottom: isVerySmall ? 4 : 6,
              },
            ]}
            numberOfLines={1}
          >
            {item.coordinates}
          </Text>

          <View
            style={[
              styles.locationMetaRow,
              {
                gap: isVerySmall ? 8 : 10,
                marginBottom: isVerySmall ? 8 : 10,
              },
            ]}
          >
            <Text style={[styles.metaEmoji, { fontSize: isVerySmall ? 12 : isSmall ? 13 : 14 }]}>
              🧱
            </Text>
            <Text style={[styles.metaEmoji, { fontSize: isVerySmall ? 12 : isSmall ? 13 : 14 }]}>
              ⛰️
            </Text>
          </View>

          <View
            style={[
              styles.cardActions,
              {
                gap: isVerySmall ? 8 : 10,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.mainBtn,
                {
                  minWidth: isVerySmall ? 96 : isSmall ? 112 : 122,
                  height: isVerySmall ? 32 : isSmall ? 34 : 38,
                },
              ]}
              onPress={() => navigation.navigate('LocationDetail', { id: item.id })}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.mainBtnText,
                  { fontSize: isVerySmall ? 12 : isSmall ? 13 : 14 },
                ]}
              >
                Open
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.circleBtn,
                {
                  width: isVerySmall ? 28 : isSmall ? 30 : 32,
                  height: isVerySmall ? 28 : isSmall ? 30 : 32,
                  borderRadius: isVerySmall ? 14 : isSmall ? 15 : 16,
                },
              ]}
              onPress={() => navigation.navigate('LocationDetail', { id: item.id })}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.circleBtnText,
                  { fontSize: isVerySmall ? 13 : isSmall ? 14 : 15 },
                ]}
              >
                ↗
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const isEmpty =
    activeTab === 'articles' ? savedArticles.length === 0 : savedLocations.length === 0;

  return (
    <ImageBackground
      source={require('../../assets/images/onboard_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.overlay} />

        <View
          style={[
            styles.container,
            {
              paddingHorizontal: horizontalPadding,
              paddingTop: isVerySmall ? 12 : 20,
              marginTop: Platform.OS === 'android' ? 20 : 0,
            },
          ]}
        >
          <View
            style={[
              styles.tabsWrap,
              {
                marginBottom: isVerySmall ? 14 : 18,
                borderRadius: isVerySmall ? 14 : 16,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === 'locations' && styles.tabBtnActive,
                {
                  height: isVerySmall ? 40 : isSmall ? 44 : 48,
                  borderRadius: isVerySmall ? 11 : 13,
                },
              ]}
              onPress={() => setActiveTab('locations')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.tabText,
                  { fontSize: isVerySmall ? 13 : isSmall ? 14 : 15 },
                ]}
              >
                Locations
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === 'articles' && styles.tabBtnActive,
                {
                  height: isVerySmall ? 40 : isSmall ? 44 : 48,
                  borderRadius: isVerySmall ? 11 : 13,
                },
              ]}
              onPress={() => setActiveTab('articles')}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.tabText,
                  { fontSize: isVerySmall ? 13 : isSmall ? 14 : 15 },
                ]}
              >
                Articles
              </Text>
            </TouchableOpacity>
          </View>

          {isEmpty ? (
            renderEmpty()
          ) : activeTab === 'articles' ? (
            <FlatList
              data={savedArticles}
              keyExtractor={item => item.id}
              renderItem={renderArticleCard}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: listBottomPadding,
                gap: isVerySmall ? 12 : 14,
              }}
            />
          ) : (
            <FlatList
              data={savedLocations}
              keyExtractor={item => item.id}
              renderItem={renderLocationCard}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: listBottomPadding,
                gap: isVerySmall ? 12 : 14,
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#1b1030',
  },

  safe: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 10, 46, 0.55)',
  },

  container: {
    flex: 1,
  },

  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: 'rgba(117, 132, 255, 0.95)',
    padding: 4,
  },

  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabBtnActive: {
    backgroundColor: '#ef00b8',
  },

  tabText: {
    color: '#fff',
    fontWeight: '700',
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyImage: {},

  emptyTitle: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },

  emptySub: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },

  emptyBtn: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7a1c',
    paddingHorizontal: 24,
  },

  emptyBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  card: {
    backgroundColor: 'rgba(21, 8, 42, 0.92)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  favoriteBtn: {
    position: 'absolute',
    zIndex: 5,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#6f73ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteIcon: {
    fontSize: 13,
    color: '#fff',
  },

  cardImage: {
    borderRadius: 14,
  },

  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 4,
  },

  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },

  cardCoords: {
    color: 'rgba(255,255,255,0.62)',
    textAlign: 'center',
  },

  locationMetaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  metaEmoji: {},

  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },

  mainBtn: {
    borderRadius: 20,
    backgroundColor: '#ff7a1c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  mainBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  circleBtn: {
    backgroundColor: '#6f73ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
});