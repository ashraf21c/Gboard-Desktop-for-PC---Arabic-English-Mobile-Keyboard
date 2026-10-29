import React from 'react';
import { KeyboardState, ThemeId } from '../types/keyboard';
import { Palette, Volume2, Eye, Hash, Globe, Check } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: KeyboardState;
  setState: React.Dispatch<React.SetStateAction<KeyboardState>>;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  state,
  setState,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeId; name: string; previewClass: string }[] = [
    { id: 'material-dark', name: 'Material Dark (Pixel)', previewClass: 'bg-neutral-800 border-neutral-700' },
    { id: 'material-light', name: 'Material Light (Google Blue)', previewClass: 'bg-neutral-100 text-neutral-900 border-neutral-300' },
    { id: 'amoled-black', name: 'AMOLED Pitch Black', previewClass: 'bg-black border-neutral-800 text-white' },
    { id: 'material-you-dynamic', name: 'Material You Slate', previewClass: 'bg-slate-800 border-slate-700 text-sky-200' },
    { id: 'nordic-blue', name: 'Nordic Frost', previewClass: 'bg-[#2E3440] border-[#434C5E] text-[#ECEFF4]' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Gboard Desktop Preferences</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Theme selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              <span>Gboard Theme (المظهر)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, theme: t.id }))}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    state.theme === t.id
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-xs font-medium">{t.name}</span>
                  {state.theme === t.id && <Check className="w-4 h-4 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Numbers format */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Hash className="w-3.5 h-3.5" />
              <span>Arabic Numbers Format (شكل الأرقام)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, arabicNumbersMode: 'eastern' }))}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  state.arabicNumbersMode === 'eastern'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="text-left">
                  <div className="text-xs font-medium">Eastern Arabic</div>
                  <div className="text-sm font-arabic font-bold text-blue-400 mt-0.5">١ ٢ ٣ ٤ ٥</div>
                </div>
                {state.arabicNumbersMode === 'eastern' && <Check className="w-4 h-4 text-blue-400" />}
              </button>

              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, arabicNumbersMode: 'western' }))}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  state.arabicNumbersMode === 'western'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="text-left">
                  <div className="text-xs font-medium">Western Standard</div>
                  <div className="text-sm font-mono font-bold text-neutral-200 mt-0.5">1 2 3 4 5</div>
                </div>
                {state.arabicNumbersMode === 'western' && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-neutral-800">
            {/* Sound toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-200 block">Sound feedback on keypress</span>
                <span className="text-[11px] text-neutral-500">Subtle Google tactile audio tap</span>
              </div>
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  state.soundEnabled ? 'bg-blue-600 justify-end' : 'bg-neutral-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* Key Popup Animation */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-200 block">Key preview popups</span>
                <span className="text-[11px] text-neutral-500">Android-style magnified letter bubble above key</span>
              </div>
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, hapticVisualEnabled: !s.hapticVisualEnabled }))}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  state.hapticVisualEnabled ? 'bg-blue-600 justify-end' : 'bg-neutral-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* Show PC physical keys on keys */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-200 block">Show PC Hardware key letters</span>
                <span className="text-[11px] text-neutral-500">Displays Q, W, E, R... in key corners for easy orientation</span>
              </div>
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, showPhysicalKeyHints: !s.showPhysicalKeyHints }))}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  state.showPhysicalKeyHints ? 'bg-blue-600 justify-end' : 'bg-neutral-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-800 bg-neutral-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
