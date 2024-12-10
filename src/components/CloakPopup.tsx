import React, { useState, useEffect } from 'react';
import { X, Globe, Type, AlertTriangle, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { validateIconUrl } from '../utils/iconUtils';

interface CloakSettings {
  iconUrl: string;
  pageTitle: string;
}

interface CloakPopupProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CloakSettings;
  onUpdateCloak: (settings: Partial<CloakSettings>) => void;
  onRemoveCloak: () => void;
  theme: string;
}

export function CloakPopup({ isOpen, onClose, settings, onUpdateCloak, onRemoveCloak }: CloakPopupProps) {
  const [iconUrl, setIconUrl] = useState(settings.iconUrl);
  const [pageTitle, setPageTitle] = useState(settings.pageTitle);
  const [previewIcon, setPreviewIcon] = useState(settings.iconUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIconUrl(settings.iconUrl);
    setPageTitle(settings.pageTitle);
    setPreviewIcon(settings.iconUrl);
    setError('');
  }, [settings]);

  const handleIconChange = async (url: string) => {
    setIconUrl(url);
    setError('');
    
    if (!url) {
      setPreviewIcon('');
      return;
    }

    setIsLoading(true);
    try {
      const isValid = await validateIconUrl(url);
      if (isValid) {
        setPreviewIcon(url);
      } else {
        setError('Invalid icon URL');
      }
    } catch (err) {
      setError('Error loading icon');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (error) return;
    onUpdateCloak({ iconUrl, pageTitle });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 popup-overlay z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-card rounded-lg p-6 shadow-xl animate-scale-in">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted hover:text-foreground 
                     transition-all duration-300 hover:rotate-90"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold mb-6">Tab Cloaking</h2>
          
          {/* Preview Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted mb-2">Preview</h3>
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 px-3 py-2 bg-card rounded border border-border">
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-muted" />
                ) : (
                  <img 
                    src={previewIcon || '/icon.svg'} 
                    alt="Tab Icon" 
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/icon.svg';
                      setError('Failed to load icon');
                    }}
                  />
                )}
                <span className="text-sm truncate">
                  {pageTitle || 'KittenGames'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Icon URL Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={16} className="text-primary" />
                <label className="text-sm font-medium">Icon URL</label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  className={`w-full bg-card/50 text-foreground px-4 py-3 rounded-lg 
                           border transition-all duration-300
                           ${error ? 'border-red-500 focus:ring-red-500' : 
                           'border-border focus:ring-primary group-hover:border-primary/50'}`}
                  value={iconUrl}
                  onChange={(e) => handleIconChange(e.target.value)}
                  placeholder="Enter website URL or direct icon URL"
                />
                {error && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>
                )}
              </div>
              <p className="text-xs text-muted mt-1 ml-1">
                Enter a website URL or direct path to an icon file
              </p>
            </div>

            {/* Page Title Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Type size={16} className="text-primary" />
                <label className="text-sm font-medium">Page Title</label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  className="w-full bg-card/50 text-foreground px-4 py-3 rounded-lg 
                           border border-border group-hover:border-primary/50
                           focus:outline-none focus:ring-2 focus:ring-primary 
                           transition-all duration-300"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-card/30 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted">
                <AlertTriangle size={16} className="text-primary" />
                <p className="text-sm">
                  Changes will take effect immediately and persist across sessions
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!!error}
                className={`flex-1 px-4 py-3 rounded-lg transition-all duration-300 
                         hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2
                         ${error ? 'bg-gray-400 cursor-not-allowed' : 
                         'bg-primary hover:bg-primary-hover text-white hover:shadow-primary/20'}`}
              >
                <Eye size={18} />
                Apply Cloak
              </button>
              <button
                onClick={onRemoveCloak}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 
                         rounded-lg transition-all duration-300 hover:scale-105 
                         hover:shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2"
              >
                <EyeOff size={18} />
                Remove Cloak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}