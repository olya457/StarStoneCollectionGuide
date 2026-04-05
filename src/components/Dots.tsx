import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  active: number;
  total?: number;
};

export default function Dots({ active, total = 5 }: Props) {
  return (
    <View style={s.row}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[s.dot, i + 1 === active && s.dotActive]} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  row:       { flexDirection: 'row', gap: 6, marginBottom: 4 },
  dot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)' },
  dotActive: { width: 24, backgroundColor: '#f97316' },
});