export interface ThemeColors {
  '--md-surface': string;
  '--md-on-surface': string;
  '--md-on-surface-variant': string;
  '--md-primary-container': string;
  '--md-on-primary-container': string;
  '--md-fab': string;
  '--md-on-fab': string;
  '--logo-bg': string;
  '--logo-fg': string;
  [key: string]: string; // 允许 CSS 自定义属性
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

export const THEMES: Theme[] = [
  {
    id: 'crimson',
    name: 'Crimson',
    colors: {
      '--md-surface': '#FFF8F7',
      '--md-on-surface': '#231918',
      '--md-on-surface-variant': '#735C5A',
      '--md-primary-container': '#FFDAD5',
      '--md-on-primary-container': '#410001',
      '--md-fab': '#904A42',
      '--md-on-fab': '#FFFFFF',
      '--logo-bg': '#73332C',
      '--logo-fg': '#FFF8F7',
    }
  },
  {
    id: 'sage',
    name: 'Sage',
    colors: {
      '--md-surface': '#F9F8F0',
      '--md-on-surface': '#1C1C17',
      '--md-on-surface-variant': '#777A69',
      '--md-primary-container': '#DFE5C5',
      '--md-on-primary-container': '#151E00',
      '--md-fab': '#4C5831',
      '--md-on-fab': '#FFFFFF',
      '--logo-bg': '#4C5831',
      '--logo-fg': '#F9F8F0',
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      '--md-surface': '#FDFBFF',
      '--md-on-surface': '#1A1B22',
      '--md-on-surface-variant': '#595A85',
      '--md-primary-container': '#DDE1FF',
      '--md-on-primary-container': '#001552',
      '--md-fab': '#435E91',
      '--md-on-fab': '#FFFFFF',
      '--logo-bg': '#435E91',
      '--logo-fg': '#FDFBFF',
    }
  },
  {
    id: 'mint',
    name: 'Mint',
    colors: {
      '--md-surface': '#F4FAFC',
      '--md-on-surface': '#161D1F',
      '--md-on-surface-variant': '#576165',
      '--md-primary-container': '#BCEBFF',
      '--md-on-primary-container': '#001F29',
      '--md-fab': '#006782',
      '--md-on-fab': '#FFFFFF',
      '--logo-bg': '#006782',
      '--logo-fg': '#F4FAFC',
    }
  }
];
