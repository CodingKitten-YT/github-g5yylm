export interface Theme {
  name: string;
  colorScheme: 'dark' | 'light';
  colors: {
    background: string;
    foreground: string;
    card: string;
    'card-hover': string;
    primary: string;
    'primary-hover': string;
    secondary: string;
    'secondary-hover': string;
    accent: string;
    muted: string;
    border: string;
  };
}

export const themes: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    colorScheme: 'dark',
    colors: {
      background: '#111827',
      foreground: '#ffffff',
      card: '#1f2937',
      'card-hover': '#374151',
      primary: '#8b5cf6',
      'primary-hover': '#7c3aed',
      secondary: '#4b5563',
      'secondary-hover': '#6b7280',
      accent: '#ec4899',
      muted: '#6b7280',
      border: '#374151',
    },
  },
  nord: {
    name: 'Nord',
    colorScheme: 'dark',
    colors: {
      background: '#2e3440',
      foreground: '#eceff4',
      card: '#3b4252',
      'card-hover': '#434c5e',
      primary: '#88c0d0',
      'primary-hover': '#81a1c1',
      secondary: '#4c566a',
      'secondary-hover': '#5e81ac',
      accent: '#b48ead',
      muted: '#4c566a',
      border: '#434c5e',
    },
  },
  sunset: {
    name: 'Sunset',
    colorScheme: 'dark',
    colors: {
      background: '#1a1625',
      foreground: '#fff6e5',
      card: '#2d1b36',
      'card-hover': '#3d2347',
      primary: '#ff7e5f',
      'primary-hover': '#ff6b5b',
      secondary: '#2d1b36',
      'secondary-hover': '#3d2347',
      accent: '#feb47b',
      muted: '#6f5980',
      border: '#3d2347',
    },
  },
  synthwave: {
    name: 'Synthwave',
    colorScheme: 'dark',
    colors: {
      background: '#1a1b2e',
      foreground: '#ff71ce',
      card: '#2d2b55',
      'card-hover': '#34305e',
      primary: '#7795ff',
      'primary-hover': '#6b85e8',
      secondary: '#2d2b55',
      'secondary-hover': '#34305e',
      accent: '#01cdfe',
      muted: '#a599e9',
      border: '#34305e',
    },
  },
  ocean: {
    name: 'Ocean',
    colorScheme: 'dark',
    colors: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      card: '#1e293b',
      'card-hover': '#334155',
      primary: '#38bdf8',
      'primary-hover': '#0ea5e9',
      secondary: '#1e293b',
      'secondary-hover': '#334155',
      accent: '#818cf8',
      muted: '#64748b',
      border: '#334155',
    },
  },
  abyss: {
    name: 'Abyss',
    colorScheme: 'dark',
    colors: {
      background: '#011627',
      foreground: '#F0F8FF',
      card: '#000000',
      'card-hover': '#003A70',
      primary: '#007BFF',
      'primary-hover': '#0056B3',
      secondary: '#011627',
      'secondary-hover': '#003A70',
      accent: '#003366',
      muted: '#003A70',
      border: '#003A70',
    },
  },
  eclipse: {
    name: 'Eclipse',
    colorScheme: 'dark',
    colors: {
      background: '#000000',
      foreground: '#FFFFFF',
      card: '#121212',
      'card-hover': '#1E1E1E',
      primary: '#BB86FC',
      'primary-hover': '#985EFF',
      secondary: '#03DAC6',
      'secondary-hover': '#018786',
      accent: '#FF0266',
      muted: '#5E5E5E',
      border: '#2A2A2A',
    },
  },
};
