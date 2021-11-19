import { applyTheme } from '../../services/theme/theme';
import { Theme, themeSlice } from '../slices/themeSlice';
import { AppDispatch } from '../store';

const { actions } = themeSlice;

export const themeActions = {
	...actions,
	toggleMode: (theme: Theme) => {
		return async (dispatch: AppDispatch) => {
			applyTheme(theme);
			dispatch(actions.toggleMode(theme));
		};
	},
};
