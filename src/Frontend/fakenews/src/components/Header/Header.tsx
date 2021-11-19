import { EuiSwitchEvent, useGeneratedHtmlId } from '@elastic/eui';
import React, { useState } from 'react';

import {
	EuiAvatar,
	EuiButtonEmpty,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFlyout,
	EuiFlyoutBody,
	EuiFlyoutFooter,
	EuiFlyoutHeader,
	EuiHeader,
	EuiHeaderSection,
	EuiHeaderSectionItem,
	EuiHeaderSectionItemButton,
	EuiIcon,
	EuiLink,
	EuiPopover,
	EuiPopoverFooter,
	EuiPopoverTitle,
	EuiPortal,
	EuiSpacer,
	EuiSwitch,
	EuiText,
	EuiTitle,
} from '@elastic/eui';
import { themeActions } from '../../redux/actions/themeActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { themeSelectors } from '../../redux/selectors/themeSelectors';

const HeaderUpdates = () => {
	const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
	const [isPopoverVisible, setIsPopoverVisible] = useState(false);
	const newsFeedFlyoutId = useGeneratedHtmlId({ prefix: 'newsFeedFlyout' });
	const newsFeedFlyoutTitleId = useGeneratedHtmlId({
		prefix: 'newsFeedFlyoutTitle',
	});
	const newsFeedPopoverId = useGeneratedHtmlId({ prefix: 'newsFeedPopover' });

	const closeFlyout = () => {
		setIsFlyoutVisible(false);
	};

	const closePopover = () => {
		setIsPopoverVisible(false);
	};

	const showFlyout = () => {
		setIsFlyoutVisible(!isFlyoutVisible);
	};

	const showPopover = () => {
		setIsPopoverVisible(!isPopoverVisible);
	};

	const bellButton = (
		<EuiHeaderSectionItemButton
			aria-controls='headerFlyoutNewsFeed'
			aria-expanded={isFlyoutVisible}
			aria-haspopup='true'
			aria-label={'Alerts feed: Updates available'}
			onClick={() => showFlyout()}
			notification={true}
		>
			<EuiIcon type='bell' />
		</EuiHeaderSectionItemButton>
	);

	const cheerButton = (
		<EuiHeaderSectionItemButton
			aria-controls='headerPopoverNewsFeed'
			aria-expanded={isPopoverVisible}
			aria-haspopup='true'
			aria-label={"News feed: Updates available'"}
			onClick={showPopover}
			notification={6}
		>
			<EuiIcon type='cheer' />
		</EuiHeaderSectionItemButton>
	);

	const flyout = (
		<EuiPortal>
			<EuiFlyout
				onClose={closeFlyout}
				size='s'
				id={newsFeedFlyoutId}
				aria-labelledby={newsFeedFlyoutTitleId}
			>
				<EuiFlyoutHeader hasBorder>
					<EuiTitle size='s'>
						<h2 id={newsFeedFlyoutTitleId}>What&apos;s new</h2>
					</EuiTitle>
				</EuiFlyoutHeader>
				<EuiFlyoutBody></EuiFlyoutBody>
				<EuiFlyoutFooter>
					<EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
						<EuiFlexItem grow={false}>
							<EuiButtonEmpty
								iconType='cross'
								onClick={closeFlyout}
								flush='left'
							>
								Close
							</EuiButtonEmpty>
						</EuiFlexItem>
						<EuiFlexItem grow={false}>
							<EuiText color='subdued' size='s'>
								<p>Version 7.0</p>
							</EuiText>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlyoutFooter>
			</EuiFlyout>
		</EuiPortal>
	);

	const popover = (
		<EuiPopover
			id={newsFeedPopoverId}
			ownFocus
			repositionOnScroll
			button={cheerButton}
			isOpen={isPopoverVisible}
			closePopover={closePopover}
			panelPaddingSize='none'
		>
			<EuiPopoverTitle paddingSize='s'>What&apos;s new</EuiPopoverTitle>
			<div style={{ maxHeight: '40vh', overflowY: 'auto', padding: 4 }}>
				<EuiSpacer size='s' />
			</div>
			<EuiPopoverFooter paddingSize='s'>
				<EuiText color='subdued' size='s'>
					<p>Version 7.0</p>
				</EuiText>
			</EuiPopoverFooter>
		</EuiPopover>
	);

	return (
		<>
			{bellButton}
			{popover}
			{isFlyoutVisible && flyout}
		</>
	);
};

const HeaderUserMenu = () => {
	const userPopoverId = useGeneratedHtmlId({ prefix: 'userPopover' });
	const [isOpen, setIsOpen] = useState(false);

	const onMenuButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const button = (
		<EuiHeaderSectionItemButton
			aria-controls={userPopoverId}
			aria-expanded={isOpen}
			aria-haspopup='true'
			aria-label='Account menu'
			onClick={onMenuButtonClick}
		>
			<EuiAvatar name='John Username' size='s' />
		</EuiHeaderSectionItemButton>
	);

	return (
		<EuiPopover
			id={userPopoverId}
			repositionOnScroll
			button={button}
			isOpen={isOpen}
			anchorPosition='downRight'
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
						<EuiAvatar name='John Username' size='xl' />
					</EuiFlexItem>

					<EuiFlexItem>
						<EuiText>
							<p>John Username</p>
						</EuiText>

						<EuiSpacer size='m' />

						<EuiFlexGroup>
							<EuiFlexItem>
								<EuiFlexGroup justifyContent='spaceBetween'>
									<EuiFlexItem grow={false}>
										<EuiLink>Edit profile</EuiLink>
									</EuiFlexItem>

									<EuiFlexItem grow={false}>
										<EuiLink>Log out</EuiLink>
									</EuiFlexItem>
								</EuiFlexGroup>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
				</EuiFlexGroup>
			</div>
		</EuiPopover>
	);
};

export default () => {
	const isDarkThemeEnabled = useAppSelector(themeSelectors.isDarkThemeEnabled);
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
				<EuiHeaderSection grow={false} style={{ padding: 20 }}>
					<EuiHeaderSectionItem>
						<EuiFlexGroup>
							<EuiIcon
								size='xl'
								type='notebookApp'
								style={{ marginRight: 10 }}
							/>
							<EuiText>
								<h2>FakeNews</h2>
							</EuiText>
						</EuiFlexGroup>
					</EuiHeaderSectionItem>
				</EuiHeaderSection>
				<EuiHeaderSection side='right'>
					<EuiHeaderSectionItem>
						<EuiFlexGroup
							alignItems='center'
							gutterSize='m'
							style={{ padding: 10 }}
						>
							<EuiFlexItem grow={false}>
								<EuiSwitch
									showLabel
									label='Dark mode'
									checked={darkMode}
									onChange={onChange}
								/>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiHeaderSectionItem>
					<EuiHeaderSectionItem>
						<HeaderUpdates />
					</EuiHeaderSectionItem>
					<EuiHeaderSectionItem>
						<HeaderUserMenu />
					</EuiHeaderSectionItem>
				</EuiHeaderSection>
			</EuiHeader>
		</>
	);
};
