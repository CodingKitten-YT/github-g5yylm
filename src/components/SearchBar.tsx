import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { GameType } from '../types/game';
import { TypeFilter } from './TypeFilter';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedType: GameType;
  onTypeChange: (type: GameType) => void;
  isSearching?: boolean;
}

export function SearchBar({ value, onChange, selectedType, onTypeChange, isSearching }: SearchBarProps) {
  return (
    <div className="flex gap-2 max-w-2xl w-full">
      <div className="relative flex-1 group">
        <div className="absolute inset-0 bg-primary/5 rounded-lg -m-0.5 opacity-0 
                     group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search games..."
          className="relative w-full bg-card/50 text-foreground pl-10 pr-4 py-2.5 rounded-lg 
                   border border-border focus:outline-none focus:ring-2 
                   focus:ring-primary/20 transition-all duration-300 
                   hover:border-primary/30 z-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          {isSearching ? (
            <Loader2 
              className="text-primary animate-spin transition-all duration-300" 
              size={18} 
            />
          ) : (
            <Search 
              className="text-muted group-hover:text-primary/70 transition-colors duration-300" 
              size={18} 
            />
          )}
        </div>
      </div>
      
      <TypeFilter
        selectedType={selectedType}
        onTypeChange={onTypeChange}
      />
    </div>
  );
}