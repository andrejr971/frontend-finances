export const themes = {
  light: {
    background: '#d4d4d4',
    primary: '#3a3d4a',
    gray: '#fff',
    'gray-light': '#a9adba',
    'gray-dark': '#a9adba',
    blue: '#3E9EF1',
    green: '#1eb14f',
    red: '#c53030',
  },
  dark: {
    background: '#121214',
    primary: '#c6c6c6',
    gray: '#202024',
    'gray-light': '#a3a6b3',
    'gray-dark': '#0d0d0d',
    blue: '#3E9EF1',
    green: '#55ee88',
    red: '#c53030',
  },
};

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.light | typeof themes.dark;
