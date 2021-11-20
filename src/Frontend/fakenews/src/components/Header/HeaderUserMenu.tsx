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
										<EuiLink>Profile</EuiLink>
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

export default HeaderUserMenu;
