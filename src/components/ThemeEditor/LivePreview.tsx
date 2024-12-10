import React from 'react';
import { Theme } from '../../themes';
import { Palette, Bell, User, Settings, Search } from 'lucide-react';

interface LivePreviewProps {
  theme: Theme;
}

export function LivePreview({ theme }: LivePreviewProps) {
  return (
    <div className="flex-1 rounded-lg border border-border overflow-hidden">
      <div
        className="w-full h-full overflow-y-auto"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.foreground,
        }}
      >
        {/* Header Preview */}
        <div
          className="p-4 border-b transition-colors duration-200"
          style={{ 
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border 
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Palette size={24} style={{ color: theme.colors.primary }} />
              <div
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                style={{ backgroundColor: theme.colors['card-hover'] }}
              >
                <Search size={16} style={{ color: theme.colors.muted }} />
                <span style={{ color: theme.colors.muted }}>Search...</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: theme.colors.card,
                  color: theme.colors.muted,
                  ':hover': { backgroundColor: theme.colors['card-hover'] }
                }}
              >
                <Bell size={18} />
              </button>
              <button
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: theme.colors.card,
                  color: theme.colors.muted
                }}
              >
                <User size={18} />
              </button>
              <button
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: theme.colors.card,
                  color: theme.colors.muted
                }}
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-6 space-y-6">
          {/* Card Preview */}
          <div
            className="p-6 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: theme.colors.card }}
          >
            <h3 className="text-xl font-bold mb-4">Content Card</h3>
            <p className="mb-4" style={{ color: theme.colors.muted }}>
              This preview shows how your theme will look in different contexts.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: '#ffffff',
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.foreground,
                }}
              >
                Secondary Button
              </button>
              <button
                className="px-4 py-2 rounded-lg border transition-colors duration-200"
                style={{
                  borderColor: theme.colors.border,
                  color: theme.colors.foreground,
                }}
              >
                Outline Button
              </button>
            </div>
          </div>

          {/* Interactive Elements */}
          <div
            className="p-6 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: theme.colors.card }}
          >
            <h4 className="font-medium mb-4">Interactive Elements</h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Text Input"
                className="w-full px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: theme.colors['card-hover'],
                  color: theme.colors.foreground,
                  borderColor: theme.colors.border,
                }}
              />
              <div
                className="p-4 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: theme.colors['card-hover'],
                  color: theme.colors.muted,
                }}
              >
                Hover State Example
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <span>Accent Color</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}