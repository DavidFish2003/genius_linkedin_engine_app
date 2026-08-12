import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './src/components/Header';
import { DraftInput } from './src/components/DraftInput';
import { QuickActions, ActionType } from './src/components/QuickActions';
import { OutputCard } from './src/components/OutputCard';
import { BottomNavBar, TabType } from './src/components/BottomNavBar';
import { ArchiveScreen, ArchivedPost } from './src/screens/ArchiveScreen';
import { ContextBaseScreen } from './src/screens/ContextBaseScreen';
import {
  polishDraft,
  formatCarousel,
  sharpenHook,
  micDropMode,
} from './src/services/gemini';
import { moderateScale } from './src/utils/responsive';

export default function App() {
  const [draft, setDraft] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [actionTitle, setActionTitle] = useState<string>('GENIUS Output');
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('writer');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [archive, setArchive] = useState<ArchivedPost[]>([
    {
      id: 'demo-1',
      title: '✨ Polish Draft',
      content: `Here is the truth: most people are living Nepo lives in their own minds until they step up into the Rat Kingdom.\n\nThrough the Principle of Localized Concentration and the Precursor/Conductor Framework, we don't just talk about Beyond Pathways—we build it.\n\nKeep stirring the pot of stew.\n\nG E N I U S.`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleAction = async (type: ActionType) => {
    if (!draft.trim()) {
      setErrorMessage('Please enter or paste a draft in the box above first.');
      return;
    }

    setErrorMessage(null);
    setActiveAction(type);
    setLoading(true);

    try {
      let result = '';
      let title = '';

      switch (type) {
        case 'polish':
          title = '✨ Polished Draft';
          result = await polishDraft(draft);
          break;
        case 'carousel':
          title = '🎡 Carousel Outline';
          result = await formatCarousel(draft);
          break;
        case 'hook':
          title = '🔥 Sharpened Hooks';
          result = await sharpenHook(draft);
          break;
        case 'micDrop':
          title = '🎤 Mic Drop Post';
          result = await micDropMode(draft);
          break;
      }

      setOutput(result);
      setActionTitle(title);
    } catch (err: any) {
      console.error('Action failed:', err);
      setErrorMessage(err.message || 'An error occurred while calling GENIUS Engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToArchive = (text: string, title: string) => {
    const newPost: ArchivedPost = {
      id: Date.now().toString(),
      title: title || 'GENIUS Post',
      content: text,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    setArchive((prev) => [newPost, ...prev]);
  };

  const handleLoadIntoDraft = (content: string) => {
    setDraft(content);
    setActiveTab('writer');
  };

  const handleDeleteFromArchive = (id: string) => {
    setArchive((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearArchive = () => {
    setArchive([]);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" translucent={false} />
        <Header title="GENIUS LinkedIn Studio" subtitle="Authentic Voice AI for Fisayo" />

        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {activeTab === 'writer' && (
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Error Banner */}
              {errorMessage && (
                <TouchableOpacity
                  style={styles.errorBanner}
                  onPress={() => setErrorMessage(null)}
                >
                  <Text style={styles.errorText}>{errorMessage}</Text>
                  <Text style={styles.errorDismiss}>Dismiss</Text>
                </TouchableOpacity>
              )}

              {/* Input Box */}
              <DraftInput
                value={draft}
                onChangeText={(text) => {
                  setDraft(text);
                  if (errorMessage) setErrorMessage(null);
                }}
                onClear={() => {
                  setOutput('');
                  setErrorMessage(null);
                }}
              />

              {/* Quick Actions Row */}
              <QuickActions
                onSelectAction={handleAction}
                activeAction={activeAction}
                loading={loading}
              />

              {/* Formatted Output Card */}
              <OutputCard
                output={output}
                actionTitle={actionTitle}
                onSaveToArchive={handleSaveToArchive}
              />
            </ScrollView>
          )}

          {activeTab === 'archive' && (
            <ArchiveScreen
              archive={archive}
              onLoadIntoDraft={handleLoadIntoDraft}
              onDeleteFromArchive={handleDeleteFromArchive}
              onClearArchive={handleClearArchive}
            />
          )}

          {activeTab === 'context' && <ContextBaseScreen />}
        </KeyboardAvoidingView>

        {/* Bottom Navigation */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          archiveCount={archive.length}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: moderateScale(24),
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    borderWidth: 1,
    borderRadius: 8,
    padding: moderateScale(12),
    marginHorizontal: moderateScale(16),
    marginTop: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: moderateScale(12),
    flex: 1,
  },
  errorDismiss: {
    color: '#ef4444',
    fontSize: moderateScale(11),
    fontWeight: '700',
    marginLeft: 8,
  },
});
