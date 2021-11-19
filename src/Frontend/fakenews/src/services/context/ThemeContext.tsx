import {
	EuiThemeAmsterdam,
	EuiThemeDefault,
	EuiThemeProvider,
} from '@elastic/eui';
import React, { ReactElement, useEffect } from 'react';
import { themeActions } from '../../redux/actions/themeActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { themeSelectors } from '../../redux/selectors/themeSelectors';
import { Theme } from '../../redux/slices/themeSlice';
import { applyTheme } from '../theme/theme';

interface IThemeContext {
	children?: ReactElement;
}

export const ThemeProvider = (props: IThemeContext) => {
	const theme = useAppSelector(themeSelectors.theme);
	const dispatch = useAppDispatch();

	const changeTheme = (themeValue: Theme) => {
		dispatch(themeActions.toggleMode(themeValue));
	};

	const ThemeContext = React.createContext({
		theme: theme,
		changeTheme: (themeValue: Theme) => {
			applyTheme(themeValue);
		},
	});

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				changeTheme,
			}}
		>
			<EuiThemeProvider theme={EuiThemeAmsterdam} colorMode={theme}>
				{props.children}
			</EuiThemeProvider>
		</ThemeContext.Provider>
	);
};
