import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabType = 'writer' | 'archive' | 'context';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  archiveCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  archiveCount = 0,
}) => {
  const tabs: { id: TabType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'writer', label: 'Writer', icon: 'create-outline' },
    { id: 'archive', label: 'Archive', icon: 'archive-outline' },
    { id: 'context', label: 'Context Base', icon: 'person-circle-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const iconName = isActive ? (tab.icon.replace('-outline', '') as keyof typeof Ionicons.glyphMap) : tab.icon;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabChange(tab.id)}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={22}
                color={isActive ? '#10b981' : '#64748b'}
              />
              {tab.id === 'archive' && archiveCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{archiveCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    flexDirection: 'row',
    height: 64,
    paddingBottom: 6,
    paddingTop: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#10b981',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#0f172a',
    fontSize: 10,
    fontWeight: '800',
  },
  tabLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 3,
  },
  tabLabelActive: {
    color: '#10b981',
    fontWeight: '700',
  },
});
