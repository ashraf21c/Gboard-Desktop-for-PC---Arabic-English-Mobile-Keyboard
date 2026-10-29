export type Language = 'ar' | 'en';

export type KeyLayer = 'default' | 'shift' | 'symbols1' | 'symbols2';

export type ThemeId = 'material-dark' | 'material-light' | 'amoled-black' | 'material-you-dynamic' | 'nordic-blue';

export type KeyAction = 
  | 'shift'
  | 'backspace'
  | 'enter'
  | 'space'
  | 'switch-lang'
  | 'symbols'
  | 'hide-kb'
  | 'emoji'
  | 'tashkeel-toggle'
  | 'copy-all';

export interface KeyDef {
  id: string;
  label: string;
  subLabel?: string;
  code?: string; // Physical keyboard event code (e.g., 'KeyQ', 'Digit1')
  type: 'char' | 'action';
  action?: KeyAction;
  width?: number; // flex basis ratio, default 1
  variants?: string[]; // long-press characters (e.g. ['أ', 'إ', 'آ', 'ء'] for 'ا')
  output?: string; // actual character to emit if different from label
  isSpecial?: boolean; // styled as special key (gray background in Gboard)
}

export interface KeyboardState {
  language: Language;
  layer: KeyLayer;
  shiftLocked: boolean;
  soundEnabled: boolean;
  hapticVisualEnabled: boolean;
  showPhysicalKeyHints: boolean;
  showNumberRow: boolean;
  theme: ThemeId;
  physicalRemapActive: boolean;
  arabicNumbersMode: 'eastern' | 'western'; // '١٢٣' vs '123'
}

export interface PhysicalKeyMapping {
  code: string;
  enChar: string;
  enShiftChar: string;
  arChar: string;
  arShiftChar: string;
  gboardNote?: string;
}
