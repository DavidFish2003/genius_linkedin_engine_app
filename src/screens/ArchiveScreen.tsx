import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export interface ArchivedPost {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

interface ArchiveScreenProps {
  archive: ArchivedPost[];
  onLoadIntoDraft: (content: string) => void;
  onDeleteFromArchive: (id: string) => void;
  onClearArchive: () => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
  archive,
  onLoadIntoDraft,
  onDeleteFromArchive,
  onClearArchive,
}) => {
  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  const handleShare = async (text: string) => {
    try {
      await Share.share({ message: text, title: 'GENIUS LinkedIn Post' });
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="archive" size={20} color="#10b981" />
          <Text style={styles.headerTitle}>Saved Post Archive</Text>
        </View>
        {archive.length > 0 && (
          <TouchableOpacity style={styles.clearAllBtn} onPress={onClearArchive}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {archive.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={48} color="#334155" />
          <Text style={styles.emptyTitle}>Archive is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Posts you save from the Writer screen will appear here for easy reuse and scheduling.
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollList} contentContainerStyle={styles.scrollContent}>
          {archive.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.title}</Text>
                </View>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>

              <Text style={styles.cardSnippet} numberOfLines={6}>
                {item.content}
              </Text>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => onLoadIntoDraft(item.content)}
                >
                  <Ionicons name="create-outline" size={14} color="#10b981" />
                  <Text style={[styles.actionBtnText, { color: '#34d399' }]}>Edit in Writer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={() => handleCopy(item.content)}>
                  <Ionicons name="copy-outline" size={14} color="#f8fafc" />
                  <Text style={styles.actionBtnText}>Copy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={() => handleShare(item.content)}>
                  <Ionicons name="share-social-outline" size={14} color="#f8fafc" />
                  <Text style={styles.actionBtnText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => onDeleteFromArchive(item.id)}
                >
                  <Ionicons name="trash-outline" size={14} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  clearAllBtn: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  clearAllText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtitle: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
  },
  timestamp: {
    color: '#64748b',
    fontSize: 11,
  },
  cardSnippet: {
    color: '#f8fafc',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#0f172a',
    paddingTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  actionBtnText: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '600',
  },
  deleteBtn: {
    marginLeft: 'auto',
    backgroundColor: '#0f172a',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
  },
});
