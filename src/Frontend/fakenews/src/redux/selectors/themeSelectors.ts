import { RootState } from '../store';

const theme = (state: RootState) => state.theme.theme;
export const themeSelectors = {
	theme,
};
