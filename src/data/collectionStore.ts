import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLLECTION_KEY = 'stone_collection_items';

export type CollectionItem = {
  id: string;
  stoneId?: string;
  locationId?: string;
  stoneName: string;
  locationName: string;
  date: string;
  stoneImage?: any;
  imageUri?: string;
  source: 'location' | 'custom';
};

let collectionState: CollectionItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach(listener => listener());
}

async function persist() {
  try {
    await AsyncStorage.setItem(COLLECTION_KEY, JSON.stringify(collectionState));
  } catch {}
}

async function hydrate() {
  try {
    const raw = await AsyncStorage.getItem(COLLECTION_KEY);
    if (raw) {
      collectionState = JSON.parse(raw);
      emit();
    }
  } catch {}
}

void hydrate();

export function subscribeCollection(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getCollection() {
  return collectionState;
}

export function useCollection() {
  const [items, setItems] = useState<CollectionItem[]>(collectionState);

  useEffect(() => {
    const sync = () => {
      setItems([...collectionState]);
    };

    sync();

    const unsubscribe = subscribeCollection(sync);

    return () => {
      unsubscribe();
    };
  }, []);

  return items;
}

function makeTodayDate() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = String(now.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
}

export function isInCollection(stoneId: string, locationId: string) {
  return collectionState.some(
    item => item.stoneId === stoneId && item.locationId === locationId
  );
}

export async function addToCollection(params: {
  stoneId: string;
  stoneName: string;
  stoneImage: any;
  locationId: string;
  locationName: string;
}) {
  const exists = collectionState.some(
    item => item.stoneId === params.stoneId && item.locationId === params.locationId
  );

  if (exists) {
    return;
  }

  collectionState = [
    {
      id: `${params.stoneId}-${params.locationId}`,
      stoneId: params.stoneId,
      stoneName: params.stoneName,
      stoneImage: params.stoneImage,
      locationId: params.locationId,
      locationName: params.locationName,
      date: makeTodayDate(),
      source: 'location',
    },
    ...collectionState,
  ];

  emit();
  await persist();
}

export async function addCustomCollectionItem(params: {
  stoneName: string;
  locationName: string;
  date: string;
  imageUri?: string;
}) {
  collectionState = [
    {
      id: `custom-${Date.now()}`,
      stoneName: params.stoneName.trim(),
      locationName: params.locationName.trim(),
      date: params.date.trim(),
      imageUri: params.imageUri,
      source: 'custom',
    },
    ...collectionState,
  ];

  emit();
  await persist();
}

export async function updateCollectionItem(
  id: string,
  updates: {
    stoneName: string;
    locationName: string;
    date: string;
    imageUri?: string;
  }
) {
  collectionState = collectionState.map(item =>
    item.id === id
      ? {
          ...item,
          stoneName: updates.stoneName.trim(),
          locationName: updates.locationName.trim(),
          date: updates.date.trim(),
          imageUri: updates.imageUri,
        }
      : item
  );

  emit();
  await persist();
}

export async function removeFromCollection(stoneId: string, locationId: string) {
  collectionState = collectionState.filter(
    item => !(item.stoneId === stoneId && item.locationId === locationId)
  );

  emit();
  await persist();
}

export async function removeFromCollectionById(id: string) {
  collectionState = collectionState.filter(item => item.id !== id);
  emit();
  await persist();
}