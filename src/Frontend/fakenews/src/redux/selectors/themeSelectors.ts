import { RootState } from '../store';

const theme = (state: RootState) => state.theme.theme;
const isDarkThemeEnabled = (state: RootState) => state.theme.theme === 'dark';
export const themeSelectors = {
	theme,
	isDarkThemeEnabled,
};
