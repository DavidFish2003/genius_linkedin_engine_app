import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../config/systemPrompt';
import userContext from '../config/userContext.json';
import postHistory from '../config/post_history.json';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

const ai = new GoogleGenAI({ apiKey: apiKey !== 'YOUR_GEMINI_API_KEY_HERE' ? apiKey : '' });

const combinedSystemInstruction = `${SYSTEM_PROMPT.trim()}

USER CONTEXT DETAILS:
- Name: ${userContext.name} (${userContext.preferredName})
- Program: ${userContext.program}
- Primary Projects: ${userContext.projects.join(', ')}
- Signature Ending: ${userContext.signature}
- Key Anchors: ${userContext.anchors.join(', ')}
- Local Humor/Phrases: ${userContext.humorPhrases.join(', ')}

FISAYO'S HISTORICAL MILESTONES & PAST VIRAL POST EXAMPLES:
${JSON.stringify(postHistory, null, 2)}
`;

export async function polishDraft(draft: string): Promise<string> {
  if (!draft || !draft.trim()) {
    throw new Error('Please enter a draft first.');
  }

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return `🚀 [POLISHED DRAFT - DEMO MODE]\n\n${draft.trim()}\n\nHere is the truth: most people are living Nepo lives in their own minds until they step up into the Rat Kingdom.\n\nThrough the Principle of Localized Concentration and the Precursor/Conductor Framework, we don't just talk about Beyond Pathways—we build it.\n\nKeep stirring the pot of stew.\n\nG E N I U S.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Refine, polish, and structure this LinkedIn post draft. Short punchy lines, strong hook, keep local humor ("living Nepo lives", "pot of stew", "Rat Kingdom"), line breaks, and finish with "G E N I U S.":\n\n${draft}`,
      config: {
        systemInstruction: combinedSystemInstruction,
        temperature: 0.7,
      },
    });

    return response.text?.trim() || 'No output generated.';
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    throw new Error(err.message || 'Failed to polish draft using Gemini Engine.');
  }
}

export async function formatCarousel(draft: string): Promise<string> {
  if (!draft || !draft.trim()) {
    throw new Error('Please enter a draft first.');
  }

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return `🎡 [CAROUSEL OUTLINE - DEMO MODE]\n\nSLIDE 1: The Precursor/Conductor Paradox\n• Stop living Nepo lives.\n• Real progress happens in the trenches of Beyond Pathways.\n\nSLIDE 2: Principle of Localized Concentration\n• Focus on one pot of stew at a time.\n• Cut out the noise. Double down on raw energy.\n\nSLIDE 3: The Takeaway\n• Action creates momentum, not intention.\n• Don't back down when the heat rises in the Rat Kingdom.\n\nSLIDE 4: Final Thought\n• Build with clarity. Execute with authority.\n\nG E N I U S.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Format this draft into a high-converting multi-slide LinkedIn Carousel outline (SLIDE 1, SLIDE 2, SLIDE 3, etc.). Keep my punchy style, anchors, and end with "G E N I U S.":\n\n${draft}`,
      config: {
        systemInstruction: combinedSystemInstruction,
        temperature: 0.7,
      },
    });

    return response.text?.trim() || 'No output generated.';
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    throw new Error(err.message || 'Failed to format carousel using Gemini Engine.');
  }
}

export async function sharpenHook(draft: string): Promise<string> {
  if (!draft || !draft.trim()) {
    throw new Error('Please enter a draft first.');
  }

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return `🔥 [SHARPENED HOOKS - DEMO MODE]\n\nOPTION 1 (Bold Claim):\n"Most people think they're building an empire—until they realize they're just living Nepo lives."\n\nOPTION 2 (Local Storytelling):\n"If you can't stand the heat in the Rat Kingdom, don't pretend you're cooking a pot of stew."\n\nOPTION 3 (Framework Angle):\n"The Principle of Localized Concentration changed how I build Beyond Pathways forever."\n\n---\nPOLISHED POST:\n${draft.trim()}\n\nG E N I U S.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 3 electrifying LinkedIn hook options for this draft, followed by the polished text ending in "G E N I U S.":\n\n${draft}`,
      config: {
        systemInstruction: combinedSystemInstruction,
        temperature: 0.8,
      },
    });

    return response.text?.trim() || 'No output generated.';
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    throw new Error(err.message || 'Failed to sharpen hook using Gemini Engine.');
  }
}

export async function micDropMode(draft: string): Promise<string> {
  if (!draft || !draft.trim()) {
    throw new Error('Please enter a draft first.');
  }

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return `🎤 [MIC DROP MODE - DEMO MODE]\n\nStop waiting for permission. \n\nIn the Precursor/Conductor Framework, talk is cheap. Results are loud. \n\nWhile others are living Nepo lives, we are down here in the Rat Kingdom stirring a pot of stew that will feed generations.\n\nThat is Beyond Pathways. \n\nNo fluff. No apology. \n\nG E N I U S.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Transform this draft into an intense, punchy, high-conviction "Mic Drop" statement post. Ultra-short sentences, uncompromising voice, local humor preserved, ending with "G E N I U S.":\n\n${draft}`,
      config: {
        systemInstruction: combinedSystemInstruction,
        temperature: 0.85,
      },
    });

    return response.text?.trim() || 'No output generated.';
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    throw new Error(err.message || 'Failed to run Mic Drop Mode using Gemini Engine.');
  }
}
