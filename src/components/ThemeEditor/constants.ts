import { Theme } from '../../themes';

export interface ColorField {
  key: keyof Theme['colors'];
  label: string;
  description: string;
}

export const colorFields: ColorField[] = [
  { key: 'background', label: 'Background', description: 'Main background color' },
  { key: 'foreground', label: 'Foreground', description: 'Primary text color' },
  { key: 'card', label: 'Card', description: 'Card and component background' },
  { key: 'card-hover', label: 'Card Hover', description: 'Card hover state' },
  { key: 'primary', label: 'Primary', description: 'Primary accent color' },
  { key: 'primary-hover', label: 'Primary Hover', description: 'Primary button hover' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary elements' },
  { key: 'secondary-hover', label: 'Secondary Hover', description: 'Secondary hover state' },
  { key: 'accent', label: 'Accent', description: 'Highlights and accents' },
  { key: 'muted', label: 'Muted', description: 'Subdued text and elements' },
  { key: 'border', label: 'Border', description: 'Border color' },
];