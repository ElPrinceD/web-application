import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { COLORS } from './index';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    surface: COLORS.white,
    background: COLORS.light,
    error: COLORS.error,
    onPrimary: COLORS.white,
    onSecondary: COLORS.white,
    onSurface: COLORS.dark,
    onBackground: COLORS.dark,
    onError: COLORS.white,
  },
  roundness: 12,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    surface: COLORS.dark,
    background: '#121212',
    error: COLORS.error,
    onPrimary: COLORS.white,
    onSecondary: COLORS.white,
    onSurface: COLORS.white,
    onBackground: COLORS.white,
    onError: COLORS.white,
  },
  roundness: 12,
};


