import React, { useState, useRef, useEffect } from 'react';
import { KeyDef, ThemeId } from '../types/keyboard';
import { soundEngine } from '../utils/audio';

interface KeyButtonProps {
  keyDef: KeyDef;
  onKeyPress: (key: KeyDef, overrideOutput?: string) => void;
  showPhysicalHint: boolean;
  isPressed?: boolean;
  theme: ThemeId;
  soundEnabled: boolean;
  hapticVisualEnabled: boolean;
}

export const KeyButton: React.FC<KeyButtonProps> = ({
  keyDef,
  onKeyPress,
  showPhysicalHint,
  isPressed = false,
  theme,
  soundEnabled,
  hapticVisualEnabled,
}) => {
  const [showVariants, setShowVariants] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activePress, setActivePress] = useState(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasTriggeredLongPress = useRef(false);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const triggerSound = () => {
    if (!soundEnabled) return;
    if (keyDef.action === 'space') soundEngine.playKeyClick('space');
    else if (keyDef.action === 'backspace') soundEngine.playKeyClick('backspace');
    else if (keyDef.type === 'action') soundEngine.playKeyClick('action');
    else soundEngine.playKeyClick('char');
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setActivePress(true);
    hasTriggeredLongPress.current = false;
    triggerSound();

    if (keyDef.variants && keyDef.variants.length > 0) {
      longPressTimerRef.current = setTimeout(() => {
        hasTriggeredLongPress.current = true;
        setShowVariants(true);
      }, 350); // 350ms long press threshold
    }
  };

  const handlePointerUp = () => {
    setActivePress(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!hasTriggeredLongPress.current && !showVariants) {
      onKeyPress(keyDef);
    }
  };

  const handlePointerLeave = () => {
    setActivePress(false);
    setIsHovered(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const selectVariant = (variantChar: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVariants(false);
    if (soundEnabled) soundEngine.playKeyClick('char');
    onKeyPress(keyDef, variantChar);
  };

  // Styling based on theme
  const getThemeClasses = () => {
    const isSpecial = keyDef.isSpecial;
    const isShiftActive = keyDef.id.includes('shift') && (keyDef.label === '⇪');

    switch (theme) {
      case 'material-light':
        if (isShiftActive) return 'bg-blue-600 text-white shadow-sm';
        if (isSpecial) return 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-400';
        return 'bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 active:bg-blue-50';

      case 'amoled-black':
        if (isShiftActive) return 'bg-blue-500 text-white';
        if (isSpecial) return 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 active:bg-neutral-700 border border-neutral-800';
        return 'bg-neutral-950 text-neutral-100 hover:bg-neutral-900 active:bg-neutral-800 border border-neutral-800/80';

      case 'material-you-dynamic':
        if (isShiftActive) return 'bg-sky-600 text-white';
        if (isSpecial) return 'bg-slate-700/80 text-sky-200 hover:bg-slate-700';
        return 'bg-slate-800 text-slate-100 shadow-sm hover:bg-slate-700/90 active:bg-sky-950';

      case 'nordic-blue':
        if (isShiftActive) return 'bg-teal-500 text-neutral-950';
        if (isSpecial) return 'bg-[#2E3440] text-slate-300 hover:bg-[#3B4252]';
        return 'bg-[#3B4252] text-[#ECEFF4] hover:bg-[#434C5E] active:bg-[#4C566A]';

      case 'material-dark':
      default:
        if (isShiftActive) return 'bg-blue-500 text-white shadow-sm';
        if (isSpecial) return 'bg-neutral-700/90 text-neutral-300 hover:bg-neutral-700 active:bg-neutral-600';
        return 'bg-neutral-800 text-neutral-100 shadow-sm hover:bg-neutral-700/90 active:bg-neutral-700';
    }
  };

  const flexBasis = keyDef.width ? `${keyDef.width * 2.8}rem` : '2.8rem';
  const flexGrow = keyDef.width || 1;

  // Extract clean physical key hint (e.g. 'KeyQ' -> 'Q')
  const getPhysicalKeyShort = () => {
    if (!keyDef.code) return '';
    return keyDef.code
      .replace('Key', '')
      .replace('Digit', '')
      .replace('BracketLeft', '[')
      .replace('BracketRight', ']')
      .replace('Semicolon', ';')
      .replace('Quote', "'")
      .replace('Comma', ',')
      .replace('Period', '.')
      .replace('Slash', '/')
      .replace('Backquote', '`');
  };

  const isActuallyPressed = isPressed || activePress;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        flexGrow,
        flexBasis,
        minWidth: keyDef.action === 'space' ? '8rem' : '2.1rem',
      }}
    >
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={() => setIsHovered(true)}
        className={`w-full h-12 md:h-13 rounded-lg md:rounded-xl font-medium flex flex-col items-center justify-center transition-all duration-75 relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${getThemeClasses()} ${
          isActuallyPressed ? 'scale-95 brightness-125' : ''
        }`}
        aria-label={keyDef.label}
      >
        {/* Physical hardware key hint in corner */}
        {showPhysicalHint && keyDef.code && (
          <span className="absolute top-1 left-1.5 text-[9px] font-mono opacity-40 font-normal leading-none pointer-events-none">
            {getPhysicalKeyShort()}
          </span>
        )}

        {/* Long-press sub-label hint (top right) */}
        {keyDef.subLabel && !showPhysicalHint && (
          <span className="absolute top-1 right-1.5 text-[10px] opacity-40 font-normal leading-none pointer-events-none">
            {keyDef.subLabel}
          </span>
        )}

        {/* Main Key Character / Action Icon */}
        <span
          className={`leading-none select-none ${
            keyDef.label.length > 2
              ? 'text-xs md:text-sm tracking-tight'
              : 'text-base md:text-lg font-normal'
          }`}
        >
          {keyDef.label}
        </span>
      </button>

      {/* Gboard Mobile Key Enlargement Popover (Haptic visual feedback) */}
      {hapticVisualEnabled && isActuallyPressed && keyDef.type === 'char' && !showVariants && (
        <div className="absolute -top-12 z-40 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in-90 duration-75">
          <div className="bg-neutral-800 text-white font-normal text-2xl w-14 h-14 rounded-2xl shadow-2xl border border-neutral-700/60 flex items-center justify-center">
            {keyDef.output || keyDef.label}
          </div>
        </div>
      )}

      {/* Long-press variants popover (e.g. for Alef: أ إ آ ء ٱ) */}
      {showVariants && keyDef.variants && (
        <div
          className="absolute -top-14 z-50 flex items-center gap-1 p-1.5 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-100"
          onMouseLeave={() => setShowVariants(false)}
        >
          {keyDef.variants.map((variantChar, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => selectVariant(variantChar, e)}
              className="w-10 h-10 rounded-lg text-lg font-medium text-white hover:bg-blue-600 active:bg-blue-700 transition-colors flex items-center justify-center bg-neutral-800"
            >
              {variantChar}
            </button>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowVariants(false);
            }}
            className="w-7 h-10 text-xs text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
