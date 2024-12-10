import React from 'react';
import { Hexagon, Swords, Footprints, Crosshair, Puzzle, Gamepad2, Clock, Car, ExternalLink } from 'lucide-react';

interface GameCardProps {
  name: string;
  image: string;
  type: string;
  newtab?: boolean;
  onClick: () => void;
}

const typeIcons = {
  other: Hexagon,
  battle: Swords,
  platformer: Footprints,
  shooter: Crosshair,
  puzzle: Puzzle,
  skill: Gamepad2,
  idle: Clock,
  racing: Car,
} as const;

export function GameCard({ name, image, type, newtab, onClick }: GameCardProps) {
  const IconComponent = typeIcons[type as keyof typeof typeIcons] || Gamepad2;

  return (
    <button
      onClick={onClick}
      className="group relative bg-card rounded-lg overflow-hidden hover-lift
                 hover:ring-2 ring-primary/50 w-full max-w-[240px] mx-auto
                 transition-all duration-500 ease-out"
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-700 
                     group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            <div className="flex items-center gap-2">
              <IconComponent 
                className="text-white/90 transform translate-y-4 group-hover:translate-y-0 
                           transition-all duration-700 ease-out drop-shadow-lg" 
                size={32} 
              />
              {newtab && (
                <ExternalLink 
                  className="text-white/90 transform translate-y-4 group-hover:translate-y-0 
                             transition-all duration-700 ease-out drop-shadow-lg" 
                  size={20} 
                />
              )}
            </div>
            <h2 className="text-lg font-bold text-white text-center transform 
                         translate-y-4 group-hover:translate-y-0 transition-all duration-700 
                         ease-out opacity-0 group-hover:opacity-100 line-clamp-2
                         drop-shadow-lg">
              {name}
            </h2>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent 
                     opacity-0 group-hover:opacity-30 transition-opacity duration-500 
                     pointer-events-none blur-xl" />
    </button>
  );
}