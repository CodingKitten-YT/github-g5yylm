import { useState, useEffect } from 'react';
import { getIconUrl, validateIconUrl } from '../utils/iconUtils';

interface CloakSettings {
  iconUrl: string;
  pageTitle: string;
}

const DEFAULT_SETTINGS: CloakSettings = {
  iconUrl: '',
  pageTitle: ''
};

export function useCloaking() {
  const [cloakSettings, setCloakSettings] = useState<CloakSettings>(() => {
    const stored = localStorage.getItem('kittengames-cloak');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  const updateCloak = async (settings: Partial<CloakSettings>) => {
    if (settings.iconUrl) {
      const isValid = await validateIconUrl(settings.iconUrl);
      if (!isValid) {
        console.error('Invalid icon URL');
        return;
      }
      settings.iconUrl = getIconUrl(settings.iconUrl);
    }

    setCloakSettings(prev => {
      const newSettings = { ...prev, ...settings };
      localStorage.setItem('kittengames-cloak', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const removeCloak = () => {
    localStorage.removeItem('kittengames-cloak');
    setCloakSettings(DEFAULT_SETTINGS);
    window.location.reload();
  };

  useEffect(() => {
    if (cloakSettings.iconUrl) {
      const iconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
      iconLink.type = 'image/x-icon';
      iconLink.rel = 'shortcut icon';
      iconLink.href = cloakSettings.iconUrl;
      document.getElementsByTagName('head')[0].appendChild(iconLink);
    }
    
    if (cloakSettings.pageTitle) {
      document.title = cloakSettings.pageTitle;
    }
  }, [cloakSettings]);

  return { cloakSettings, updateCloak, removeCloak };
}