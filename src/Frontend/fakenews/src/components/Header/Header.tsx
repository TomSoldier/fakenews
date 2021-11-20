import { EuiHeaderLink, EuiHeaderLinks, EuiSwitchEvent } from '@elastic/eui';
import React from 'react';

import {
	EuiFlexGroup,
	EuiHeader,
	EuiHeaderSection,
	EuiHeaderSectionItem,
	EuiIcon,
	EuiSpacer,
	EuiSwitch,
	EuiText,
} from '@elastic/eui';
import { themeActions } from '../../redux/actions/themeActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { themeSelectors } from '../../redux/selectors/themeSelectors';
import { Link, useNavigate } from 'react-router-dom';
import HeaderUserMenu from './HeaderUserMenu';
import { userSelectors } from '../../redux/selectors/userSelectors';

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
		<>
			<EuiSpacer />
			<EuiHeader
				position='fixed'
				theme={isDarkThemeEnabled ? 'dark' : 'default'}
			>
				<EuiHeaderSection grow={true} style={{ padding: 20 }}>
					<EuiHeaderSectionItem>
						<Link to='/'>
							<EuiFlexGroup style={{ marginRight: 30 }}>
								<EuiIcon
									size='xl'
									type='notebookApp'
									style={{ marginRight: 10 }}
								/>
								<EuiText>
									<h2>FakeNews</h2>
								</EuiText>
							</EuiFlexGroup>
						</Link>
					</EuiHeaderSectionItem>
					<EuiHeaderSectionItem>
						<EuiSwitch
							showLabel
							label='Dark mode'
							checked={darkMode}
							onChange={onChange}
						/>
					</EuiHeaderSectionItem>
				</EuiHeaderSection>
				<EuiHeaderSection side='right'>
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
				</EuiHeaderSection>
			</EuiHeader>
		</>
	);
};
