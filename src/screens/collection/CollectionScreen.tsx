import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const { height, width } = Dimensions.get('window');
const isSmall = height < 780;
const isVerySmall = height < 700;
const isTiny = height < 640;

const COLLECTION_STORAGE_KEY = 'stone_collection_items_v4';
const TAB_BAR_LIFT = Platform.OS === 'android' ? 30 : 20;
const FLOATING_BTN_BOTTOM = TAB_BAR_LIFT + (isTiny ? 86 : isVerySmall ? 92 : 100);

type CollectionItem = {
  id: string;
  locationName: string;
  stoneName: string;
  date: string;
  imageUri?: string;
};

type FormState = {
  locationName: string;
  stoneName: string;
  date: string;
  imageUri?: string;
};

const initialForm: FormState = {
  locationName: '',
  stoneName: '',
  date: '',
  imageUri: undefined,
};

const keyboardRows = [
  ['A', 'B', 'C', 'D', 'E', 'F'],
  ['G', 'H', 'I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X'],
  ['Y', 'Z', '.', '-', '/'],
  ['0', '1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', ' ', '⌫'],
];

export default function CollectionScreen() {
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<'locationName' | 'stoneName' | 'date'>('locationName');
  const [form, setForm] = useState<FormState>(initialForm);

  useEffect(() => {
    loadCollection();
  }, []);

  const loadCollection = async () => {
    try {
      const raw = await AsyncStorage.getItem(COLLECTION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CollectionItem[];
        setCollection(Array.isArray(parsed) ? parsed : []);
      } else {
        setCollection([]);
      }
    } catch {
      setCollection([]);
    }
  };

  const saveCollection = async (items: CollectionItem[]) => {
    try {
      setCollection(items);
      await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  };

  const resetEditor = () => {
    setShowEditor(false);
    setEditingItem(null);
    setForm(initialForm);
    setActiveField('locationName');
  };

  const openAddModal = () => {
    setEditingItem(null);
    setForm(initialForm);
    setActiveField('locationName');
    setShowEditor(true);
  };

  const openEditModal = (item: CollectionItem) => {
    setEditingItem(item);
    setForm({
      locationName: item.locationName,
      stoneName: item.stoneName,
      date: item.date,
      imageUri: item.imageUri,
    });
    setActiveField('locationName');
    setShowEditor(true);
  };

  const closeEditor = () => {
    resetEditor();
  };

  const handleKeyboardPress = (value: string) => {
    setForm(prev => {
      if (value === '⌫') {
        return {
          ...prev,
          [activeField]: prev[activeField].slice(0, -1),
        };
      }

      return {
        ...prev,
        [activeField]: prev[activeField] + value,
      };
    });
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      if (typeof Platform.Version === 'number' && Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }

      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const pickImage = async () => {
    const granted = await requestGalleryPermission();

    if (!granted) {
      Alert.alert('Permission needed', 'Please allow access to your gallery.');
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
    });

    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setForm(prev => ({ ...prev, imageUri: uri }));
    }
  };

  const handleSave = async () => {
    if (!form.locationName.trim() || !form.stoneName.trim() || !form.date.trim()) {
      Alert.alert('Fill all fields', 'Please enter location, rock, and date.');
      return;
    }

    if (editingItem) {
      const updated = collection.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              locationName: form.locationName.trim(),
              stoneName: form.stoneName.trim(),
              date: form.date.trim(),
              imageUri: form.imageUri,
            }
          : item
      );

      await saveCollection(updated);
    } else {
      const newItem: CollectionItem = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        locationName: form.locationName.trim(),
        stoneName: form.stoneName.trim(),
        date: form.date.trim(),
        imageUri: form.imageUri,
      };

      await saveCollection([newItem, ...collection]);
    }

    resetEditor();
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) {
      return;
    }

    const updated = collection.filter(item => item.id !== pendingDeleteId);
    await saveCollection(updated);
    setPendingDeleteId(null);
    setShowDeleteModal(false);
  };

  const renderCard = ({ item }: { item: CollectionItem }) => {
    return (
      <View style={s.card}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={s.cardImage} resizeMode="cover" />
        ) : (
          <View style={s.cardImagePlaceholder}>
            <Text style={s.cardImagePlaceholderText}>No Photo</Text>
          </View>
        )}

        <Text style={s.cardLocation} numberOfLines={1}>
          {item.locationName}
        </Text>

        <Text style={s.cardStone} numberOfLines={1}>
          {item.stoneName}
        </Text>

        <Text style={s.cardDate} numberOfLines={1}>
          {item.date}
        </Text>

        <TouchableOpacity style={s.editBtn} onPress={() => openEditModal(item)}>
          <Text style={s.editBtnText}>✎</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.deleteBtn}
          onPress={() => {
            setPendingDeleteId(item.id);
            setShowDeleteModal(true);
          }}
        >
          <Text style={s.deleteBtnText}>🗑</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onboard_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.safe}>
        <View style={s.overlay} />

        {collection.length === 0 ? (
          <View style={s.emptyWrap}>
            <Image
              source={require('../../assets/images/onboard6.png')}
              style={s.emptyImage}
              resizeMode="cover"
            />

            <Text style={s.emptyTitle}>Your Collection Is Empty</Text>

            <Text style={s.emptySub}>
              Complete a challenge or add a stone to begin your collection.
            </Text>

            <TouchableOpacity style={s.addMainBtn} onPress={openAddModal}>
              <Text style={s.addMainBtnText}>Add the Trophy</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={s.container}>
            <FlatList
              data={collection}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={s.list}
              renderItem={renderCard}
            />

            <TouchableOpacity style={s.floatingAddBtn} onPress={openAddModal}>
              <Text style={s.floatingAddBtnText}>＋</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={showEditor}
          transparent
          animationType="fade"
          onRequestClose={closeEditor}
        >
          <View style={s.modalOverlay}>
            <View style={s.modalContent}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.modalScroll}
              >
                <View style={s.editorCard}>
                  <TouchableOpacity style={s.imagePicker} onPress={pickImage}>
                    {form.imageUri ? (
                      <Image source={{ uri: form.imageUri }} style={s.editorImage} resizeMode="cover" />
                    ) : (
                      <View style={s.imagePlaceholderInner}>
                        <Text style={s.imagePlaceholderIcon}>🖼</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <View style={s.formRow}>
                    <Text style={s.fieldLabel}>Location</Text>
                    <TouchableOpacity
                      style={[s.fieldBox, activeField === 'locationName' && s.fieldBoxActive]}
                      onPress={() => setActiveField('locationName')}
                      activeOpacity={0.8}
                    >
                      <Text style={[s.fieldValue, !form.locationName && s.fieldPlaceholder]} numberOfLines={1}>
                        {form.locationName || 'Type here...'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={s.formRow}>
                    <Text style={s.fieldLabel}>Rock</Text>
                    <TouchableOpacity
                      style={[s.fieldBox, activeField === 'stoneName' && s.fieldBoxActive]}
                      onPress={() => setActiveField('stoneName')}
                      activeOpacity={0.8}
                    >
                      <Text style={[s.fieldValue, !form.stoneName && s.fieldPlaceholder]} numberOfLines={1}>
                        {form.stoneName || 'Type here...'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={s.formRow}>
                    <Text style={s.fieldLabel}>Date</Text>
                    <TouchableOpacity
                      style={[s.fieldBox, activeField === 'date' && s.fieldBoxActive]}
                      onPress={() => setActiveField('date')}
                      activeOpacity={0.8}
                    >
                      <Text style={[s.fieldValue, !form.date && s.fieldPlaceholder]} numberOfLines={1}>
                        {form.date || 'Type here...'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    s.saveBtn,
                    (!form.locationName.trim() || !form.stoneName.trim() || !form.date.trim()) &&
                      s.saveBtnDisabled,
                  ]}
                  onPress={handleSave}
                  disabled={!form.locationName.trim() || !form.stoneName.trim() || !form.date.trim()}
                  activeOpacity={0.8}
                >
                  <Text style={s.saveBtnText}>
                    {editingItem ? 'Save' : 'Add to the Collection'}
                  </Text>
                </TouchableOpacity>

                <View style={s.keyboardWrap}>
                  {keyboardRows.map((row, rowIndex) => (
                    <View key={rowIndex} style={s.keyboardRow}>
                      {row.map(key => (
                        <TouchableOpacity
                          key={key}
                          style={[s.keyBtn, key === ' ' && s.spaceKey, key === '⌫' && s.backspaceKey]}
                          onPress={() => handleKeyboardPress(key)}
                          activeOpacity={0.8}
                        >
                          <Text style={s.keyText}>{key === ' ' ? 'Space' : key}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={s.bottomCloseBtn} onPress={closeEditor} activeOpacity={0.8}>
                  <Text style={s.bottomCloseBtnText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showDeleteModal}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setPendingDeleteId(null);
            setShowDeleteModal(false);
          }}
        >
          <View style={s.alertOverlay}>
            <View style={s.alertCard}>
              <Text style={s.alertTitle}>Remove This Photo?</Text>
              <Text style={s.alertText}>
                It will be permanently deleted from your collection.
              </Text>

              <View style={s.alertButtons}>
                <TouchableOpacity style={s.alertConfirmBtn} onPress={confirmDelete} activeOpacity={0.8}>
                  <Text style={s.alertBtnText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.alertCancelBtn}
                  onPress={() => {
                    setPendingDeleteId(null);
                    setShowDeleteModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={s.alertBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(35,18,53,0.28)',
  },

  container: {
    flex: 1,
    paddingTop: isTiny ? 12 : isVerySmall ? 14 : 20,
    paddingHorizontal: isTiny ? 10 : isVerySmall ? 12 : isSmall ? 14 : 18,
  },

  list: {
    paddingBottom: FLOATING_BTN_BOTTOM + (isTiny ? 74 : 82),
  },

  card: {
    backgroundColor: '#231241',
    borderRadius: 18,
    paddingTop: isTiny ? 10 : 12,
    paddingBottom: isTiny ? 12 : isVerySmall ? 14 : 16,
    paddingHorizontal: isTiny ? 10 : isVerySmall ? 12 : 14,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(120,110,255,0.18)',
    marginBottom: isTiny ? 10 : isVerySmall ? 12 : 14,
  },

  cardImage: {
    width: isTiny ? 92 : isVerySmall ? 96 : 110,
    height: isTiny ? 68 : isVerySmall ? 74 : 82,
    borderRadius: 6,
    marginBottom: 10,
  },

  cardImagePlaceholder: {
    width: isTiny ? 92 : isVerySmall ? 96 : 110,
    height: isTiny ? 68 : isVerySmall ? 74 : 82,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#352258',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImagePlaceholderText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },

  cardLocation: {
    color: '#fff',
    fontSize: isTiny ? 12 : isVerySmall ? 13 : 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },

  cardStone: {
    color: '#fff',
    fontSize: isTiny ? 13 : isVerySmall ? 14 : 15,
    marginBottom: 4,
  },

  cardDate: {
    color: '#fff',
    fontSize: isTiny ? 11 : isVerySmall ? 12 : 13,
  },

  editBtn: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#6f73ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  deleteBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#6f73ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteBtnText: {
    fontSize: 11,
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: isTiny ? 28 : isVerySmall ? 36 : 50,
  },

  emptyImage: {
    width: isTiny ? width * 0.58 : isVerySmall ? width * 0.62 : isSmall ? 250 : 290,
    height: isTiny ? 220 : isVerySmall ? 250 : isSmall ? 280 : 320,
    borderRadius: 22,
    marginBottom: isTiny ? 14 : isVerySmall ? 18 : 26,
  },

  emptyTitle: {
    color: '#fff',
    fontSize: isTiny ? 22 : isVerySmall ? 24 : isSmall ? 26 : 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },

  emptySub: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: isTiny ? 11 : isVerySmall ? 12 : isSmall ? 13 : 15,
    lineHeight: isTiny ? 16 : isVerySmall ? 18 : isSmall ? 20 : 23,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 300,
  },

  addMainBtn: {
    minWidth: isTiny ? 170 : isVerySmall ? 180 : isSmall ? 190 : 220,
    height: isTiny ? 42 : isVerySmall ? 44 : isSmall ? 46 : 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7a1c',
    paddingHorizontal: 24,
  },

  addMainBtnText: {
    color: '#fff',
    fontSize: isTiny ? 12 : isVerySmall ? 13 : isSmall ? 14 : 15,
    fontWeight: '700',
  },

  floatingAddBtn: {
    position: 'absolute',
    right: 18,
    bottom: FLOATING_BTN_BOTTOM,
    width: isTiny ? 48 : isVerySmall ? 52 : 58,
    height: isTiny ? 48 : isVerySmall ? 52 : 58,
    borderRadius: isTiny ? 24 : isVerySmall ? 26 : 29,
    backgroundColor: '#ff7a1c',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  floatingAddBtnText: {
    color: '#fff',
    fontSize: isTiny ? 22 : isVerySmall ? 24 : 28,
    fontWeight: '600',
    marginTop: -2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(12,8,22,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isTiny ? 10 : isVerySmall ? 12 : 18,
    paddingVertical: isTiny ? 10 : isVerySmall ? 16 : 24,
  },

  modalContent: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '95%',
    backgroundColor: '#2a1643',
    borderRadius: 22,
    padding: isTiny ? 10 : isVerySmall ? 12 : 14,
    borderWidth: 1,
    borderColor: 'rgba(120,110,255,0.16)',
  },

  modalScroll: {
    paddingBottom: 10,
  },

  editorCard: {
    width: '100%',
    backgroundColor: '#24103c',
    borderRadius: 18,
    padding: isTiny ? 10 : isVerySmall ? 12 : 14,
    marginBottom: isTiny ? 10 : 12,
  },

  imagePicker: {
    width: isTiny ? 108 : isVerySmall ? 118 : 132,
    height: isTiny ? 70 : isVerySmall ? 78 : 88,
    borderRadius: 8,
    backgroundColor: '#3a255a',
    alignSelf: 'center',
    marginBottom: isTiny ? 10 : 14,
    overflow: 'hidden',
  },

  editorImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholderInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagePlaceholderIcon: {
    fontSize: isTiny ? 24 : isVerySmall ? 28 : 32,
    color: '#fff',
  },

  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isTiny ? 8 : 10,
  },

  fieldLabel: {
    width: isTiny ? 54 : isVerySmall ? 58 : 64,
    color: '#fff',
    fontSize: isTiny ? 11 : isVerySmall ? 12 : 13,
    fontWeight: '600',
  },

  fieldBox: {
    flex: 1,
    minHeight: isTiny ? 28 : isVerySmall ? 30 : 32,
    borderRadius: 15,
    backgroundColor: '#6f73ff',
    justifyContent: 'center',
    paddingHorizontal: isTiny ? 10 : 12,
  },

  fieldBoxActive: {
    borderWidth: 2,
    borderColor: '#ff7a1c',
  },

  fieldValue: {
    color: '#fff',
    fontSize: isTiny ? 11 : isVerySmall ? 12 : 13,
  },

  fieldPlaceholder: {
    color: 'rgba(255,255,255,0.72)',
    fontStyle: 'italic',
  },

  saveBtn: {
    width: '100%',
    height: isTiny ? 40 : isVerySmall ? 42 : 46,
    borderRadius: 15,
    backgroundColor: '#ff7a1c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isTiny ? 10 : 12,
  },

  saveBtnDisabled: {
    opacity: 0.45,
  },

  saveBtnText: {
    color: '#fff',
    fontSize: isTiny ? 12 : isVerySmall ? 13 : 14,
    fontWeight: '700',
  },

  keyboardWrap: {
    width: '100%',
    backgroundColor: '#24103c',
    borderRadius: 16,
    paddingHorizontal: isTiny ? 6 : isVerySmall ? 7 : 8,
    paddingTop: isTiny ? 6 : isVerySmall ? 7 : 8,
    paddingBottom: isTiny ? 2 : 4,
  },

  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: isTiny ? 4 : 5,
    gap: isTiny ? 3 : 4,
    flexWrap: 'wrap',
  },

  keyBtn: {
    minWidth: isTiny ? 26 : isVerySmall ? 28 : 30,
    height: isTiny ? 24 : isVerySmall ? 25 : 26,
    paddingHorizontal: isTiny ? 4 : 5,
    borderRadius: 7,
    backgroundColor: '#6f73ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  spaceKey: {
    minWidth: isTiny ? 56 : isVerySmall ? 62 : 68,
  },

  backspaceKey: {
    minWidth: isTiny ? 34 : isVerySmall ? 38 : 42,
  },

  keyText: {
    color: '#fff',
    fontSize: isTiny ? 8 : isVerySmall ? 9 : 10,
    fontWeight: '700',
  },

  bottomCloseBtn: {
    marginTop: 12,
    alignSelf: 'center',
    minWidth: 120,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#ff5f57',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  bottomCloseBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(12,8,22,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  alertCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#2a1643',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(120,110,255,0.16)',
  },

  alertTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  alertText: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 16,
  },

  alertButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  alertConfirmBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ff5f57',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertCancelBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#20b312',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});