import React, { useMemo } from 'react';
import {
  KeyDef,
  KeyboardState,
  ThemeId,
} from '../types/keyboard';
import {
  GBOARD_ARABIC_ROWS,
  GBOARD_ARABIC_SHIFT_ROWS,
  GBOARD_ENGLISH_ROWS,
  GBOARD_ENGLISH_SHIFT_ROWS,
  GBOARD_SYMBOLS_1_ROWS,
  GBOARD_SYMBOLS_2_ROWS,
  ARABIC_EASTERN_NUMBERS,
  WESTERN_NUMBERS,
} from '../data/layouts';
import { KeyButton } from './KeyButton';
import { Sparkles, Globe, Volume2, VolumeX, Eye, Hash, ArrowUp } from 'lucide-react';

interface VirtualKeyboardProps {
  state: KeyboardState;
  onKeyPress: (key: KeyDef, overrideOutput?: string) => void;
  onToggleSound: () => void;
  onTogglePhysicalHints: () => void;
  onToggleNumberRow: () => void;
  onToggleLanguage: () => void;
  onToggleTashkeel: () => void;
  activePhysicalCode?: string | null;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  state,
  onKeyPress,
  onToggleSound,
  onTogglePhysicalHints,
  onToggleNumberRow,
  onToggleLanguage,
  onToggleTashkeel,
  activePhysicalCode,
}) => {
  // Determine current active layout rows based on language & layer
  const currentRows = useMemo(() => {
    if (state.layer === 'symbols1') {
      return GBOARD_SYMBOLS_1_ROWS;
    }
    if (state.layer === 'symbols2') {
      return GBOARD_SYMBOLS_2_ROWS;
    }

    if (state.language === 'ar') {
      return state.layer === 'shift' ? GBOARD_ARABIC_SHIFT_ROWS : GBOARD_ARABIC_ROWS;
    } else {
      return state.layer === 'shift' ? GBOARD_ENGLISH_SHIFT_ROWS : GBOARD_ENGLISH_ROWS;
    }
  }, [state.language, state.layer]);

  // Determine top number row if enabled
  const numberRow = useMemo(() => {
    if (!state.showNumberRow || state.layer.startsWith('symbols')) return null;
    return state.arabicNumbersMode === 'eastern' && state.language === 'ar'
      ? ARABIC_EASTERN_NUMBERS
      : WESTERN_NUMBERS;
  }, [state.showNumberRow, state.layer, state.arabicNumbersMode, state.language]);

  // Container background by theme
  const getContainerBg = () => {
    switch (state.theme) {
      case 'material-light':
        return 'bg-neutral-100 border-neutral-300';
      case 'amoled-black':
        return 'bg-black border-neutral-800';
      case 'material-you-dynamic':
        return 'bg-slate-900 border-slate-800';
      case 'nordic-blue':
        return 'bg-[#242933] border-[#3B4252]';
      case 'material-dark':
      default:
        return 'bg-neutral-900 border-neutral-800';
    }
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl md:rounded-3xl border shadow-2xl p-2.5 md:p-4 select-none transition-all duration-150 ${getContainerBg()}`}
    >
      {/* Gboard Assistant / Top Utility Strip */}
      <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-neutral-800/60 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          {/* Gboard "G" badge */}
          <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
            G
          </div>
          <span className="font-medium text-neutral-300 hidden sm:inline">
            {state.language === 'ar' ? 'لوحة مفاتيح جوجل (عربي)' : 'Google Keyboard (English)'}
          </span>
          <span className="text-[11px] text-neutral-500 hidden md:inline">
            {state.physicalRemapActive ? 'Physical PC Hook: Active' : 'On-Screen Mode'}
          </span>
        </div>

        {/* Quick Toggles on Gboard top bar */}
        <div className="flex items-center gap-1">
          {/* Language indicator / quick switch */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer text-xs font-semibold"
            title="تبديل اللغة (Switch Language)"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{state.language === 'ar' ? 'عربي' : 'ENG'}</span>
          </button>

          {/* Tashkeel Quick Trigger */}
          {state.language === 'ar' && (
            <button
              type="button"
              onClick={onToggleTashkeel}
              className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-amber-300 transition-colors text-xs font-arabic"
              title="شريط التشكيل السريع"
            >
              َ ُ ِ تشكيل
            </button>
          )}

          {/* Number row toggle */}
          <button
            type="button"
            onClick={onToggleNumberRow}
            className={`p-1.5 rounded-md transition-colors ${
              state.showNumberRow ? 'bg-blue-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            }`}
            title="إظهار/إخفاء صف الأرقام العلوي (Toggle top number row)"
          >
            <Hash className="w-3.5 h-3.5" />
          </button>

          {/* Physical key hints toggle */}
          <button
            type="button"
            onClick={onTogglePhysicalHints}
            className={`p-1.5 rounded-md transition-colors ${
              state.showPhysicalKeyHints ? 'bg-blue-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            }`}
            title="تلميحات أزرار الكيبورد الفيزيائي (Show PC Physical Key letters on keys)"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Audio Click toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-1.5 rounded-md transition-colors ${
              state.soundEnabled ? 'bg-neutral-800 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
            }`}
            title="صوت النقر (Tactile Sound feedback)"
          >
            {state.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Optional Top Number Row */}
      {numberRow && (
        <div className="flex gap-1 md:gap-1.5 mb-1 justify-center">
          {numberRow.map((keyDef) => (
            <KeyButton
              key={keyDef.id}
              keyDef={keyDef}
              onKeyPress={onKeyPress}
              showPhysicalHint={state.showPhysicalKeyHints}
              isPressed={activePhysicalCode === keyDef.code}
              theme={state.theme}
              soundEnabled={state.soundEnabled}
              hapticVisualEnabled={state.hapticVisualEnabled}
            />
          ))}
        </div>
      )}

      {/* Main Gboard Key Rows */}
      <div className="flex flex-col gap-1 md:gap-1.5">
        {currentRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 md:gap-1.5 justify-center w-full">
            {row.map((keyDef) => (
              <KeyButton
                key={keyDef.id}
                keyDef={keyDef}
                onKeyPress={onKeyPress}
                showPhysicalHint={state.showPhysicalKeyHints}
                isPressed={activePhysicalCode === keyDef.code}
                theme={state.theme}
                soundEnabled={state.soundEnabled}
                hapticVisualEnabled={state.hapticVisualEnabled}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
