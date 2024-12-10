import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { Theme } from '../themes';

interface ThemeCardProps {
  id: string;
  theme: Theme;
  isCustom: boolean;
  url: string | null;
  isSelected: boolean;
  onSelect: () => void;
  onRemove?: () => void;
}

export function ThemeCard({ 
  id, 
  theme, 
  isCustom, 
  isSelected, 
  onSelect, 
  onRemove 
}: ThemeCardProps) {
  return (
    <div
      onClick={onSelect}
      className="relative p-3 rounded-lg border-2 transition-all duration-300 
                 hover-lift group cursor-pointer animate-scale-in"
      style={{
        backgroundColor: theme.colors.card,
        color: theme.colors.foreground,
        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
        transform: `scale(${isSelected ? 1.02 : 1})`,
      }}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate">{theme.name}</span>
          {isSelected && (
            <Check size={14} className="text-primary animate-scale-in" />
          )}
        </div>
        <div className="grid grid-cols-6 gap-1">
          {Object.entries(theme.colors).slice(0, 6).map(([key, color]) => (
            <div
              key={key}
              className="aspect-square rounded-full transform transition-transform 
                       duration-300 hover:scale-125 group/color relative"
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 opacity-0 group-hover/color:opacity-100 
                          transition-opacity duration-200 bg-black/50 rounded-full 
                          flex items-center justify-center">
                <span className="text-[6px] text-white font-mono">{key}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCustom && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 p-1 bg-card rounded-full opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300 
                   hover:bg-red-500 hover:text-white shadow-lg"
        >
          <Trash2 size={12} />
        </button>
      )}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent 
                   opacity-0 group-hover:opacity-30 transition-opacity duration-300 
                   pointer-events-none rounded-lg"
      />
    </div>
  );
}