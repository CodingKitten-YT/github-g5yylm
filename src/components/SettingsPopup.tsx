import React, { useState } from 'react';
import { X, Plus, AlertCircle, Loader2, Palette } from 'lucide-react';
import { themes, type Theme } from '../themes';
import { ThemeCard } from './ThemeCard';

interface Settings {
  theme: string;
  customThemeUrl?: string;
}

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  loadCustomTheme: (url: string) => Promise<boolean>;
  customThemes: Record<string, Theme>;
  removeCustomTheme: (url: string) => void;
}

export function SettingsPopup({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  loadCustomTheme,
  customThemes,
  removeCustomTheme
}: SettingsPopupProps) {
  const [customUrl, setCustomUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddCustomTheme = async () => {
    if (!customUrl.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await loadCustomTheme(customUrl);
      if (success) {
        onUpdateSettings({ theme: 'custom', customThemeUrl: customUrl });
        setCustomUrl('');
      } else {
        setError('Invalid theme format');
      }
    } catch (err) {
      setError('Failed to load theme');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTheme = (url: string) => {
    removeCustomTheme(url);
    if (settings.customThemeUrl === url) {
      onUpdateSettings({ theme: 'dark', customThemeUrl: undefined });
    }
  };

  const allThemes = [
    ...Object.entries(themes).map(([id, theme]) => ({
      id,
      theme,
      isCustom: false,
      url: null
    })),
    ...Object.entries(customThemes).map(([url, theme]) => ({
      id: url,
      theme,
      isCustom: true,
      url
    }))
  ];

  return (
    <div className="fixed inset-0 popup-overlay z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[80vh]">
        <div className="bg-card rounded-lg p-6 relative animate-scale-in">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted hover:text-foreground 
                     transition-all duration-300 hover:rotate-90"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold mb-6 animate-slide-up">Theme Settings</h2>
          
          <div className="relative">
            <div 
              className="overflow-y-auto max-h-[50vh] pr-4 hide-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="grid grid-cols-3 gap-3">
                {allThemes.map(({ id, theme, isCustom, url }, index) => (
                  <ThemeCard
                    key={id}
                    id={id}
                    theme={theme}
                    isCustom={isCustom}
                    url={url}
                    isSelected={isCustom ? settings.customThemeUrl === url : settings.theme === id}
                    onSelect={() => onUpdateSettings({ 
                      theme: isCustom ? 'custom' : id, 
                      customThemeUrl: url || undefined 
                    })}
                    onRemove={isCustom ? () => handleRemoveTheme(url!) : undefined}
                  />
                ))}

                {/* Create Theme Button */}
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border-2 border-dashed border-muted 
                           transition-all duration-300 hover:border-primary hover:scale-105 
                           flex flex-col items-center justify-center gap-2 group"
                >
                  <Palette 
                    size={20} 
                    className="text-muted group-hover:text-primary transition-colors duration-300" 
                  />
                  <span className="text-xs font-medium">Create Theme</span>
                </a>
              </div>
            </div>
          </div>

          {/* Add Theme URL */}
          <div className="mt-6 p-4 rounded-lg border-2 border-dashed border-muted 
                       transition-all duration-300 hover:border-primary">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter theme JSON URL"
                  className="w-full bg-transparent border-none focus:outline-none 
                           text-sm placeholder-muted"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCustomTheme();
                    }
                  }}
                />
                {error ? (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle size={12} />
                    {error}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted text-xs">
                    <Plus size={12} />
                    Add theme from URL
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}