import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface ClearCachePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ClearCachePopup({ isOpen, onClose, onConfirm }: ClearCachePopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 popup-overlay z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
        <div className="bg-card rounded-lg p-6 shadow-xl animate-scale-in">
          <h2 className="text-xl font-bold mb-4">Clear Cache</h2>
          <p className="text-muted mb-6">
            This will clear all cached data and reload the page. Are you sure?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 
                       rounded-lg transition-all duration-300 hover:scale-105"
            >
              Clear Cache
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-card-hover hover:bg-opacity-80 px-4 py-2 
                       rounded-lg transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClearCacheButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const clearCache = async () => {
    try {
      // Clear localStorage
      localStorage.clear();

      // Clear cache storage
      if ('caches' in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map(key => caches.delete(key)));
      }

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="p-2 hover:bg-card-hover rounded-lg transition-all duration-300 
                 hover:scale-110 hover:shadow-lg group"
        aria-label="Clear Cache"
      >
        <Trash2 
          className="text-muted group-hover:text-primary transition-colors duration-300" 
          size={20} 
        />
      </button>
      <ClearCachePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={clearCache}
      />
    </>
  );
}