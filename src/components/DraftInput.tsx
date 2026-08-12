import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

interface DraftInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

export const DraftInput: React.FC<DraftInputProps> = ({
  value,
  onChangeText,
  onClear,
}) => {
  const handlePaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        onChangeText(value ? `${value}\n${text}` : text);
      } else {
        Alert.alert('Clipboard Empty', 'No text found on clipboard.');
      }
    } catch (err) {
      console.error('Clipboard error:', err);
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>RAW DRAFT / IDEAS</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.pasteBtn} onPress={handlePaste}>
            <Ionicons name="clipboard-outline" size={14} color="#10b981" />
            <Text style={styles.pasteText}>Paste Clipboard</Text>
          </TouchableOpacity>

          {value.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={() => { onChangeText(''); onClear?.(); }}>
              <Ionicons name="close-circle" size={14} color="#94a3b8" />
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Write or paste your raw draft, story, or announcement here... (e.g. Beyond Pathways progress, UNILAG research, Rat Kingdom notes)"
        placeholderTextColor="#64748b"
        value={value}
        onChangeText={onChangeText}
        textAlignVertical="top"
      />

      <View style={styles.footerRow}>
        <Text style={styles.counterText}>
          {charCount} chars • {wordCount} words
        </Text>
        <Text style={styles.hintText}>Preserving line breaks & local tone</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  pasteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  pasteText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '600',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  clearText: {
    color: '#94a3b8',
    fontSize: 11,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 12,
    color: '#f8fafc',
    fontSize: 14,
    minHeight: 120,
    maxHeight: 200,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counterText: {
    color: '#64748b',
    fontSize: 11,
  },
  hintText: {
    color: '#475569',
    fontSize: 10,
    fontStyle: 'italic',
  },
});
