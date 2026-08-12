import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

interface OutputCardProps {
  output: string;
  actionTitle?: string;
  onSaveToArchive?: (text: string, title: string) => void;
}

export const OutputCard: React.FC<OutputCardProps> = ({
  output,
  actionTitle = 'GENIUS Output',
  onSaveToArchive,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!output) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="sparkles-outline" size={32} color="#334155" />
        <Text style={styles.emptyTitle}>Engine Standby</Text>
        <Text style={styles.emptySubtitle}>
          Enter a draft above and tap a Quick Action to transform it with Fisayo's voice.
        </Text>
      </View>
    );
  }

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: output,
        title: 'GENIUS LinkedIn Post',
      });
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  const handleSave = () => {
    if (onSaveToArchive) {
      onSaveToArchive(output, actionTitle);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color="#10b981" />
          <Text style={styles.badgeText}>{actionTitle}</Text>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.actionBtn, copied && styles.actionBtnActive]}
            onPress={handleCopy}
          >
            <Ionicons
              name={copied ? 'checkmark-done' : 'copy-outline'}
              size={14}
              color={copied ? '#10b981' : '#f8fafc'}
            />
            <Text style={[styles.actionBtnText, copied && { color: '#10b981' }]}>
              {copied ? 'Copied!' : 'Copy'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={14} color="#f8fafc" />
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>

          {onSaveToArchive && (
            <TouchableOpacity
              style={[styles.actionBtn, saved && styles.actionBtnActive]}
              onPress={handleSave}
            >
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={14}
                color={saved ? '#10b981' : '#f8fafc'}
              />
              <Text style={[styles.actionBtnText, saved && { color: '#10b981' }]}>
                {saved ? 'Saved' : 'Archive'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.contentScroll} nestedScrollEnabled>
        <Text style={styles.outputText}>{output}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },
  emptySubtitle: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: 'hidden',
  },
  headerRow: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '700',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  actionBtnActive: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  actionBtnText: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '600',
  },
  contentScroll: {
    maxHeight: 280,
    padding: 14,
  },
  outputText: {
    color: '#f8fafc',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'System',
  },
});
