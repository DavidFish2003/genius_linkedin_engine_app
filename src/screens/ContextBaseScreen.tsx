import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import userContext from '../config/userContext.json';

export const ContextBaseScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>FD</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>{userContext.name}</Text>
          <Text style={styles.handleText}>@{userContext.preferredName.toLowerCase()} • {userContext.program}</Text>
          <View style={styles.activeTag}>
            <View style={styles.greenDot} />
            <Text style={styles.activeTagText}>GENIUS Persona Active</Text>
          </View>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="rocket-outline" size={18} color="#10b981" />
          <Text style={styles.cardTitle}>Core Projects</Text>
        </View>
        <View style={styles.chipRow}>
          {userContext.projects.map((proj, idx) => (
            <View key={idx} style={styles.projectChip}>
              <Text style={styles.projectChipText}>{proj}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Anchors */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="compass-outline" size={18} color="#10b981" />
          <Text style={styles.cardTitle}>System Anchors & Frameworks</Text>
        </View>
        {userContext.anchors.map((anchor, idx) => (
          <View key={idx} style={styles.anchorItem}>
            <Ionicons name="shield-checkmark" size={14} color="#34d399" />
            <Text style={styles.anchorText}>{anchor}</Text>
          </View>
        ))}
      </View>

      {/* Local Humor & Tone Rules */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="happy-outline" size={18} color="#10b981" />
          <Text style={styles.cardTitle}>Protected Local Humor & Humor Phrases</Text>
        </View>
        <Text style={styles.cardDescription}>
          GENIUS Engine is strictly forbidden from stripping out or dumbing down these signature phrases:
        </Text>
        <View style={styles.humorContainer}>
          {userContext.humorPhrases.map((phrase, idx) => (
            <View key={idx} style={styles.humorChip}>
              <Text style={styles.humorText}>"{phrase}"</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Signature Rule */}
      <View style={[styles.card, styles.signatureCard]}>
        <View style={styles.cardTitleRow}>
          <Ionicons name="ribbon-outline" size={18} color="#10b981" />
          <Text style={styles.cardTitle}>Mandatory Signature Footer</Text>
        </View>
        <Text style={styles.signatureDisplay}>{userContext.signature}</Text>
        <Text style={styles.cardDescription}>
          Every post transformed by GENIUS Engine automatically ends with this signature block.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
    gap: 14,
  },
  profileHeader: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 2,
    borderColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#34d399',
    fontSize: 18,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  nameText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  handleText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  activeTagText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  projectChip: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  projectChipText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '600',
  },
  anchorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#0f172a',
  },
  anchorText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '500',
  },
  humorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  humorChip: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  humorText: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '600',
  },
  signatureCard: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  signatureDisplay: {
    color: '#10b981',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
    marginVertical: 10,
  },
});
