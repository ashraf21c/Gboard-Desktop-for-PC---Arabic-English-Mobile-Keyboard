import React, { useState } from 'react';
import { Download, Copy, Check, Terminal, Monitor, ShieldAlert, Cpu } from 'lucide-react';
import {
  generateWindowsAHK,
  generateLinuxXKB,
  generateLinuxKeyd,
  generateUniversalJSON,
  downloadFile,
} from '../utils/exporters';

interface SystemInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemInstallModal: React.FC<SystemInstallModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'windows' | 'linux' | 'universal'>('windows');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = async (content: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadWindowsAHK = () => {
    downloadFile('Gboard_Arabic_Windows.ahk', generateWindowsAHK());
  };

  const handleDownloadLinuxXKB = () => {
    downloadFile('ar_gboard', generateLinuxXKB());
  };

  const handleDownloadLinuxKeyd = () => {
    downloadFile('gboard_keyd.conf', generateLinuxKeyd());
  };

  const handleDownloadJSON = () => {
    downloadFile('gboard_layout_spec.json', generateUniversalJSON(), 'application/json');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Windows & Linux System Integration</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Type using Android Google Keyboard layout everywhere on your PC, in any app.
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

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-neutral-950/40">
          <button
            type="button"
            onClick={() => setActiveTab('windows')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'windows'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>Windows (10 / 11)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('linux')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'linux'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>Linux (Wayland & X11)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('universal')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'universal'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>Universal JSON Spec</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-neutral-300">
          {/* WINDOWS TAB */}
          {activeTab === 'windows' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40">
                <h3 className="text-sm font-semibold text-blue-300 mb-1">
                  1-Click AutoHotkey System Remapper for Windows
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  This background script runs silently on Windows 10 & 11. It intercepts your physical keyboard and outputs the exact Android Gboard Arabic letters and Tashkeel. Toggle anytime with <strong className="text-white bg-blue-900/60 px-1.5 py-0.5 rounded">Win + Alt + A</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleDownloadWindowsAHK}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Gboard_Arabic_Windows.ahk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyCode(generateWindowsAHK(), 'ahk')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    {copiedSection === 'ahk' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSection === 'ahk' ? 'Copied script!' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              {/* Step by step */}
              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-neutral-200">How to set up on Windows:</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-neutral-400 pl-1 leading-relaxed">
                  <li>Install free <a href="https://www.autohotkey.com/" target="_blank" rel="noreferrer" className="text-blue-400 underline">AutoHotkey v2</a> (official Windows keyboard tool).</li>
                  <li>Click <strong className="text-neutral-200">Download Gboard_Arabic_Windows.ahk</strong> above.</li>
                  <li>Double click the downloaded file to run it. A tray icon appears.</li>
                  <li>Press <strong className="text-white bg-neutral-800 px-1.5 py-0.5 rounded">Win + Alt + A</strong> to turn Gboard Arabic ON or OFF anywhere (Chrome, Word, WhatsApp, Discord, etc.).</li>
                  <li>Optional: Put a shortcut in <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">shell:startup</code> to start automatically when your PC boots.</li>
                </ol>
              </div>

              {/* Code preview snippet */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-mono">
                  <span>Gboard_Arabic_Windows.ahk preview</span>
                </div>
                <pre className="text-xs font-mono text-neutral-300 max-h-36 overflow-y-auto leading-relaxed">
                  {generateWindowsAHK().slice(0, 750)}
                  {'\n... (full keymap for all 4 rows + Tashkeel)'}
                </pre>
              </div>
            </div>
          )}

          {/* LINUX TAB */}
          {activeTab === 'linux' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <h3 className="text-sm font-semibold text-emerald-300 mb-1">
                  Linux Native XKB Layout & Universal keyd (Wayland + X11)
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Compatible with Ubuntu, Debian, Fedora, Arch, GNOME, KDE, Sway, and Hyprland. You can install it as a native system layout or via keyd/kanata.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleDownloadLinuxXKB}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download ar_gboard (XKB Symbol)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadLinuxKeyd}
                    className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download keyd Config</span>
                  </button>
                </div>
              </div>

              {/* Quick CLI commands */}
              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-neutral-200">Option A: Native XKB (Instant install)</h4>
                <div className="rounded-lg bg-neutral-950 border border-neutral-800 p-2.5 flex items-center justify-between font-mono text-neutral-300">
                  <span className="truncate">sudo cp ar_gboard /usr/share/X11/xkb/symbols/ && setxkbmap ar_gboard</span>
                  <button
                    type="button"
                    onClick={() => copyCode('sudo cp ar_gboard /usr/share/X11/xkb/symbols/ && setxkbmap ar_gboard', 'cmd1')}
                    className="p-1 hover:text-white text-neutral-400 ml-2"
                  >
                    {copiedSection === 'cmd1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <h4 className="font-semibold text-neutral-200 pt-2">Option B: Universal keyd (Wayland / Sway / GNOME)</h4>
                <ol className="list-decimal list-inside space-y-1 text-neutral-400 pl-1 leading-relaxed">
                  <li>Install keyd: <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">sudo apt install keyd</code> or <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">sudo dnf install keyd</code> / <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">pacman -S keyd</code>.</li>
                  <li>Copy downloaded <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">gboard_keyd.conf</code> to <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">/etc/keyd/default.conf</code>.</li>
                  <li>Run <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">sudo systemctl restart keyd</code>. Press CapsLock to toggle Gboard Arabic!</li>
                </ol>
              </div>
            </div>
          )}

          {/* UNIVERSAL TAB */}
          {activeTab === 'universal' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40">
                <h3 className="text-sm font-semibold text-purple-300 mb-1">
                  Universal JSON Layout Specification
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Standard format that can be parsed by any custom IME, web application, Electron wrapper, or hardware keyboard remapper (e.g. QMK/VIA firmware, Kanata, KMonad).
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleDownloadJSON}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download gboard_layout_spec.json</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyCode(generateUniversalJSON(), 'json')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    {copiedSection === 'json' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSection === 'json' ? 'Copied JSON!' : 'Copy JSON'}</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-3">
                <pre className="text-xs font-mono text-neutral-300 max-h-40 overflow-y-auto leading-relaxed">
                  {generateUniversalJSON()}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-800 bg-neutral-950/60">
          <span className="text-xs text-neutral-500">
            All files are 100% open-source and free of external runtime dependencies.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
