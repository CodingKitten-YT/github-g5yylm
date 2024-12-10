import { useState, useEffect } from 'react';
import { themes, type Theme } from '../themes';

interface Settings {
  theme: string;
  customThemeUrl?: string;
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'dark'
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem('kittengames-settings');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });
  const [customThemes, setCustomThemes] = useState<Record<string, Theme>>(() => {
    const stored = localStorage.getItem('kittengames-custom-themes');
    return stored ? JSON.parse(stored) : {};
  });

  const loadCustomTheme = async (url: string) => {
    try {
      const response = await fetch(url);
      const theme = await response.json();
      
      // Validate theme structure
      if (!theme.name || !theme.colorScheme || !theme.colors) {
        throw new Error('Invalid theme format');
      }

      setCustomThemes(prev => {
        const updated = { ...prev, [url]: theme };
        localStorage.setItem('kittengames-custom-themes', JSON.stringify(updated));
        return updated;
      });

      return true;
    } catch (error) {
      console.error('Error loading custom theme:', error);
      return false;
    }
  };

  const removeCustomTheme = (url: string) => {
    setCustomThemes(prev => {
      const updated = { ...prev };
      delete updated[url];
      localStorage.setItem('kittengames-custom-themes', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('kittengames-settings', JSON.stringify(settings));
    
    // Apply theme
    let currentTheme: Theme;
    
    if (settings.customThemeUrl && customThemes[settings.customThemeUrl]) {
      currentTheme = customThemes[settings.customThemeUrl];
    } else {
      currentTheme = themes[settings.theme as keyof typeof themes] || themes.dark;
    }

    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    
    // Set color scheme for system UI
    document.documentElement.style.colorScheme = currentTheme.colorScheme;
  }, [settings, customThemes]);

  useEffect(() => {
    if (settings.customThemeUrl) {
      loadCustomTheme(settings.customThemeUrl);
    }
  }, [settings.customThemeUrl]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { 
    settings, 
    updateSettings,
    loadCustomTheme,
    removeCustomTheme,
    customThemes
  };
}