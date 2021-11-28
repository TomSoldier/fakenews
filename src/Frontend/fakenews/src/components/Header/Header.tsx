import {
	EuiHeaderLink,
	EuiHeaderLinks,
	EuiHeaderLogo,
	EuiShowFor,
	EuiSwitchEvent,
} from '@elastic/eui';
import React from 'react';

import { EuiHeader, EuiHeaderSectionItem, EuiSwitch } from '@elastic/eui';
import { themeActions } from '../../redux/actions/themeActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { themeSelectors } from '../../redux/selectors/themeSelectors';
import { useNavigate } from 'react-router-dom';
import HeaderUserMenu from './HeaderUserMenu';
import { userSelectors } from '../../redux/selectors/userSelectors';
import CategoryMenu from './CategoryMenu';
import Search from './Search';

export default () => {
	const isDarkThemeEnabled = useAppSelector(themeSelectors.isDarkThemeEnabled);
	const isLoggedIn = useAppSelector(userSelectors.isLoggedIn);
	const navigate = useNavigate();
	const [darkMode, setDarkMode] = React.useState(isDarkThemeEnabled);
	const dispatch = useAppDispatch();

	const onChange = (e: EuiSwitchEvent) => {
		dispatch(themeActions.toggleMode(e.target.checked ? 'dark' : 'light'));
		setDarkMode(e.target.checked);
	};

	return (
		<EuiHeader
			position='fixed'
			theme={isDarkThemeEnabled ? 'dark' : 'default'}
			sections={[
				{
					items: [
						<EuiHeaderLogo
							key='logo'
							iconType='logoElastic'
							onClick={() => navigate('/')}
						>
							FakeNews
						</EuiHeaderLogo>,
						<CategoryMenu key='categoryMenu' />,
					],
					borders: 'none',
				},
				{
					items: [
						<EuiShowFor key='items' sizes={['m', 'l', 'xl']}>
							<Search />
						</EuiShowFor>,
					],
					borders: 'none',
				},
				{
					items: [
						<EuiShowFor key='showfor' sizes={['xs', 's']}>
							<Search />
						</EuiShowFor>,
						<EuiSwitch
							key='darkmode'
							showLabel
							label='Dark mode'
							checked={darkMode}
							onChange={onChange}
						/>,
						isLoggedIn ? (
							<EuiHeaderSectionItem>
								<HeaderUserMenu />
							</EuiHeaderSectionItem>
						) : (
							<EuiHeaderSectionItem>
								<EuiHeaderLinks aria-label='App navigation links'>
									<EuiHeaderLink
										iconType='user'
										onClick={() => navigate('/login')}
									>
										Login
									</EuiHeaderLink>

									<EuiHeaderLink
										iconType='documentEdit'
										onClick={() => navigate('/registration')}
									>
										Register
									</EuiHeaderLink>

									<EuiHeaderLink iconType='help'>Help</EuiHeaderLink>
								</EuiHeaderLinks>
							</EuiHeaderSectionItem>
						),
					],
					borders: 'none',
				},
			]}
		/>
	);
};
