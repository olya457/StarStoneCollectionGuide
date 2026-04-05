import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StonesScreen from '../screens/stones/StonesScreen';
import QuizNavigator from './QuizNavigator';
import LocationsNavigator from './LocationsNavigator';
import MapScreen from '../screens/map/MapScreen';
import SavedScreen from '../screens/saved/SavedScreen';
import CollectionScreen from '../screens/collection/CollectionScreen';

export type TabParamList = {
  Stones: undefined;
  Quiz: undefined;
  Locations: undefined;
  Map: undefined;
  Saved: undefined;
  Collection: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const { height } = Dimensions.get('window');

const isSmall = height < 700;
const bottomOffset = Platform.OS === 'android' ? 30 : 20;

const icons = {
  Stones: require('../assets/icons/stones.png'),
  Quiz: require('../assets/icons/quiz.png'),
  Locations: require('../assets/icons/locations.png'),
  Map: require('../assets/icons/map.png'),
  Saved: require('../assets/icons/saved.png'),
  Collection: require('../assets/icons/collection.png'),
} as const;

function TabBarIcon({
  routeName,
  focused,
}: {
  routeName: keyof typeof icons;
  focused: boolean;
}) {
  return (
    <View style={[s.iconWrap, focused && s.iconWrapActive]}>
      <Image
        source={icons[routeName]}
        style={[s.icon, focused && s.iconActive]}
        resizeMode="contain"
      />
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: bottomOffset,
          height: isSmall ? 74 : 82,
          borderRadius: isSmall ? 28 : 32,
          backgroundColor: '#230836',
          borderWidth: 1.5,
          borderColor: 'rgba(120, 80, 170, 0.65)',
          paddingHorizontal: isSmall ? 10 : 14,
          paddingTop: isSmall ? 10 : 12,
          paddingBottom: isSmall ? 10 : 12,
          elevation: 12,
          shadowColor: '#000000',
          shadowOpacity: 0.28,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 8 },
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            routeName={route.name as keyof typeof icons}
            focused={focused}
          />
        ),
      })}
    >
      <Tab.Screen name="Stones" component={StonesScreen} />
      <Tab.Screen name="Quiz" component={QuizNavigator} />
      <Tab.Screen name="Locations" component={LocationsNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  iconWrap: {
    width: isSmall ? 42 : 46,
    height: isSmall ? 42 : 46,
    borderRadius: isSmall ? 21 : 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 4,
  },

  iconWrapActive: {
    backgroundColor: 'transparent',
  },

  icon: {
    width: isSmall ? 24 : 28,
    height: isSmall ? 24 : 28,
    tintColor: '#F4F1F8',
  },

  iconActive: {
    tintColor: '#FF00B8',
  },
});