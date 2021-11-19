import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface ThemeState {
	theme: Theme;
}

const initialState: ThemeState = {
	theme: 'light',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleMode: (state, { payload }: PayloadAction<Theme>) => {
			state.theme = payload;
		},
	},
});

export default themeSlice.reducer;
