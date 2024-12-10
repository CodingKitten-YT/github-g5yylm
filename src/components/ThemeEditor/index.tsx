import React, { useState, useCallback } from 'react';
import { X, Download, Upload, Palette } from 'lucide-react';
import { Theme } from '../../themes';
import { uploadToCatbox } from '../../utils/catboxUtils';
import { ColorField } from './ColorField';
import { ColorPicker } from './ColorPicker';
import { LivePreview } from './LivePreview';
import { colorFields } from './constants';

interface ThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTheme: (theme: Theme & { url?: string }) => void;
}

const defaultTheme: Theme = {
  name: 'Custom Theme',
  colorScheme: 'dark',
  colors: {
    background: '#1a1b2e',
    foreground: '#ffffff',
    card: '#2d2b55',
    'card-hover': '#34305e',
    primary: '#7795ff',
    'primary-hover': '#6b85e8',
    secondary: '#2d2b55',
    'secondary-hover': '#34305e',
    accent: '#01cdfe',
    muted: '#a599e9',
    border: '#34305e',
  },
};

export function ThemeEditor({ isOpen, onClose, onSaveTheme }: ThemeEditorProps) {
  const [theme, setTheme] = useState<Theme>({ ...defaultTheme });
  const [activeColor, setActiveColor] = useState<keyof Theme['colors'] | null>(null);
  const [themeName, setThemeName] = useState('Custom Theme');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleColorChange = useCallback((color: string) => {
    if (activeColor) {
      setTheme(prev => ({
        ...prev,
        colors: {
          ...prev.colors,
          [activeColor]: color,
        },
      }));
    }
  }, [activeColor]);

  const handleSave = async () => {
    if (!themeName.trim()) {
      setError('Please enter a theme name');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const finalTheme = {
        ...theme,
        name: themeName.trim(),
      };

      const themeJson = JSON.stringify(finalTheme, null, 2);
      const url = await uploadToCatbox(
        new Blob([themeJson], { type: 'application/json' })
      );
      
      if (url) {
        onSaveTheme({ ...finalTheme, url });
      } else {
        throw new Error('Failed to get upload URL');
      }
    } catch (err) {
      console.error('Error saving theme:', err);
      setError(err instanceof Error ? err.message : 'Error saving theme');
    } finally {
      setIsUploading(false);
    }
  };

  const resetTheme = () => {
    setTheme({ ...defaultTheme });
    setThemeName('Custom Theme');
    setActiveColor(null);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 popup-overlay z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[90vh]">
        <div className="bg-card rounded-lg shadow-xl h-full flex flex-col animate-scale-in">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="text-primary" size={24} />
              <input
                type="text"
                value={themeName}
                onChange={(e) => {
                  setThemeName(e.target.value);
                  setError('');
                }}
                className="text-xl font-bold bg-transparent border-none focus:outline-none 
                         focus:ring-2 focus:ring-primary rounded px-2"
                placeholder="Theme Name"
              />
            </div>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors duration-300 
                       hover:rotate-90 transform"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Color Picker Panel */}
            <div className="w-1/3 border-r border-border p-6 overflow-y-auto">
              <div className="space-y-6">
                {colorFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <ColorField
                      field={field}
                      color={theme.colors[field.key]}
                      isActive={activeColor === field.key}
                      onClick={() => setActiveColor(field.key)}
                      foregroundColor={theme.colors.foreground}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview and Color Picker */}
            <div className="flex-1 p-6 flex flex-col gap-6">
              {activeColor && (
                <ColorPicker
                  color={theme.colors[activeColor]}
                  onChange={handleColorChange}
                  label={colorFields.find(f => f.key === activeColor)?.label || ''}
                />
              )}

              <LivePreview theme={theme} />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted">
              Theme will be uploaded to catbox.moe for sharing
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetTheme}
                className="px-4 py-2 rounded-lg border border-border hover:bg-card-hover
                         transition-all duration-300"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-border hover:bg-card-hover
                         transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUploading}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover
                         text-white transition-all duration-300 flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Upload className="animate-spin" size={18} />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Save Theme
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border-t border-red-500 text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}