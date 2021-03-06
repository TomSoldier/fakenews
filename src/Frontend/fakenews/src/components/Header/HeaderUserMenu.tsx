import {
	EuiAvatar,
	EuiFlexGroup,
	EuiFlexItem,
	EuiHeaderSectionItemButton,
	EuiLink,
	EuiPopover,
	EuiSpacer,
	EuiText,
	useGeneratedHtmlId,
} from '@elastic/eui';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Role } from '../../models/Role';
import { eventActions } from '../../redux/actions/eventActions';
import { userActions } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userSelectors } from '../../redux/selectors/userSelectors';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';

const HeaderUserMenu = () => {
	const user = useAppSelector(userSelectors.userDetails);
	const userPopoverId = useGeneratedHtmlId({ prefix: 'userPopover' });
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();

	const onMenuButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const handleLogout = () => {
		dispatch(eventActions.addEvent(createEvent(FakeNewsEventType.Logout)));
		dispatch(userActions.logout());
	};

	const button = (
		<EuiHeaderSectionItemButton
			aria-controls={userPopoverId}
			aria-expanded={isOpen}
			aria-haspopup='true'
			aria-label='Account menu'
			onClick={onMenuButtonClick}
		>
			<EuiAvatar name='user' iconType='user' />
		</EuiHeaderSectionItemButton>
	);

	return (
		<EuiPopover
			id={userPopoverId}
			repositionOnScroll
			button={button}
			isOpen={isOpen}
			closePopover={closeMenu}
			panelPaddingSize='none'
		>
			<div style={{ width: 320 }}>
				<EuiFlexGroup
					gutterSize='m'
					className='euiHeaderProfile'
					responsive={false}
				>
					<EuiFlexItem grow={false}>
						<EuiAvatar name='user' size='xl' iconType='user' />
					</EuiFlexItem>

					<EuiFlexItem>
						<EuiText>
							<p style={{ fontSize: 20 }}>{user?.name ?? 'name'}</p>
							{user?.role ?? 'role'}
						</EuiText>

						<EuiSpacer size='m' />
						<EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
							{user?.role === Role.Admin && (
								<EuiFlexItem grow={false}>
									<Link to='/admin'>Dashboard</Link>
								</EuiFlexItem>
							)}

							<EuiFlexItem grow={false}>
								<EuiLink onClick={handleLogout}>Log out</EuiLink>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
				</EuiFlexGroup>
			</div>
		</EuiPopover>
	);
};

export default HeaderUserMenu;
