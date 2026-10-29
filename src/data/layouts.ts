import { KeyDef, PhysicalKeyMapping } from '../types/keyboard';

// Tashkeel / Arabic Harakat
export const TASHKEEL_MARKS = [
  { char: 'َ', name: 'فتحة (Fatha)', sample: 'بَ' },
  { char: 'ً', name: 'تنوين فتح (Tanwin Fath)', sample: 'باً' },
  { char: 'ُ', name: 'ضمة (Damma)', sample: 'بُ' },
  { char: 'ٌ', name: 'تنوين ضم (Tanwin Damm)', sample: 'بٌ' },
  { char: 'ِ', name: 'كسرة (Kasra)', sample: 'بِ' },
  { char: 'ٍ', name: 'تنوين كسر (Tanwin Kasr)', sample: 'بٍ' },
  { char: 'ّ', name: 'شدة (Shadda)', sample: 'بّ' },
  { char: 'ْ', name: 'سكون (Sukun)', sample: 'بْ' },
  { char: 'ـ', name: 'تطويل (Tatweel)', sample: 'بـ' },
  { char: 'ء', name: 'همزة منفصلة (Hamza)', sample: 'ء' },
  { char: 'ٰ', name: 'ألف خنجرية (Superscript Alef)', sample: 'هٰذا' },
];

export const ARABIC_SPECIAL_LIGATURES = [
  { char: 'ﷺ', label: 'صلى الله عليه وسلم' },
  { char: 'ﷻ', label: 'جل جلاله' },
  { char: '﷽', label: 'بسم الله الرحمن الرحيم' },
  { char: 'لله', label: 'لله' },
  { char: 'لا', label: 'لام ألف (Laa)' },
  { char: 'لأ', label: 'لأ (Laa Hamza)' },
  { char: 'لإ', label: 'لإ (Laa Kasra)' },
  { char: 'لآ', label: 'لآ (Laa Madda)' },
];

// Number rows
export const ARABIC_EASTERN_NUMBERS: KeyDef[] = [
  { id: 'num-1', label: '١', subLabel: '1', code: 'Digit1', type: 'char', output: '١' },
  { id: 'num-2', label: '٢', subLabel: '2', code: 'Digit2', type: 'char', output: '٢' },
  { id: 'num-3', label: '٣', subLabel: '3', code: 'Digit3', type: 'char', output: '٣' },
  { id: 'num-4', label: '٤', subLabel: '4', code: 'Digit4', type: 'char', output: '٤' },
  { id: 'num-5', label: '٥', subLabel: '5', code: 'Digit5', type: 'char', output: '٥' },
  { id: 'num-6', label: '٦', subLabel: '6', code: 'Digit6', type: 'char', output: '٦' },
  { id: 'num-7', label: '٧', subLabel: '7', code: 'Digit7', type: 'char', output: '٧' },
  { id: 'num-8', label: '٨', subLabel: '8', code: 'Digit8', type: 'char', output: '٨' },
  { id: 'num-9', label: '٩', subLabel: '9', code: 'Digit9', type: 'char', output: '٩' },
  { id: 'num-0', label: '٠', subLabel: '0', code: 'Digit0', type: 'char', output: '٠' },
];

export const WESTERN_NUMBERS: KeyDef[] = [
  { id: 'num-1', label: '1', code: 'Digit1', type: 'char', output: '1' },
  { id: 'num-2', label: '2', code: 'Digit2', type: 'char', output: '2' },
  { id: 'num-3', label: '3', code: 'Digit3', type: 'char', output: '3' },
  { id: 'num-4', label: '4', code: 'Digit4', type: 'char', output: '4' },
  { id: 'num-5', label: '5', code: 'Digit5', type: 'char', output: '5' },
  { id: 'num-6', label: '6', code: 'Digit6', type: 'char', output: '6' },
  { id: 'num-7', label: '7', code: 'Digit7', type: 'char', output: '7' },
  { id: 'num-8', label: '8', code: 'Digit8', type: 'char', output: '8' },
  { id: 'num-9', label: '9', code: 'Digit9', type: 'char', output: '9' },
  { id: 'num-0', label: '0', code: 'Digit0', type: 'char', output: '0' },
];

// ARABIC GBOARD DEFAULT LETTER ROWS
export const GBOARD_ARABIC_ROWS: KeyDef[][] = [
  // Row 1 (11 keys)
  [
    { id: 'ar-dad', label: 'ض', subLabel: '1', code: 'KeyQ', type: 'char', output: 'ض', variants: ['1', 'َ'] },
    { id: 'ar-sad', label: 'ص', subLabel: '2', code: 'KeyW', type: 'char', output: 'ص', variants: ['2', 'ً'] },
    { id: 'ar-tha', label: 'ث', subLabel: '3', code: 'KeyE', type: 'char', output: 'ث', variants: ['3', 'ُ'] },
    { id: 'ar-qaf', label: 'ق', subLabel: '4', code: 'KeyR', type: 'char', output: 'ق', variants: ['4', 'ٌ'] },
    { id: 'ar-fa', label: 'ف', subLabel: '5', code: 'KeyT', type: 'char', output: 'ف', variants: ['5', 'ڤ'] },
    { id: 'ar-ghayn', label: 'غ', subLabel: '6', code: 'KeyY', type: 'char', output: 'غ', variants: ['6', 'إ'] },
    { id: 'ar-ayn', label: 'ع', subLabel: '7', code: 'KeyU', type: 'char', output: 'ع', variants: ['7', '‘'] },
    { id: 'ar-ha', label: 'ه', subLabel: '8', code: 'KeyI', type: 'char', output: 'ه', variants: ['8', 'ة', 'ـ'] },
    { id: 'ar-kha', label: 'خ', subLabel: '9', code: 'KeyO', type: 'char', output: 'خ', variants: ['9'] },
    { id: 'ar-hha', label: 'ح', subLabel: '0', code: 'KeyP', type: 'char', output: 'ح', variants: ['0'] },
    { id: 'ar-jeem', label: 'ج', subLabel: '-', code: 'BracketLeft', type: 'char', output: 'ج', variants: ['چ', '['] },
    { id: 'ar-dal', label: 'د', subLabel: '=', code: 'BracketRight', type: 'char', output: 'د', variants: [']'] },
  ],
  // Row 2 (11 keys)
  [
    { id: 'ar-sheen', label: 'ش', subLabel: '!', code: 'KeyA', type: 'char', output: 'ش', variants: ['ِ'] },
    { id: 'ar-seen', label: 'س', subLabel: '@', code: 'KeyS', type: 'char', output: 'س', variants: ['ٍ'] },
    { id: 'ar-yaa', label: 'ي', subLabel: '#', code: 'KeyD', type: 'char', output: 'ي', variants: ['ى', 'ئ', 'ي'] },
    { id: 'ar-baa', label: 'ب', subLabel: '$', code: 'KeyF', type: 'char', output: 'ب', variants: ['پ', 'ّ'] },
    { id: 'ar-laam', label: 'ل', subLabel: '%', code: 'KeyG', type: 'char', output: 'ل', variants: ['لا', 'لأ', 'لإ', 'لآ'] },
    { id: 'ar-alef', label: 'ا', subLabel: '^', code: 'KeyH', type: 'char', output: 'ا', variants: ['أ', 'إ', 'آ', 'ء', 'ٱ'] },
    { id: 'ar-taa', label: 'ت', subLabel: '&', code: 'KeyJ', type: 'char', output: 'ت', variants: ['ـ', 'ة'] },
    { id: 'ar-noon', label: 'ن', subLabel: '*', code: 'KeyK', type: 'char', output: 'ن', variants: ['،'] },
    { id: 'ar-meem', label: 'م', subLabel: '(', code: 'KeyL', type: 'char', output: 'م', variants: ['ْ'] },
    { id: 'ar-kaaf', label: 'ك', subLabel: ')', code: 'Semicolon', type: 'char', output: 'ك', variants: ['گ', ':'] },
    { id: 'ar-tah', label: 'ط', subLabel: '"', code: 'Quote', type: 'char', output: 'ط', variants: ['"'] },
  ],
  // Row 3 (Action keys + letters)
  [
    { id: 'ar-dhal', label: 'ذ', subLabel: '~', code: 'Backquote', type: 'char', output: 'ذ', variants: ['~'] },
    { id: 'ar-hamza-yaa', label: 'ئ', code: 'KeyZ', type: 'char', output: 'ئ', variants: ['ى'] },
    { id: 'ar-hamza', label: 'ء', code: 'KeyX', type: 'char', output: 'ء', variants: ['ْ'] },
    { id: 'ar-hamza-waw', label: 'ؤ', code: 'KeyC', type: 'char', output: 'ؤ', variants: ['و'] },
    { id: 'ar-raa', label: 'ر', code: 'KeyV', type: 'char', output: 'ر', variants: ['ز'] },
    { id: 'ar-alef-layina', label: 'ى', code: 'KeyN', type: 'char', output: 'ى', variants: ['ي'] },
    { id: 'ar-taa-marbuta', label: 'ة', code: 'KeyM', type: 'char', output: 'ة', variants: ['ه'] },
    { id: 'ar-waw', label: 'و', code: 'Comma', type: 'char', output: 'و', variants: ['ؤ', '،'] },
    { id: 'ar-zay', label: 'ز', code: 'Period', type: 'char', output: 'ز', variants: ['ژ', '.'] },
    { id: 'ar-zah', label: 'ظ', code: 'Slash', type: 'char', output: 'ظ', variants: ['؟', '/'] },
    { id: 'backspace', label: '⌫', code: 'Backspace', type: 'action', action: 'backspace', width: 1.4, isSpecial: true },
  ],
  // Row 4 (Bottom controls)
  [
    { id: 'sym', label: '?123', type: 'action', action: 'symbols', width: 1.3, isSpecial: true },
    { id: 'tashkeel-btn', label: 'َ ُ ِ', subLabel: 'تشكيل', type: 'action', action: 'tashkeel-toggle', width: 1.1, isSpecial: true },
    { id: 'comma', label: '،', code: 'NumpadComma', type: 'char', output: '،', width: 0.9 },
    { id: 'space', label: 'العربية (Gboard)', code: 'Space', type: 'action', action: 'space', width: 4.2 },
    { id: 'period', label: '.', type: 'char', output: '.', width: 0.9 },
    { id: 'lang', label: '🌐 EN', type: 'action', action: 'switch-lang', width: 1.1, isSpecial: true },
    { id: 'enter', label: '⏎', code: 'Enter', type: 'action', action: 'enter', width: 1.4, isSpecial: true },
  ],
];

// ARABIC SHIFT LAYER (Tashkeel and Hamza variants directly accessible)
export const GBOARD_ARABIC_SHIFT_ROWS: KeyDef[][] = [
  [
    { id: 'ar-sh-fatha', label: 'َ', subLabel: 'فتحة', code: 'KeyQ', type: 'char', output: 'َ' },
    { id: 'ar-sh-tanwin-fath', label: 'ً', subLabel: 'تنوين فتح', code: 'KeyW', type: 'char', output: 'ً' },
    { id: 'ar-sh-damma', label: 'ُ', subLabel: 'ضمة', code: 'KeyE', type: 'char', output: 'ُ' },
    { id: 'ar-sh-tanwin-damm', label: 'ٌ', subLabel: 'تنوين ضم', code: 'KeyR', type: 'char', output: 'ٌ' },
    { id: 'ar-sh-ve', label: 'ڤ', code: 'KeyT', type: 'char', output: 'ڤ' },
    { id: 'ar-sh-alef-kasra', label: 'إ', code: 'KeyY', type: 'char', output: 'إ' },
    { id: 'ar-sh-quote', label: '‘', code: 'KeyU', type: 'char', output: '‘' },
    { id: 'ar-sh-tatweel', label: 'ـ', code: 'KeyI', type: 'char', output: 'ـ' },
    { id: 'ar-sh-bracket-close', label: '}', code: 'KeyO', type: 'char', output: '}' },
    { id: 'ar-sh-bracket-open', label: '{', code: 'KeyP', type: 'char', output: '{' },
    { id: 'ar-sh-che', label: 'چ', code: 'BracketLeft', type: 'char', output: 'چ' },
    { id: 'ar-sh-dal-var', label: '»', code: 'BracketRight', type: 'char', output: '»' },
  ],
  [
    { id: 'ar-sh-kasra', label: 'ِ', subLabel: 'كسرة', code: 'KeyA', type: 'char', output: 'ِ' },
    { id: 'ar-sh-tanwin-kasr', label: 'ٍ', subLabel: 'تنوين كسر', code: 'KeyS', type: 'char', output: 'ٍ' },
    { id: 'ar-sh-alef-madda', label: 'آ', code: 'KeyD', type: 'char', output: 'آ' },
    { id: 'ar-sh-shadda', label: 'ّ', subLabel: 'شدة', code: 'KeyF', type: 'char', output: 'ّ' },
    { id: 'ar-sh-pe', label: 'پ', code: 'KeyG', type: 'char', output: 'پ' },
    { id: 'ar-sh-alef-hamza', label: 'أ', code: 'KeyH', type: 'char', output: 'أ' },
    { id: 'ar-sh-hamza-sep', label: 'ء', code: 'KeyJ', type: 'char', output: 'ء' },
    { id: 'ar-sh-gaf', label: 'گ', code: 'KeyK', type: 'char', output: 'گ' },
    { id: 'ar-sh-sukun', label: 'ْ', subLabel: 'سكون', code: 'KeyL', type: 'char', output: 'ْ' },
    { id: 'ar-sh-colon', label: ':', code: 'Semicolon', type: 'char', output: ':' },
    { id: 'ar-sh-quot', label: '"', code: 'Quote', type: 'char', output: '"' },
  ],
  [
    { id: 'ar-sh-zhe', label: 'ژ', code: 'Backquote', type: 'char', output: 'ژ' },
    { id: 'ar-sh-la-hamza', label: 'لأ', code: 'KeyZ', type: 'char', output: 'لأ' },
    { id: 'ar-sh-la-kasra', label: 'لإ', code: 'KeyX', type: 'char', output: 'لإ' },
    { id: 'ar-sh-la-madda', label: 'لآ', code: 'KeyC', type: 'char', output: 'لآ' },
    { id: 'ar-sh-saww', label: 'ﷺ', code: 'KeyV', type: 'char', output: 'ﷺ' },
    { id: 'ar-sh-jall', label: 'ﷻ', code: 'KeyN', type: 'char', output: 'ﷻ' },
    { id: 'ar-sh-basm', label: '﷽', code: 'KeyM', type: 'char', output: '﷽' },
    { id: 'ar-sh-comma', label: '،', code: 'Comma', type: 'char', output: '،' },
    { id: 'ar-sh-semicolon', label: '؛', code: 'Period', type: 'char', output: '؛' },
    { id: 'ar-sh-question', label: '؟', code: 'Slash', type: 'char', output: '؟' },
    { id: 'backspace-sh', label: '⌫', code: 'Backspace', type: 'action', action: 'backspace', width: 1.4, isSpecial: true },
  ],
  [
    { id: 'sym-sh', label: '?123', type: 'action', action: 'symbols', width: 1.3, isSpecial: true },
    { id: 'tashkeel-sh', label: 'َ ُ ِ', subLabel: 'تشكيل', type: 'action', action: 'tashkeel-toggle', width: 1.1, isSpecial: true },
    { id: 'comma-sh', label: '،', type: 'char', output: '،', width: 0.9 },
    { id: 'space-sh', label: 'العربية (Shift)', code: 'Space', type: 'action', action: 'space', width: 4.2 },
    { id: 'period-sh', label: '!', type: 'char', output: '!', width: 0.9 },
    { id: 'lang-sh', label: '🌐 EN', type: 'action', action: 'switch-lang', width: 1.1, isSpecial: true },
    { id: 'enter-sh', label: '⏎', code: 'Enter', type: 'action', action: 'enter', width: 1.4, isSpecial: true },
  ],
];

// ENGLISH GBOARD LOWERCASE ROWS
export const GBOARD_ENGLISH_ROWS: KeyDef[][] = [
  // Row 1
  [
    { id: 'en-q', label: 'q', subLabel: '1', code: 'KeyQ', type: 'char', output: 'q', variants: ['1', 'q'] },
    { id: 'en-w', label: 'w', subLabel: '2', code: 'KeyW', type: 'char', output: 'w', variants: ['2', 'w'] },
    { id: 'en-e', label: 'e', subLabel: '3', code: 'KeyE', type: 'char', output: 'e', variants: ['3', 'é', 'è', 'ê', 'ë'] },
    { id: 'en-r', label: 'r', subLabel: '4', code: 'KeyR', type: 'char', output: 'r', variants: ['4', 'r'] },
    { id: 'en-t', label: 't', subLabel: '5', code: 'KeyT', type: 'char', output: 't', variants: ['5', 't'] },
    { id: 'en-y', label: 'y', subLabel: '6', code: 'KeyY', type: 'char', output: 'y', variants: ['6', 'y', 'ÿ'] },
    { id: 'en-u', label: 'u', subLabel: '7', code: 'KeyU', type: 'char', output: 'u', variants: ['7', 'ú', 'ù', 'û', 'ü'] },
    { id: 'en-i', label: 'i', subLabel: '8', code: 'KeyI', type: 'char', output: 'i', variants: ['8', 'í', 'ì', 'î', 'ï'] },
    { id: 'en-o', label: 'o', subLabel: '9', code: 'KeyO', type: 'char', output: 'o', variants: ['9', 'ó', 'ò', 'ô', 'ö'] },
    { id: 'en-p', label: 'p', subLabel: '0', code: 'KeyP', type: 'char', output: 'p', variants: ['0', 'p'] },
  ],
  // Row 2
  [
    { id: 'en-a', label: 'a', subLabel: '@', code: 'KeyA', type: 'char', output: 'a', variants: ['@', 'á', 'à', 'â', 'ä', 'æ'] },
    { id: 'en-s', label: 's', subLabel: '#', code: 'KeyS', type: 'char', output: 's', variants: ['#', '$', 'ß'] },
    { id: 'en-d', label: 'd', subLabel: '$', code: 'KeyD', type: 'char', output: 'd', variants: ['$', 'd'] },
    { id: 'en-f', label: 'f', subLabel: '%', code: 'KeyF', type: 'char', output: 'f', variants: ['%', 'f'] },
    { id: 'en-g', label: 'g', subLabel: '&', code: 'KeyG', type: 'char', output: 'g', variants: ['&', 'g'] },
    { id: 'en-h', label: 'h', subLabel: '*', code: 'KeyH', type: 'char', output: 'h', variants: ['*', 'h'] },
    { id: 'en-j', label: 'j', subLabel: '-', code: 'KeyJ', type: 'char', output: 'j', variants: ['-', 'j'] },
    { id: 'en-k', label: 'k', subLabel: '+', code: 'KeyK', type: 'char', output: 'k', variants: ['+', 'k'] },
    { id: 'en-l', label: 'l', subLabel: '(', code: 'KeyL', type: 'char', output: 'l', variants: ['(', ')', 'l'] },
  ],
  // Row 3
  [
    { id: 'shift', label: '⇧', code: 'ShiftLeft', type: 'action', action: 'shift', width: 1.5, isSpecial: true },
    { id: 'en-z', label: 'z', subLabel: '!', code: 'KeyZ', type: 'char', output: 'z', variants: ['!', 'z'] },
    { id: 'en-x', label: 'x', subLabel: '"', code: 'KeyX', type: 'char', output: 'x', variants: ['"', 'x'] },
    { id: 'en-c', label: 'c', subLabel: '\'', code: 'KeyC', type: 'char', output: 'c', variants: ['\'', 'ç'] },
    { id: 'en-v', label: 'v', subLabel: ':', code: 'KeyV', type: 'char', output: 'v', variants: [':', 'v'] },
    { id: 'en-b', label: 'b', subLabel: ';', code: 'KeyB', type: 'char', output: 'b', variants: [';', 'b'] },
    { id: 'en-n', label: 'n', subLabel: ',', code: 'KeyN', type: 'char', output: 'n', variants: [',', 'ñ'] },
    { id: 'en-m', label: 'm', subLabel: '?', code: 'KeyM', type: 'char', output: 'm', variants: ['?', 'm'] },
    { id: 'backspace', label: '⌫', code: 'Backspace', type: 'action', action: 'backspace', width: 1.5, isSpecial: true },
  ],
  // Row 4
  [
    { id: 'sym', label: '?123', type: 'action', action: 'symbols', width: 1.3, isSpecial: true },
    { id: 'comma', label: ',', code: 'Comma', type: 'char', output: ',', width: 1.0 },
    { id: 'lang', label: '🌐', type: 'action', action: 'switch-lang', width: 1.0, isSpecial: true },
    { id: 'space', label: 'English (US)', code: 'Space', type: 'action', action: 'space', width: 4.5 },
    { id: 'period', label: '.', code: 'Period', type: 'char', output: '.', width: 1.0 },
    { id: 'enter', label: '⏎', code: 'Enter', type: 'action', action: 'enter', width: 1.5, isSpecial: true },
  ],
];

// ENGLISH GBOARD UPPERCASE ROWS
export const GBOARD_ENGLISH_SHIFT_ROWS: KeyDef[][] = [
  // Row 1
  [
    { id: 'en-Q', label: 'Q', subLabel: '1', code: 'KeyQ', type: 'char', output: 'Q' },
    { id: 'en-W', label: 'W', subLabel: '2', code: 'KeyW', type: 'char', output: 'W' },
    { id: 'en-E', label: 'E', subLabel: '3', code: 'KeyE', type: 'char', output: 'E' },
    { id: 'en-R', label: 'R', subLabel: '4', code: 'KeyR', type: 'char', output: 'R' },
    { id: 'en-T', label: 'T', subLabel: '5', code: 'KeyT', type: 'char', output: 'T' },
    { id: 'en-Y', label: 'Y', subLabel: '6', code: 'KeyY', type: 'char', output: 'Y' },
    { id: 'en-U', label: 'U', subLabel: '7', code: 'KeyU', type: 'char', output: 'U' },
    { id: 'en-I', label: 'I', subLabel: '8', code: 'KeyI', type: 'char', output: 'I' },
    { id: 'en-O', label: 'O', subLabel: '9', code: 'KeyO', type: 'char', output: 'O' },
    { id: 'en-P', label: 'P', subLabel: '0', code: 'KeyP', type: 'char', output: 'P' },
  ],
  // Row 2
  [
    { id: 'en-A', label: 'A', subLabel: '@', code: 'KeyA', type: 'char', output: 'A' },
    { id: 'en-S', label: 'S', subLabel: '#', code: 'KeyS', type: 'char', output: 'S' },
    { id: 'en-D', label: 'D', subLabel: '$', code: 'KeyD', type: 'char', output: 'D' },
    { id: 'en-F', label: 'F', subLabel: '%', code: 'KeyF', type: 'char', output: 'F' },
    { id: 'en-G', label: 'G', subLabel: '&', code: 'KeyG', type: 'char', output: 'G' },
    { id: 'en-H', label: 'H', subLabel: '*', code: 'KeyH', type: 'char', output: 'H' },
    { id: 'en-J', label: 'J', subLabel: '-', code: 'KeyJ', type: 'char', output: 'J' },
    { id: 'en-K', label: 'K', subLabel: '+', code: 'KeyK', type: 'char', output: 'K' },
    { id: 'en-L', label: 'L', subLabel: '(', code: 'KeyL', type: 'char', output: 'L' },
  ],
  // Row 3
  [
    { id: 'shift-active', label: '⇪', code: 'ShiftLeft', type: 'action', action: 'shift', width: 1.5, isSpecial: true },
    { id: 'en-Z', label: 'Z', subLabel: '!', code: 'KeyZ', type: 'char', output: 'Z' },
    { id: 'en-X', label: 'X', subLabel: '"', code: 'KeyX', type: 'char', output: 'X' },
    { id: 'en-C', label: 'C', subLabel: '\'', code: 'KeyC', type: 'char', output: 'C' },
    { id: 'en-V', label: 'V', subLabel: ':', code: 'KeyV', type: 'char', output: 'V' },
    { id: 'en-B', label: 'B', subLabel: ';', code: 'KeyB', type: 'char', output: 'B' },
    { id: 'en-N', label: 'N', subLabel: ',', code: 'KeyN', type: 'char', output: 'N' },
    { id: 'en-M', label: 'M', subLabel: '?', code: 'KeyM', type: 'char', output: 'M' },
    { id: 'backspace-sh', label: '⌫', code: 'Backspace', type: 'action', action: 'backspace', width: 1.5, isSpecial: true },
  ],
  // Row 4
  [
    { id: 'sym-sh', label: '?123', type: 'action', action: 'symbols', width: 1.3, isSpecial: true },
    { id: 'comma-sh', label: ',', code: 'Comma', type: 'char', output: ',', width: 1.0 },
    { id: 'lang-sh', label: '🌐', type: 'action', action: 'switch-lang', width: 1.0, isSpecial: true },
    { id: 'space-sh', label: 'English (US)', code: 'Space', type: 'action', action: 'space', width: 4.5 },
    { id: 'period-sh', label: '.', code: 'Period', type: 'char', output: '.', width: 1.0 },
    { id: 'enter-sh', label: '⏎', code: 'Enter', type: 'action', action: 'enter', width: 1.5, isSpecial: true },
  ],
];

// SYMBOLS LAYER 1 (?123)
export const GBOARD_SYMBOLS_1_ROWS: KeyDef[][] = [
  // Numbers
  [
    { id: 'sym-1', label: '1', code: 'Digit1', type: 'char', output: '1', variants: ['¹', '½', '⅓', '¼'] },
    { id: 'sym-2', label: '2', code: 'Digit2', type: 'char', output: '2', variants: ['²', '⅔'] },
    { id: 'sym-3', label: '3', code: 'Digit3', type: 'char', output: '3', variants: ['³', '¾'] },
    { id: 'sym-4', label: '4', code: 'Digit4', type: 'char', output: '4', variants: ['⁴'] },
    { id: 'sym-5', label: '5', code: 'Digit5', type: 'char', output: '5', variants: ['⁵'] },
    { id: 'sym-6', label: '6', code: 'Digit6', type: 'char', output: '6', variants: ['⁶'] },
    { id: 'sym-7', label: '7', code: 'Digit7', type: 'char', output: '7', variants: ['⁷', '⅞'] },
    { id: 'sym-8', label: '8', code: 'Digit8', type: 'char', output: '8', variants: ['⁸'] },
    { id: 'sym-9', label: '9', code: 'Digit9', type: 'char', output: '9', variants: ['⁹'] },
    { id: 'sym-0', label: '0', code: 'Digit0', type: 'char', output: '0', variants: ['⁰', '∅', 'ⁿ'] },
  ],
  // Common symbols
  [
    { id: 'sym-at', label: '@', type: 'char', output: '@' },
    { id: 'sym-hash', label: '#', type: 'char', output: '#' },
    { id: 'sym-dollar', label: '$', type: 'char', output: '$', variants: ['€', '£', '¥', '﷼', 'د.إ', 'ج.م', '¢'] },
    { id: 'sym-percent', label: '%', type: 'char', output: '%', variants: ['‰'] },
    { id: 'sym-amp', label: '&', type: 'char', output: '&' },
    { id: 'sym-minus', label: '-', type: 'char', output: '-', variants: ['—', '–', '_'] },
    { id: 'sym-plus', label: '+', type: 'char', output: '+', variants: ['±'] },
    { id: 'sym-paren-open', label: '(', type: 'char', output: '(' },
    { id: 'sym-paren-close', label: ')', type: 'char', output: ')' },
    { id: 'sym-slash', label: '/', type: 'char', output: '/', variants: ['\\'] },
  ],
  // Row 3
  [
    { id: 'sym-more', label: '=\\<', type: 'action', action: 'symbols', width: 1.4, isSpecial: true },
    { id: 'sym-star', label: '*', type: 'char', output: '*' },
    { id: 'sym-dquote', label: '"', type: 'char', output: '"', variants: ['“', '”', '«', '»'] },
    { id: 'sym-squote', label: '\'', type: 'char', output: '\'', variants: ['‘', '’'] },
    { id: 'sym-colon', label: ':', type: 'char', output: ':' },
    { id: 'sym-semicolon', label: ';', type: 'char', output: ';', variants: ['؛'] },
    { id: 'sym-excl', label: '!', type: 'char', output: '!', variants: ['¡'] },
    { id: 'sym-quest', label: '?', type: 'char', output: '?', variants: ['؟', '¿'] },
    { id: 'backspace-sym', label: '⌫', code: 'Backspace', type: 'action', action: 'backspace', width: 1.4, isSpecial: true },
  ],
  // Row 4
  [
    { id: 'sym-abc', label: 'ABC', type: 'action', action: 'symbols', width: 1.3, isSpecial: true },
    { id: 'sym-comma', label: ',', type: 'char', output: ',', width: 1.0 },
    { id: 'sym-lang', label: '🌐', type: 'action', action: 'switch-lang', width: 1.0, isSpecial: true },
    { id: 'sym-space', label: 'Space', code: 'Space', type: 'action', action: 'space', width: 4.5 },
    { id: 'sym-period', label: '.', type: 'char', output: '.', width: 1.0 },
    { id: 'sym-enter', label: '⏎', code: 'Enter', type: 'action', action: 'enter', width: 1.5, isSpecial: true },
  ],
];

// SYMBOLS LAYER 2 (=\<)
export const GBOARD_SYMBOLS_2_ROWS: KeyDef[][] = [
  [
    { id: 's2-tilde', label: '~', type: 'char', output: '~' },
    { id: 's2-grave', label: '`', type: 'char', output: '`' },
    { id: 's2-pipe', label: '|', type: 'char', output: '|' },
    { id: 's2-bullet', label: '•', type: 'char', output: '•', variants: ['√', 'π', '∆'] },
    { id: 's2-sqrt', label: '√', type: 'char', output: '√' },
    { id: 's2-pi', label: 'π', type: 'char', output: 'π' },
    { id: 's2-div', label: '÷', type: 'char', output: '÷' },
    { id: 's2-mult', label: '×', type: 'char', output: '×' },
    { id: 's2-para', label: '¶', type: 'char', output: '¶', variants: ['§'] },
    { id: 's2-degree', label: '°', type: 'char', output: '°', variants: ['′', '″'] },
  ],
  [
    { id: 's2-eq', label: '=', type: 'char', output: '=', variants: ['≠', '≈'] },
    { id: 's2-curly-open', label: '{', type: 'char', output: '{' },
    { id: 's2-curly-close', label: '}', type: 'char', output: '}' },
    { id: 's2-backslash', label: '\\', type: 'char', output: '\\' },
    { id: 's2-copyright', label: '©', type: 'char', output: '©', variants: ['®', '™'] },
    { id: 's2-caret', label: '^', type: 'char', output: '^' },
    { id: 's2-underscore', label: '_', type: 'char', output: '_' },
    { id: 's2-sq-open', label: '[', type: 'char', output: '[' },
    { id: 's2-sq-close', label: ']', type: 'char', output: ']' },
    { id: 's2-dollar-sym', label: '﷼', type: 'char', output: '﷼', variants: ['€', '£', '$'] },
  ],
  [
    { id: 's2-123', label: '?123', type: 'action', action: 'symbols', width: 1.4, isSpecial: true },
    { id: 's2-lt', label: '<', type: 'char', output: '<', variants: ['«', '≤'] },
    { id: 's2-gt', label: '>', type: 'char', output: '>', variants: ['»', '≥'] },
    { id: 's2-ar-q', label: '؟', type: 'char', output: '؟' },
    { id: 's2-ar-comma', label: '،', type: 'char', output: '،' },
    { id: 's2-ar-semi', label: '؛', type: 'char', output: '؛' },
    { id: 's2-dots', label: '…', type: 'char', output: '…' },
    { id: 's2-inf', label: '∞', type: 'char', output: '∞' },
    { id: 's2-backspace', label: '⌫', code: 'Backspace', type: 'action', action: 'backspace', width: 1.4, isSpecial: true },
  ],
  [
    { id: 's2-abc', label: 'ABC', type: 'action', action: 'symbols', width: 1.3, isSpecial: true },
    { id: 's2-comma', label: ',', type: 'char', output: ',', width: 1.0 },
    { id: 's2-lang', label: '🌐', type: 'action', action: 'switch-lang', width: 1.0, isSpecial: true },
    { id: 's2-space', label: 'Space', code: 'Space', type: 'action', action: 'space', width: 4.5 },
    { id: 's2-period', label: '.', type: 'char', output: '.', width: 1.0 },
    { id: 's2-enter', label: '⏎', code: 'Enter', type: 'action', action: 'enter', width: 1.5, isSpecial: true },
  ],
];

// Physical Hardware Keyboard Mapping table
// Maps standard physical PC keys to their Gboard output
export const PHYSICAL_KEY_MAPPINGS: PhysicalKeyMapping[] = [
  // Numbers row
  { code: 'Backquote', enChar: '`', enShiftChar: '~', arChar: 'ذ', arShiftChar: 'ّ', gboardNote: 'ذ on Gboard / Shadda' },
  { code: 'Digit1', enChar: '1', enShiftChar: '!', arChar: '١', arShiftChar: '!', gboardNote: '١ / 1' },
  { code: 'Digit2', enChar: '2', enShiftChar: '@', arChar: '٢', arShiftChar: '@', gboardNote: '٢ / 2' },
  { code: 'Digit3', enChar: '3', enShiftChar: '#', arChar: '٣', arShiftChar: '#', gboardNote: '٣ / 3' },
  { code: 'Digit4', enChar: '4', enShiftChar: '$', arChar: '٤', arShiftChar: '$', gboardNote: '٤ / 4' },
  { code: 'Digit5', enChar: '5', enShiftChar: '%', arChar: '٥', arShiftChar: '%', gboardNote: '٥ / 5' },
  { code: 'Digit6', enChar: '6', enShiftChar: '^', arChar: '٦', arShiftChar: '^', gboardNote: '٦ / 6' },
  { code: 'Digit7', enChar: '7', enShiftChar: '&', arChar: '٧', arShiftChar: '&', gboardNote: '٧ / 7' },
  { code: 'Digit8', enChar: '8', enShiftChar: '*', arChar: '٨', arShiftChar: '*', gboardNote: '٨ / 8' },
  { code: 'Digit9', enChar: '9', enShiftChar: '(', arChar: '٩', arShiftChar: ')', gboardNote: '٩ / 9' },
  { code: 'Digit0', enChar: '0', enShiftChar: ')', arChar: '٠', arShiftChar: '(', gboardNote: '٠ / 0' },
  { code: 'Minus', enChar: '-', enShiftChar: '_', arChar: '-', arShiftChar: '_', gboardNote: 'Dash / Underscore' },
  { code: 'Equal', enChar: '=', enShiftChar: '+', arChar: '=', arShiftChar: '+', gboardNote: 'Equal / Plus' },

  // Row 1 (QWERTY)
  { code: 'KeyQ', enChar: 'q', enShiftChar: 'Q', arChar: 'ض', arShiftChar: 'َ', gboardNote: 'ض / فتحة' },
  { code: 'KeyW', enChar: 'w', enShiftChar: 'W', arChar: 'ص', arShiftChar: 'ً', gboardNote: 'ص / تنوين فتح' },
  { code: 'KeyE', enChar: 'e', enShiftChar: 'E', arChar: 'ث', arShiftChar: 'ُ', gboardNote: 'ث / ضمة' },
  { code: 'KeyR', enChar: 'r', enShiftChar: 'R', arChar: 'ق', arShiftChar: 'ٌ', gboardNote: 'ق / تنوين ضم' },
  { code: 'KeyT', enChar: 't', enShiftChar: 'T', arChar: 'ف', arShiftChar: 'ڤ', gboardNote: 'ف / ڤ' },
  { code: 'KeyY', enChar: 'y', enShiftChar: 'Y', arChar: 'غ', arShiftChar: 'إ', gboardNote: 'غ / إ' },
  { code: 'KeyU', enChar: 'u', enShiftChar: 'U', arChar: 'ع', arShiftChar: '‘', gboardNote: 'ع / ‘' },
  { code: 'KeyI', enChar: 'i', enShiftChar: 'I', arChar: 'ه', arShiftChar: 'ـ', gboardNote: 'ه / تطويل' },
  { code: 'KeyO', enChar: 'o', enShiftChar: 'O', arChar: 'خ', arShiftChar: '}', gboardNote: 'خ / }' },
  { code: 'KeyP', enChar: 'p', enShiftChar: 'P', arChar: 'ح', arShiftChar: '{', gboardNote: 'ح / {' },
  { code: 'BracketLeft', enChar: '[', enShiftChar: '{', arChar: 'ج', arShiftChar: 'چ', gboardNote: 'ج / چ' },
  { code: 'BracketRight', enChar: ']', enShiftChar: '}', arChar: 'د', arShiftChar: '»', gboardNote: 'د / »' },
  { code: 'Backslash', enChar: '\\', enShiftChar: '|', arChar: '\\', arShiftChar: '|', gboardNote: 'Backslash' },

  // Row 2 (ASDF)
  { code: 'KeyA', enChar: 'a', enShiftChar: 'A', arChar: 'ش', arShiftChar: 'ِ', gboardNote: 'ش / كسرة' },
  { code: 'KeyS', enChar: 's', enShiftChar: 'S', arChar: 'س', arShiftChar: 'ٍ', gboardNote: 'س / تنوين كسر' },
  { code: 'KeyD', enChar: 'd', enShiftChar: 'D', arChar: 'ي', arShiftChar: 'آ', gboardNote: 'ي / آ' },
  { code: 'KeyF', enChar: 'f', enShiftChar: 'F', arChar: 'ب', arShiftChar: 'ّ', gboardNote: 'ب / شدة' },
  { code: 'KeyG', enChar: 'g', enShiftChar: 'G', arChar: 'ل', arShiftChar: 'پ', gboardNote: 'ل / پ' },
  { code: 'KeyH', enChar: 'h', enShiftChar: 'H', arChar: 'ا', arShiftChar: 'أ', gboardNote: 'ا / أ' },
  { code: 'KeyJ', enChar: 'j', enShiftChar: 'J', arChar: 'ت', arShiftChar: 'ء', gboardNote: 'ت / ء' },
  { code: 'KeyK', enChar: 'k', enShiftChar: 'K', arChar: 'ن', arShiftChar: 'گ', gboardNote: 'ن / گ' },
  { code: 'KeyL', enChar: 'l', enShiftChar: 'L', arChar: 'م', arShiftChar: 'ْ', gboardNote: 'م / سكون' },
  { code: 'Semicolon', enChar: ';', enShiftChar: ':', arChar: 'ك', arShiftChar: ':', gboardNote: 'ك / :' },
  { code: 'Quote', enChar: '\'', enShiftChar: '"', arChar: 'ط', arShiftChar: '"', gboardNote: 'ط / "' },

  // Row 3 (ZXCV)
  { code: 'KeyZ', enChar: 'z', enShiftChar: 'Z', arChar: 'ئ', arShiftChar: 'لأ', gboardNote: 'ئ / لأ' },
  { code: 'KeyX', enChar: 'x', enShiftChar: 'X', arChar: 'ء', arShiftChar: 'لإ', gboardNote: 'ء / لإ' },
  { code: 'KeyC', enChar: 'c', enShiftChar: 'C', arChar: 'ؤ', arShiftChar: 'لآ', gboardNote: 'ؤ / لآ' },
  { code: 'KeyV', enChar: 'v', enShiftChar: 'V', arChar: 'ر', arShiftChar: 'ﷺ', gboardNote: 'ر / ﷺ' },
  { code: 'KeyB', enChar: 'b', enShiftChar: 'B', arChar: 'لا', arShiftChar: 'لآ', gboardNote: 'لا / لآ' },
  { code: 'KeyN', enChar: 'n', enShiftChar: 'N', arChar: 'ى', arShiftChar: 'ﷻ', gboardNote: 'ى / ﷻ' },
  { code: 'KeyM', enChar: 'm', enShiftChar: 'M', arChar: 'ة', arShiftChar: '﷽', gboardNote: 'ة / ﷽' },
  { code: 'Comma', enChar: ',', enShiftChar: '<', arChar: 'و', arShiftChar: '،', gboardNote: 'و / ،' },
  { code: 'Period', enChar: '.', enShiftChar: '>', arChar: 'ز', arShiftChar: '؛', gboardNote: 'ز / ؛' },
  { code: 'Slash', enChar: '/', enShiftChar: '?', arChar: 'ظ', arShiftChar: '؟', gboardNote: 'ظ / ؟' },
];

export const POPULAR_EMOJIS = [
  '😊', '😂', '❤️', '👍', '🙏', '🔥', '✨', '😍', '👏', '🤲',
  '🌹', '🕌', '🇸🇦', '🇪🇬', '🇦🇪', '🇵🇸', '🌟', '💯', '👌', '🎉',
  '☕', '💡', '✅', '❌', '👀', '💪', '🤝', '🙌', '🕊️', '🌙'
];
