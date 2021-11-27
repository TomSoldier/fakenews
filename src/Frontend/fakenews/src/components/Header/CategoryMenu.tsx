import {
	EuiButtonEmpty,
	EuiContextMenuPanelDescriptor,
	useGeneratedHtmlId,
} from '@elastic/eui';
import React, { useState } from 'react';

import {
	EuiButton,
	EuiContextMenu,
	EuiFormRow,
	EuiIcon,
	EuiPopover,
	EuiSwitch,
	EuiSpacer,
} from '@elastic/eui';

const CategoryMenu = () => {
	const [isPopoverOpen, setPopover] = useState(false);

	const embeddedCodeSwitchId__1 = useGeneratedHtmlId({
		prefix: 'embeddedCodeSwitch',
		suffix: 'first',
	});
	const embeddedCodeSwitchId__2 = useGeneratedHtmlId({
		prefix: 'embeddedCodeSwitch',
		suffix: 'second',
	});
	const contextMenuPopoverId = useGeneratedHtmlId({
		prefix: 'contextMenuPopover',
	});

	const onButtonClick = () => {
		setPopover(!isPopoverOpen);
	};

	const closePopover = () => {
		setPopover(false);
	};

	const panels: EuiContextMenuPanelDescriptor[] = [
		{
			id: 0,
			title: 'This is a context menu',
			items: [
				{
					name: 'Handle an onClick',
					icon: 'search',
					onClick: () => {
						closePopover();
					},
				},
				{
					name: 'Go to a link',
					icon: 'user',
					href: 'http://elastic.co',
					target: '_blank',
				},
				{
					name: 'Nest panels',
					icon: 'wrench',
					panel: 1,
				},
				{
					name: 'Add a tooltip',
					icon: 'document',
					toolTipTitle: 'Optional tooltip',
					toolTipContent: 'Optional content for a tooltip',
					toolTipPosition: 'right',
					onClick: () => {
						closePopover();
					},
				},
				{
					name: 'Use an app icon',
					icon: 'visualizeApp',
				},
				{
					name: 'Pass an icon as a component to customize it',
					icon: <EuiIcon type='trash' size='m' color='danger' />,
				},
				{
					name: 'Disabled option',
					icon: 'user',
					toolTipContent: 'For reasons, this item is disabled',
					toolTipPosition: 'right',
					disabled: true,
					onClick: () => {
						closePopover();
					},
				},
			],
		},
		{
			id: 1,
			initialFocusedItemIndex: 1,
			title: 'Nest panels',
			items: [
				{
					name: 'PDF reports',
					icon: 'user',
					onClick: () => {
						closePopover();
					},
				},
				{
					name: 'Embed code',
					icon: 'user',
					panel: 2,
				},
				{
					name: 'Permalinks',
					icon: 'user',
					onClick: () => {
						closePopover();
					},
				},
			],
		},
		{
			id: 2,
			title: 'Embed code',
			content: (
				<div style={{ padding: 16 }}>
					<EuiFormRow label='Generate a public snapshot?' hasChildLabel={false}>
						<EuiSwitch
							name='switch'
							id={embeddedCodeSwitchId__1}
							label='Snapshot data'
							checked={true}
							onChange={() => null}
						/>
					</EuiFormRow>
					<EuiFormRow
						label='Include the following in the embed'
						hasChildLabel={false}
					>
						<EuiSwitch
							name='switch'
							id={embeddedCodeSwitchId__2}
							label='Current time range'
							checked={true}
							onChange={() => null}
						/>
					</EuiFormRow>
					<EuiSpacer />
					<EuiButton fill>Copy iFrame code</EuiButton>
				</div>
			),
		},
	];

	const button = (
		<EuiButtonEmpty
			onClick={onButtonClick}
			iconType='menu'
			color='text'
			className='menu-items li'
		>
			Categories
		</EuiButtonEmpty>
	);

	return (
		<EuiPopover
			id={contextMenuPopoverId}
			button={button}
			isOpen={isPopoverOpen}
			closePopover={closePopover}
			panelPaddingSize='none'
			anchorPosition='downLeft'
		>
			<EuiContextMenu initialPanelId={0} panels={panels} />
		</EuiPopover>
	);
};

export default CategoryMenu;
