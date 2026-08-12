import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export type ActionType = 'polish' | 'carousel' | 'hook' | 'micDrop';

interface QuickActionsProps {
  onSelectAction: (type: ActionType) => void;
  activeAction: ActionType | null;
  loading: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSelectAction,
  activeAction,
  loading,
}) => {
  const actions: { id: ActionType; label: string; icon: string; desc: string }[] = [
    { id: 'polish', label: '✨ Polish Draft', icon: 'sparkles', desc: 'Punchy line breaks & signature G E N I U S.' },
    { id: 'carousel', label: '🎡 Format Carousel', icon: 'layers', desc: 'Structured slide breakdown' },
    { id: 'hook', label: '🔥 Sharpen Hook', icon: 'flame', desc: '3 scroll-stopping openers' },
    { id: 'micDrop', label: '🎤 Mic Drop Mode', icon: 'mic', desc: 'Raw energy & conviction' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>SELECT GENIUS ACTION</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((act) => {
          const isActive = activeAction === act.id && loading;

          return (
            <TouchableOpacity
              key={act.id}
              style={[
                styles.chip,
                activeAction === act.id && styles.chipSelected,
              ]}
              onPress={() => onSelectAction(act.id)}
              disabled={loading}
            >
              {isActive ? (
                <ActivityIndicator size="small" color="#10b981" style={{ marginRight: 6 }} />
              ) : (
                <Text style={styles.chipText}>{act.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  sectionLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  chip: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
  },
  chipText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '600',
  },
});
