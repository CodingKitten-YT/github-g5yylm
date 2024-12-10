import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { GameType, GAME_TYPES, GAME_TYPE_ICONS } from '../types/game';

interface TypeFilterProps {
  selectedType: GameType;
  onTypeChange: (type: GameType) => void;
}

export function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon = GAME_TYPE_ICONS[selectedType];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-card text-foreground px-4 py-2 rounded-lg 
                 border border-border hover:border-primary/50 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-primary group min-w-[140px]"
      >
        <SelectedIcon 
          size={18} 
          className="text-muted group-hover:text-primary/70 transition-colors duration-300"
        />
        <span className="capitalize">{selectedType}</span>
        <ChevronDown 
          size={16} 
          className={`text-muted transition-transform duration-300 ml-auto ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 py-2 w-48 bg-card rounded-lg border border-border 
                        shadow-lg z-20 animate-scale-in origin-top-right">
            {GAME_TYPES.map((type) => {
              const Icon = GAME_TYPE_ICONS[type];
              return (
                <button
                  key={type}
                  onClick={() => {
                    onTypeChange(type);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-card-hover transition-colors 
                           duration-200 flex items-center gap-3 group
                           ${selectedType === type ? 'text-primary bg-primary/5' : ''}`}
                >
                  <Icon 
                    size={18} 
                    className={`${selectedType === type ? 'text-primary' : 'text-muted'} 
                             group-hover:text-primary transition-colors duration-200`}
                  />
                  <span className="capitalize">{type}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}