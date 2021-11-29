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
import CollapsibleNav from './CollapsibleNav';
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
						<EuiShowFor sizes={['xs', 's']} key='showForMobileNav'>
							<CollapsibleNav key='colnav' />
						</EuiShowFor>,
						<EuiHeaderLogo
							key='logo'
							iconType='notebookApp'
							onClick={() => navigate('/')}
						>
							FakeNews
						</EuiHeaderLogo>,
						<EuiShowFor sizes={['m', 'l', 'xl']} key='categoryMenu'>
							<CategoryMenu />
						</EuiShowFor>,
					],
					borders: 'none',
				},
				{
					items: [
						<EuiShowFor key='search' sizes={['m', 'l', 'xl']}>
							<Search />
						</EuiShowFor>,
					],
					borders: 'none',
				},
				{
					items: [
						<EuiSwitch
							key='darkmode'
							showLabel
							label='Dark mode'
							checked={darkMode}
							onChange={onChange}
						/>,
						<EuiShowFor key='userMenuPanel' sizes={['m', 'l', 'xl']}>
							{isLoggedIn ? (
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
							)}
						</EuiShowFor>,
					],
					borders: 'none',
				},
			]}
		/>
	);
};
