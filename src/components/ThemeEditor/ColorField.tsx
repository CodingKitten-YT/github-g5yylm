import React from 'react';
import { Theme } from '../../themes';
import { Check } from 'lucide-react';

interface ColorFieldProps {
  field: {
    key: keyof Theme['colors'];
    label: string;
    description: string;
  };
  color: string;
  isActive: boolean;
  onClick: () => void;
  foregroundColor?: string;
}

export function ColorField({ field, color, isActive, onClick, foregroundColor }: ColorFieldProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 
                 hover:scale-102 group relative
                 ${isActive ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'}`}
      style={{
        backgroundColor: color,
        color: field.key === 'background' ? foregroundColor : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full border-2 border-white/20 transition-transform 
                     duration-300 group-hover:scale-110"
            style={{ backgroundColor: color }}
          />
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Check size={14} className="text-white drop-shadow-md" />
            </div>
          )}
        </div>
        <div className="text-left flex-1">
          <div className="font-medium">{field.label}</div>
          <div className="text-sm opacity-80">{field.description}</div>
        </div>
      </div>
      
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                 rounded-lg pointer-events-none"
      />
    </button>
  );
}