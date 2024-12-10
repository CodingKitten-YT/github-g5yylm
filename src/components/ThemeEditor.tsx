import React, { useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Download, Upload, Eye, Palette } from 'lucide-react';
import { Theme } from '../themes';
import { uploadToCatbox } from '../utils/catboxUtils';

interface ThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTheme: (theme: Theme) => void;
}

interface ColorField {
  key: keyof Theme['colors'];
  label: string;
  description: string;
}

const colorFields: ColorField[] = [
  { key: 'background', label: 'Background', description: 'Main background color' },
  { key: 'foreground', label: 'Foreground', description: 'Primary text color' },
  { key: 'card', label: 'Card', description: 'Card and component background' },
  { key: 'card-hover', label: 'Card Hover', description: 'Card hover state' },
  { key: 'primary', label: 'Primary', description: 'Primary accent color' },
  { key: 'primary-hover', label: 'Primary Hover', description: 'Primary button hover' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary elements' },
  { key: 'secondary-hover', label: 'Secondary Hover', description: 'Secondary hover state' },
  { key: 'accent', label: 'Accent', description: 'Highlights and accents' },
  { key: 'muted', label: 'Muted', description: 'Subdued text and elements' },
  { key: 'border', label: 'Border', description: 'Border color' },
];

export function ThemeEditor({ isOpen, onClose, onSaveTheme }: ThemeEditorProps) {
  const [theme, setTheme] = useState<Theme>({
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
  });

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
    setIsUploading(true);
    setError('');

    try {
      const finalTheme = {
        ...theme,
        name: themeName,
      };

      const themeJson = JSON.stringify(finalTheme, null, 2);
      const url = await uploadToCatbox(new Blob([themeJson], { type: 'application/json' }));
      
      if (url) {
        onSaveTheme(finalTheme);
        onClose();
      } else {
        setError('Failed to upload theme');
      }
    } catch (err) {
      setError('Error saving theme');
    } finally {
      setIsUploading(false);
    }
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
                onChange={(e) => setThemeName(e.target.value)}
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
                {colorFields.map(({ key, label, description }) => (
                  <div key={key} className="space-y-2">
                    <button
                      onClick={() => setActiveColor(key)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 
                               hover:scale-105 flex items-center gap-3
                               ${activeColor === key ? 'border-primary' : 'border-border'}`}
                      style={{
                        backgroundColor: theme.colors[key],
                        color: key === 'background' ? theme.colors.foreground : undefined,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: theme.colors[key] }}
                      />
                      <div className="text-left">
                        <div className="font-medium">{label}</div>
                        <div className="text-sm opacity-80">{description}</div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview and Color Picker */}
            <div className="flex-1 p-6 flex flex-col gap-6">
              {activeColor && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Picker</h3>
                  <HexColorPicker
                    color={theme.colors[activeColor]}
                    onChange={handleColorChange}
                    className="w-full max-w-xs"
                  />
                  <input
                    type="text"
                    value={theme.colors[activeColor]}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="bg-card/50 px-4 py-2 rounded-lg border border-border"
                  />
                </div>
              )}

              {/* Live Preview */}
              <div className="flex-1 rounded-lg border border-border overflow-hidden">
                <div
                  className="w-full h-full p-6 overflow-y-auto"
                  style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.foreground,
                  }}
                >
                  <div className="space-y-6">
                    <div
                      className="p-6 rounded-lg"
                      style={{ backgroundColor: theme.colors.card }}
                    >
                      <h3 className="text-xl font-bold mb-4">Preview Card</h3>
                      <p className="text-sm" style={{ color: theme.colors.muted }}>
                        This is how your theme will look in the application.
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button
                          className="px-4 py-2 rounded-lg transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                          }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg transition-colors duration-300"
                          style={{
                            backgroundColor: theme.colors.secondary,
                            color: theme.colors.foreground,
                          }}
                        >
                          Secondary Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted">
              Theme will be uploaded to catbox.moe for sharing
            </div>
            <div className="flex gap-3">
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
                         text-white transition-all duration-300 flex items-center gap-2"
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