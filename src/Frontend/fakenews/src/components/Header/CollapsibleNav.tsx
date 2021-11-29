import {
	EuiAvatar,
	EuiCollapsibleNav,
	EuiCollapsibleNavGroup,
	EuiFlexGroup,
	EuiFlexItem,
	EuiHeaderSectionItemButton,
	EuiIcon,
	EuiLink,
	EuiListGroup,
	EuiListGroupItem,
	EuiSpacer,
	EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Role } from '../../models/Role';
import { eventActions } from '../../redux/actions/eventActions';
import { userActions } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';
import { userSelectors } from '../../redux/selectors/userSelectors';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';
import Search from './Search';

export default () => {
	const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
	const categories = useAppSelector(categorySelectors.categories);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelectors.userDetails);
	const isLoggedIn = useAppSelector(userSelectors.isLoggedIn);

	const handleOnClickMenuItem = (id: number) => {
		navigate(`/category/${id}`);
	};

	const handleLogout = () => {
		setNavIsOpen(false);
		dispatch(eventActions.addEvent(createEvent(FakeNewsEventType.Logout)));
		dispatch(userActions.logout());
	};

	const handleLoginClick = () => {
		setNavIsOpen(false);
		navigate('/login');
	};

	const handleRegisterClick = () => {
		setNavIsOpen(false);
		navigate('/registration');
	};

	const handleDashboardClick = () => {
		setNavIsOpen(false);
		navigate('/admin');
	};

	return (
		<EuiCollapsibleNav
			isOpen={navIsOpen}
			size={300}
			button={
				<EuiHeaderSectionItemButton
					onClick={() => setNavIsOpen((isOpen) => !isOpen)}
					key='menu'
					iconType='menu'
				></EuiHeaderSectionItemButton>
			}
			onClose={() => setNavIsOpen(false)}
		>
			<EuiCollapsibleNavGroup title='FakeNews' iconType='notebookApp'>
				<Search />
			</EuiCollapsibleNavGroup>
			<EuiCollapsibleNavGroup
				title='User menu'
				isCollapsible={true}
				initialIsOpen={true}
			>
				{isLoggedIn ? (
					<EuiFlexGroup
						gutterSize='m'
						className='euiHeaderProfile'
						responsive={false}
						direction='rowReverse'
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
										<EuiLink onClick={handleDashboardClick}> Dashboard</EuiLink>
									</EuiFlexItem>
								)}

								<EuiFlexItem grow={false}>
									<EuiLink onClick={handleLogout}>Log out</EuiLink>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiFlexItem>
					</EuiFlexGroup>
				) : (
					<EuiListGroup
						maxWidth='none'
						color='subdued'
						gutterSize='none'
						size='s'
					>
						<EuiListGroupItem
							label='Login'
							iconType='user'
							onClick={handleLoginClick}
						></EuiListGroupItem>
						<EuiListGroupItem
							label='Register'
							iconType='documentEdit'
							onClick={handleRegisterClick}
						></EuiListGroupItem>
					</EuiListGroup>
				)}
			</EuiCollapsibleNavGroup>
			<EuiCollapsibleNavGroup
				title='Categories'
				isCollapsible={true}
				initialIsOpen={true}
			>
				<EuiListGroup
					maxWidth='none'
					color='subdued'
					gutterSize='none'
					size='s'
				>
					{categories.map((category) => (
						<EuiListGroupItem
							key={category.id}
							label={category.name}
							icon={
								<EuiIcon
									type='starFilled'
									size='m'
									color={category.colorCode}
								/>
							}
							onClick={() => {
								setNavIsOpen(false);
								handleOnClickMenuItem(category.id);
							}}
						/>
					))}
				</EuiListGroup>
			</EuiCollapsibleNavGroup>
		</EuiCollapsibleNav>
	);
};
