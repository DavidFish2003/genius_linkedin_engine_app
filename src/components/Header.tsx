import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, scale } from '../utils/responsive';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'GENIUS LinkedIn Studio',
  subtitle = 'Authentic AI Engine for Fisayo',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
      <View style={styles.titleRow}>
        <View style={styles.logoBadge}>
          <Ionicons name="sparkles" size={scale(20)} color="#10b981" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.statusBadge}>
        <View style={styles.greenDot} />
        <Text style={styles.statusText}>Engine Ready 😌</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    flex: 1,
  },
  logoBadge: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: scale(10),
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: '#f8fafc',
    fontSize: moderateScale(17),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subtitleText: {
    color: '#94a3b8',
    fontSize: moderateScale(11),
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    gap: 6,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  statusText: {
    color: '#34d399',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
});
