import React, { useRef, useEffect } from 'react';
import { Copy, Check, Trash2, Download, Volume2, ZoomIn, ZoomOut, RotateCcw, Keyboard } from 'lucide-react';
import { POPULAR_EMOJIS } from '../data/layouts';
import { soundEngine } from '../utils/audio';

interface EditorAreaProps {
  text: string;
  setText: (newText: string) => void;
  direction: 'rtl' | 'ltr';
  setDirection: (dir: 'rtl' | 'ltr') => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  physicalRemapActive: boolean;
  setPhysicalRemapActive: (active: boolean) => void;
  soundEnabled: boolean;
  onInsertChar: (char: string) => void;
}

export const EditorArea: React.FC<EditorAreaProps> = ({
  text,
  setText,
  direction,
  setDirection,
  fontSize,
  setFontSize,
  physicalRemapActive,
  setPhysicalRemapActive,
  soundEnabled,
  onInsertChar,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto detect direction if user hasn't explicitly forced it
  useEffect(() => {
    if (!text) return;
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
    const firstNonSpace = text.trim().charAt(0);
    if (arabicRegex.test(firstNonSpace)) {
      setDirection('rtl');
    }
  }, [text, setDirection]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (soundEnabled) soundEngine.playKeyClick('action');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gboard-text-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Detect language
    const arabicRegex = /[\u0600-\u06FF]/;
    utterance.lang = arabicRegex.test(text) ? 'ar-SA' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Word count & Char count calculations
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split('\n').length : 0;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden mb-3">
      {/* Scratchpad toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3 md:px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 gap-2">
        {/* Physical PC Hardware Intercept Status Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPhysicalRemapActive(!physicalRemapActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              physicalRemapActive
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
            title="Typing on your hardware physical keyboard will output Google Mobile keys"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>
              {physicalRemapActive ? 'Physical PC Hook: Enabled' : 'Physical PC Hook: Disabled'}
            </span>
          </button>

          {/* Direction toggle */}
          <div className="flex items-center bg-neutral-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setDirection('rtl')}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                direction === 'rtl' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              RTL (يمين)
            </button>
            <button
              type="button"
              onClick={() => setDirection('ltr')}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                direction === 'ltr' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              LTR (يسار)
            </button>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          {/* Font size adjustments */}
          <button
            type="button"
            onClick={() => setFontSize((s) => Math.max(14, s - 2))}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="تصغير الخط (Smaller text)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setFontSize((s) => Math.min(36, s + 2))}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="تكبير الخط (Larger text)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Text-to-speech */}
          <button
            type="button"
            onClick={handleSpeak}
            className={`p-1.5 rounded-lg transition-colors ${
              isSpeaking ? 'bg-amber-500/20 text-amber-400' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            title="نطق النص (Text-to-speech)"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Clear text */}
          <button
            type="button"
            onClick={() => setText('')}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
            title="مسح النص (Clear text)"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Download TXT */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="تحميل كملف نصي (Download .txt)"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 hover:bg-neutral-700 text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative p-2 md:p-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ابدأ الكتابة هنا باستخدام كيبورد جوجل أو لوحة مفاتيح الكمبيوتر الفيزيائية... (Type here using Gboard on-screen or your physical PC keyboard)..."
          dir={direction}
          style={{ fontSize: `${fontSize}px` }}
          className="w-full h-32 md:h-40 p-3 bg-neutral-950/60 text-neutral-100 rounded-xl resize-none border border-neutral-800/80 focus:border-blue-500 focus:outline-none transition-all placeholder:text-neutral-600 font-arabic leading-relaxed"
        />

        {/* Popular Emojis quick bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 mt-1.5 no-scrollbar">
          <span className="text-[11px] text-neutral-500 shrink-0 ml-1">إيموجي سريع:</span>
          {POPULAR_EMOJIS.slice(0, 16).map((emoji, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onInsertChar(emoji)}
              className="text-base p-1 hover:bg-neutral-800 rounded transition-transform active:scale-125 shrink-0"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Footer stats bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-neutral-950/40 border-t border-neutral-800/60 text-[11px] text-neutral-500 font-mono">
        <div className="flex items-center gap-3">
          <span>{charCount} أحرف</span>
          <span>·</span>
          <span>{wordCount} كلمات</span>
          <span>·</span>
          <span>{lineCount} أسطر</span>
        </div>

        <div className="text-right">
          <span>{physicalRemapActive ? 'Physical PC Remap Active (Type naturally!)' : 'Click/tap virtual keys'}</span>
        </div>
      </div>
    </div>
  );
};
