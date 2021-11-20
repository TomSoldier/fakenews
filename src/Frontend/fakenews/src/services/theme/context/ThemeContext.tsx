import { EuiThemeDefault, EuiThemeProvider } from '@elastic/eui';
import React, { useEffect } from 'react';
import { themeActions } from '../../../redux/actions/themeActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { themeSelectors } from '../../../redux/selectors/themeSelectors';
import { Theme } from '../../../redux/slices/themeSlice';
import { applyTheme } from '../theme';

interface IThemeContext {
	children?: JSX.Element;
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
			<EuiThemeProvider theme={EuiThemeDefault} colorMode={theme}>
				{props.children}
			</EuiThemeProvider>
		</ThemeContext.Provider>
	);
};
