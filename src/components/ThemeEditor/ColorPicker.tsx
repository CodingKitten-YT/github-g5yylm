import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Eye, Pipette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pipette size={18} className="text-primary" />
          <h3 className="text-lg font-medium">Color Picker</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Eye size={14} />
          <span>Editing: {label}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <HexColorPicker
          color={color}
          onChange={onChange}
          className="flex-1 max-w-xs !w-auto"
        />
        <div className="space-y-4">
          <div
            className="w-16 h-16 rounded-lg shadow-inner transition-colors duration-200"
            style={{ backgroundColor: color }}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-card/50 px-3 py-2 rounded-lg border border-border 
                     text-sm font-mono uppercase"
          />
        </div>
      </div>
    </div>
  );
}