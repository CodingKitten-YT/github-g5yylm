import { LucideIcon, Hexagon, Swords, Footprints, Crosshair, Puzzle, Gamepad2, Clock, Car, LayoutGrid } from 'lucide-react';

export interface Game {
  name: string;
  image: string;
  url: string;
  type: string;
  newtab?: boolean;
}

export type GameType = 'all' | 'other' | 'battle' | 'platformer' | 'shooter' | 'puzzle' | 'skill' | 'idle' | 'racing';

export const GAME_TYPES: GameType[] = ['all', 'other', 'battle', 'platformer', 'shooter', 'puzzle', 'skill', 'idle', 'racing'];

export const GAME_TYPE_ICONS: Record<GameType, LucideIcon> = {
  all: LayoutGrid,
  other: Hexagon,
  battle: Swords,
  platformer: Footprints,
  shooter: Crosshair,
  puzzle: Puzzle,
  skill: Gamepad2,
  idle: Clock,
  racing: Car,
};