import React from 'react';
import { TASHKEEL_MARKS, ARABIC_SPECIAL_LIGATURES } from '../data/layouts';
import { soundEngine } from '../utils/audio';

interface TashkeelBarProps {
  onInsertChar: (char: string) => void;
  soundEnabled: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export const TashkeelBar: React.FC<TashkeelBarProps> = ({
  onInsertChar,
  soundEnabled,
  isOpen,
  onToggle,
}) => {
  if (!isOpen) return null;

  const handleInsert = (char: string) => {
    if (soundEnabled) soundEngine.playKeyClick('char');
    onInsertChar(char);
  };

  return (
    <div className="w-full bg-neutral-900/95 border-b border-neutral-800 p-2 text-sm select-none transition-all duration-150">
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        {/* Tashkeel marks row */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 shrink-0">
            <span className="font-medium text-blue-400">حركات التشكيل:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar flex-1 justify-end">
            {TASHKEEL_MARKS.map((mark, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsert(mark.char)}
                title={`${mark.name} (${mark.sample})`}
                className="h-8 px-2.5 rounded-md bg-neutral-800 hover:bg-neutral-700 active:bg-blue-600 text-neutral-100 hover:text-white transition-all text-base flex items-center justify-center font-arabic border border-neutral-700/60 shrink-0"
              >
                <span className="text-neutral-400 text-xs mr-1 opacity-70">بـ</span>
                <span className="font-bold text-amber-300">{mark.char}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="w-7 h-7 text-xs rounded text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-center shrink-0 ml-1"
            title="إغلاق شريط التشكيل"
          >
            ✕
          </button>
        </div>

        {/* Common Arabic ligatures row */}
        <div className="flex items-center justify-end gap-1 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-xs text-neutral-500 ml-2 shrink-0">عبارات وتراكيب:</span>
          {ARABIC_SPECIAL_LIGATURES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleInsert(item.char)}
              title={item.label}
              className="h-7 px-2 rounded bg-neutral-800/80 hover:bg-neutral-700 text-xs text-neutral-200 hover:text-white transition-colors border border-neutral-700/40 shrink-0 font-arabic"
            >
              {item.char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
