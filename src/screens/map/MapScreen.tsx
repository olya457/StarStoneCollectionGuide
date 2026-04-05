import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { locations, Location } from '../../data/locationsData';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 700;

const INITIAL_REGION: Region = {
  latitude: 47.0,
  longitude: -91.2,
  latitudeDelta: 2.5,
  longitudeDelta: 2.5,
};

export default function MapScreen() {
  const navigation = useNavigation<NavProp>();
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<Location | null>(null);

  const handleMarkerPress = (loc: Location) => {
    setSelected(loc);

    const [lat, lng] = loc.coordinates.split(',').map(s => parseFloat(s.trim()));

    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      },
      400
    );
  };

  const zoomIn = async () => {
    const cam = await mapRef.current?.getCamera();
    if (!cam) return;

    mapRef.current?.animateCamera(
      { ...cam, zoom: (cam.zoom ?? 10) + 1 },
      { duration: 300 }
    );
  };

  const zoomOut = async () => {
    const cam = await mapRef.current?.getCamera();
    if (!cam) return;

    mapRef.current?.animateCamera(
      { ...cam, zoom: (cam.zoom ?? 10) - 1 },
      { duration: 300 }
    );
  };

  const resetMap = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 400);
    setSelected(null);
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <MapView
          ref={mapRef}
          style={s.map}
          initialRegion={INITIAL_REGION}
        >
          {locations.map(loc => {
            const [lat, lng] = loc.coordinates.split(',').map(s => parseFloat(s.trim()));

            return (
              <Marker
                key={loc.id}
                coordinate={{ latitude: lat, longitude: lng }}
                onPress={() => handleMarkerPress(loc)}
              />
            );
          })}
        </MapView>

        <View style={s.controls}>
          <TouchableOpacity style={s.ctrlBtn} onPress={zoomIn}>
            <Text style={s.ctrlText}>+</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          <TouchableOpacity style={s.ctrlBtn} onPress={zoomOut}>
            <Text style={s.ctrlText}>−</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          <TouchableOpacity style={s.ctrlBtn} onPress={resetMap}>
            <Text style={s.ctrlText}>◎</Text>
          </TouchableOpacity>
        </View>

        {selected && (
          <View style={s.popup}>
            <Image source={selected.image} style={s.popupImage} />

            <View style={s.popupBody}>
              <Text style={s.popupTitle}>{selected.name}</Text>
              <Text style={s.popupCoords}>📍 {selected.coordinates}</Text>

              <View style={s.btnRow}>
                <TouchableOpacity
                  style={s.openBtn}
                  onPress={() => {
                    const id = selected.id;
                    setSelected(null);
                    navigation.navigate('LocationDetail', { id });
                  }}
                >
                  <Text style={s.openText}>Open</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.closeBtn}
                  onPress={() => setSelected(null)}
                >
                  <Text style={s.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
  },

  map: {
    flex: 1,
  },

  controls: {
    position: 'absolute',
    right: 16,
    top: '40%',
    backgroundColor: '#1a1133',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
  },

  ctrlBtn: {
    width: isSmall ? 42 : 46,
    height: isSmall ? 42 : 46,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ctrlText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  popup: {
    position: 'absolute',
    top: '50%',
    left: 16,
    right: 16,
    transform: [{ translateY: -110 }],
    borderRadius: 20,
    backgroundColor: '#1a1133',
    overflow: 'hidden',
    elevation: 10,
  },

  popupImage: {
    width: '100%',
    height: isSmall ? 120 : 140,
  },

  popupBody: {
    padding: 16,
  },

  popupTitle: {
    fontSize: isSmall ? 15 : 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },

  popupCoords: {
    fontSize: isSmall ? 11 : 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },

  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },

  openBtn: {
    flex: 1,
    backgroundColor: '#f97316',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  closeBtn: {
    flex: 1,
    backgroundColor: '#2d1f4e',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  openText: {
    color: '#fff',
    fontWeight: '700',
  },

  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});