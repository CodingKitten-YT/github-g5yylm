import { useState, useTransition } from 'react';
import { Game, GameType } from '../types/game';

export function useGameFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<GameType>('all');
  const [isPending, startTransition] = useTransition();

  const filterGames = (games: Game[]) => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || game.type === selectedType;
      return matchesSearch && matchesType;
    });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  const handleTypeChange = (type: GameType) => {
    setSelectedType(type);
    startTransition(() => {
      setSelectedType(type);
    });
  };

  return {
    searchQuery,
    selectedType,
    isPending,
    handleSearch,
    handleTypeChange,
    filterGames,
  };
}