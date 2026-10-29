import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  KeyboardState,
  KeyDef,
  Language,
  KeyLayer,
} from './types/keyboard';
import { GboardHeader } from './components/GboardHeader';
import { EditorArea } from './components/EditorArea';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { TashkeelBar } from './components/TashkeelBar';
import { SystemInstallModal } from './components/SystemInstallModal';
import { LayoutComparisonModal } from './components/LayoutComparisonModal';
import { SettingsDrawer } from './components/SettingsDrawer';
import { PHYSICAL_KEY_MAPPINGS } from './data/layouts';
import { soundEngine } from './utils/audio';

export default function App() {
  const [text, setText] = useState<string>('');
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');
  const [fontSize, setFontSize] = useState<number>(20);
  const [isTashkeelOpen, setIsTashkeelOpen] = useState<boolean>(true);
  const [activePhysicalCode, setActivePhysicalCode] = useState<string | null>(null);

  // Modals state
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Core Keyboard state
  const [kbState, setKbState] = useState<KeyboardState>({
    language: 'ar',
    layer: 'default',
    shiftLocked: false,
    soundEnabled: true,
    hapticVisualEnabled: true,
    showPhysicalKeyHints: true,
    showNumberRow: true,
    theme: 'material-dark',
    physicalRemapActive: true,
    arabicNumbersMode: 'eastern',
  });

  const clearHighlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to append or insert character at cursor or end
  const handleInsertChar = useCallback((char: string) => {
    setText((prev) => prev + char);
  }, []);

  const handleBackspace = useCallback(() => {
    setText((prev) => prev.slice(0, -1));
  }, []);

  // Handle virtual key click
  const handleVirtualKeyPress = useCallback(
    (keyDef: KeyDef, overrideOutput?: string) => {
      if (overrideOutput) {
        handleInsertChar(overrideOutput);
        return;
      }

      if (keyDef.type === 'char') {
        const out = keyDef.output || keyDef.label;
        handleInsertChar(out);

        // If shift was active (and not locked), revert to default
        if (kbState.layer === 'shift') {
          setKbState((s) => ({ ...s, layer: 'default' }));
        }
      } else if (keyDef.type === 'action') {
        switch (keyDef.action) {
          case 'space':
            handleInsertChar(' ');
            break;
          case 'backspace':
            handleBackspace();
            break;
          case 'enter':
            handleInsertChar('\n');
            break;
          case 'shift':
            setKbState((s) => ({
              ...s,
              layer: s.layer === 'shift' ? 'default' : 'shift',
            }));
            break;
          case 'symbols':
            setKbState((s) => {
              if (s.layer === 'default' || s.layer === 'shift') {
                return { ...s, layer: 'symbols1' };
              } else if (s.layer === 'symbols1') {
                return { ...s, layer: 'symbols2' };
              } else {
                return { ...s, layer: 'default' };
              }
            });
            break;
          case 'switch-lang':
            setKbState((s) => {
              const nextLang: Language = s.language === 'ar' ? 'en' : 'ar';
              return {
                ...s,
                language: nextLang,
                layer: 'default',
              };
            });
            break;
          case 'tashkeel-toggle':
            setIsTashkeelOpen((prev) => !prev);
            break;
          default:
            break;
        }
      }
    },
    [handleInsertChar, handleBackspace, kbState.layer]
  );

  // Global Physical Keyboard Interceptor (Hardware Typing Hook)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow browser shortcuts like F5, Ctrl+R, Ctrl+Shift+I, etc.
      if (e.ctrlKey || e.metaKey || e.altKey) {
        // Toggle language with Ctrl+Space or Alt+Shift
        if ((e.ctrlKey && e.code === 'Space') || (e.altKey && e.shiftKey)) {
          e.preventDefault();
          setKbState((s) => ({
            ...s,
            language: s.language === 'ar' ? 'en' : 'ar',
            layer: 'default',
          }));
          return;
        }
        return;
      }

      // Check if physical remapping is enabled
      if (!kbState.physicalRemapActive) return;

      // Handle Escape to reset modals
      if (e.key === 'Escape') {
        setIsInstallModalOpen(false);
        setIsComparisonModalOpen(false);
        setIsSettingsOpen(false);
        return;
      }

      // Visual highlight on corresponding key
      setActivePhysicalCode(e.code);
      if (clearHighlightTimeoutRef.current) clearTimeout(clearHighlightTimeoutRef.current);
      clearHighlightTimeoutRef.current = setTimeout(() => {
        setActivePhysicalCode(null);
      }, 150);

      // Handle Space
      if (e.code === 'Space') {
        e.preventDefault();
        if (kbState.soundEnabled) soundEngine.playKeyClick('space');
        handleInsertChar(' ');
        return;
      }

      // Handle Backspace
      if (e.code === 'Backspace') {
        e.preventDefault();
        if (kbState.soundEnabled) soundEngine.playKeyClick('backspace');
        handleBackspace();
        return;
      }

      // Handle Enter
      if (e.code === 'Enter') {
        e.preventDefault();
        if (kbState.soundEnabled) soundEngine.playKeyClick('action');
        handleInsertChar('\n');
        return;
      }

      // Handle Shift modifier key press
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setKbState((s) => ({
          ...s,
          layer: 'shift',
        }));
        return;
      }

      // Look up in Physical Key Mappings table
      const mapping = PHYSICAL_KEY_MAPPINGS.find((m) => m.code === e.code);
      if (mapping) {
        e.preventDefault();
        if (kbState.soundEnabled) soundEngine.playKeyClick('char');

        let charToEmit = '';
        if (kbState.language === 'ar') {
          charToEmit = e.shiftKey ? mapping.arShiftChar : mapping.arChar;
        } else {
          charToEmit = e.shiftKey ? mapping.enShiftChar : mapping.enChar;
        }

        if (charToEmit) {
          handleInsertChar(charToEmit);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setKbState((s) => ({
          ...s,
          layer: 'default',
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [kbState, handleInsertChar, handleBackspace]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <GboardHeader
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenComparisonModal={() => setIsComparisonModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
      />

      {/* Main Studio Viewport */}
      <main className="flex-1 flex flex-col items-center justify-between p-3 md:p-6 max-w-6xl w-full mx-auto">
        {/* Editor & Scratchpad */}
        <EditorArea
          text={text}
          setText={setText}
          direction={direction}
          setDirection={setDirection}
          fontSize={fontSize}
          setFontSize={setFontSize}
          physicalRemapActive={kbState.physicalRemapActive}
          setPhysicalRemapActive={(active) =>
            setKbState((s) => ({ ...s, physicalRemapActive: active }))
          }
          soundEnabled={kbState.soundEnabled}
          onInsertChar={handleInsertChar}
        />

        {/* Tashkeel / Harakat Bar */}
        {kbState.language === 'ar' && (
          <div className="w-full max-w-4xl mb-2">
            <TashkeelBar
              isOpen={isTashkeelOpen}
              onToggle={() => setIsTashkeelOpen(false)}
              onInsertChar={handleInsertChar}
              soundEnabled={kbState.soundEnabled}
            />
          </div>
        )}

        {/* The Google Mobile Virtual Keyboard */}
        <div className="w-full flex justify-center pb-2">
          <VirtualKeyboard
            state={kbState}
            onKeyPress={handleVirtualKeyPress}
            onToggleSound={() =>
              setKbState((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
            }
            onTogglePhysicalHints={() =>
              setKbState((s) => ({
                ...s,
                showPhysicalKeyHints: !s.showPhysicalKeyHints,
              }))
            }
            onToggleNumberRow={() =>
              setKbState((s) => ({ ...s, showNumberRow: !s.showNumberRow }))
            }
            onToggleLanguage={() =>
              setKbState((s) => ({
                ...s,
                language: s.language === 'ar' ? 'en' : 'ar',
                layer: 'default',
              }))
            }
            onToggleTashkeel={() => setIsTashkeelOpen((prev) => !prev)}
            activePhysicalCode={activePhysicalCode}
          />
        </div>
      </main>

      {/* Modals & Dialogs */}
      <SystemInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      <LayoutComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        state={kbState}
        setState={setKbState}
      />
    </div>
  );
}
