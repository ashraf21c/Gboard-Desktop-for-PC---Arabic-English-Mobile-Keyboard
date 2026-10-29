import React, { useState } from 'react';
import { PHYSICAL_KEY_MAPPINGS } from '../data/layouts';
import { Search, Sparkles, CheckCircle2 } from 'lucide-react';

interface LayoutComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LayoutComparisonModal: React.FC<LayoutComparisonModalProps> = ({ isOpen, onClose }) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filteredMappings = PHYSICAL_KEY_MAPPINGS.filter(
    (m) =>
      m.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      m.arChar.includes(filterQuery) ||
      m.enChar.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (m.gboardNote && m.gboardNote.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Android Gboard vs Standard PC Arabic 101</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Why mobile users struggle with Windows PC keyboards and how Gboard Desktop solves it.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Comparison Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-6 pb-2 text-xs">
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="font-semibold text-blue-400 block">1. Natural Alef & Hamza</span>
            <p className="text-neutral-400 leading-relaxed">
              On PC Arabic 101, <span className="text-white">أ</span> is Shift+H, <span className="text-white">إ</span> is Shift+Y, and <span className="text-white">آ</span> is Shift+N scattered across the keyboard. On Gboard, all are grouped under Alef (<span className="text-white">ا</span>)!
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="font-semibold text-emerald-400 block">2. Simple Tashkeel / Harakat</span>
            <p className="text-neutral-400 leading-relaxed">
              Typing <span className="text-white">َ ً ُ ٌ ِ ٍ ّ ْ</span> on standard PC requires memorizing obscure shift combinations. Gboard provides an instant one-tap bar and logical row mappings.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="font-semibold text-purple-400 block">3. Muscle Memory Preserved</span>
            <p className="text-neutral-400 leading-relaxed">
              You type on your laptop or mechanical keyboard with the exact same layout you have been using on your smartphone for years without re-training your brain.
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-6 py-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by key, letter, or character (e.g. ض, Alef, KeyQ)..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Key mapping table */}
        <div className="p-6 pt-2 overflow-y-auto">
          <div className="rounded-xl border border-neutral-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 font-semibold border-b border-neutral-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Physical PC Key</th>
                  <th className="py-2.5 px-3">English Key</th>
                  <th className="py-2.5 px-3">Gboard Arabic Letter</th>
                  <th className="py-2.5 px-3">Gboard Shift / Accent</th>
                  <th className="py-2.5 px-3">Behavior & Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
                {filteredMappings.map((mapping, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-2 px-3 text-neutral-400 font-medium">
                      {mapping.code.replace('Key', '')}
                    </td>
                    <td className="py-2 px-3">
                      <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200">
                        {mapping.enChar}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-arabic text-base text-blue-400 font-bold">
                      {mapping.arChar}
                    </td>
                    <td className="py-2 px-3 font-arabic text-base text-amber-300 font-bold">
                      {mapping.arShiftChar}
                    </td>
                    <td className="py-2 px-3 font-sans text-neutral-400 text-[11px]">
                      {mapping.gboardNote || 'Standard mapping'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-800 bg-neutral-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
