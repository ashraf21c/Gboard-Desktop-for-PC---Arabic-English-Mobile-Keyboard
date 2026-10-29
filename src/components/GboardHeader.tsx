import React from 'react';
import { Download, HelpCircle, Layers, Settings } from 'lucide-react';

interface GboardHeaderProps {
  onOpenInstallModal: () => void;
  onOpenComparisonModal: () => void;
  onOpenSettingsModal: () => void;
}

export const GboardHeader: React.FC<GboardHeaderProps> = ({
  onOpenInstallModal,
  onOpenComparisonModal,
  onOpenSettingsModal,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-4 md:px-8 py-3.5 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30">
      {/* Zone 1: Brand wordmark */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
          G
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white leading-tight">
            Gboard Desktop
          </span>
          <span className="text-[11px] text-neutral-400 leading-tight">
            Arabic & English Mobile Layout
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation / feature links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
        <button
          type="button"
          onClick={onOpenComparisonModal}
          className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-xs"
        >
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Mobile vs PC 101 Layout</span>
        </button>
        <button
          type="button"
          onClick={onOpenInstallModal}
          className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-xs"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Windows & Linux Installers</span>
        </button>
        <button
          type="button"
          onClick={onOpenSettingsModal}
          className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-xs"
        >
          <Settings className="w-3.5 h-3.5 text-neutral-400" />
          <span>Layout Preferences</span>
        </button>
      </nav>

      {/* Zone 3: Primary CTA */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenInstallModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install for Windows / Linux</span>
        </button>
      </div>
    </header>
  );
};
