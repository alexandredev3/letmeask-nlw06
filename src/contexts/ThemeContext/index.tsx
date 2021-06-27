import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { ThemeProviderProps } from './types';

import { themes } from '../../styles/themes';

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProvider theme={themes.light}>
      {children}
    </StyledThemeProvider>
  );
}