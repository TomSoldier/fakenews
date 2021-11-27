import {
	EuiButtonEmpty,
	EuiContextMenuPanelDescriptor,
	useGeneratedHtmlId,
} from '@elastic/eui';
import React, { useState } from 'react';

import { EuiContextMenu, EuiIcon, EuiPopover } from '@elastic/eui';
import { useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';
import { useNavigate } from 'react-router';

const CategoryMenu = () => {
	const categories = useAppSelector(categorySelectors.categories);
	const [isPopoverOpen, setPopover] = useState(false);
	const navigate = useNavigate();

	const contextMenuPopoverId = useGeneratedHtmlId({
		prefix: 'contextMenuPopover',
	});

	const onButtonClick = () => {
		setPopover(!isPopoverOpen);
	};

	const closePopover = () => {
		setPopover(false);
	};

	const handleOnClickMenuItem = (id: number) => {
		navigate(`/category/${id}`);
	};

	const panels: EuiContextMenuPanelDescriptor[] = [
		{
			id: 0,
			title: 'Choose category',
			items: categories.map((category) => ({
				name: category.name,
				icon: <EuiIcon type='starFilled' size='m' color={category.colorCode} />,
				onClick: () => {
					closePopover();
					handleOnClickMenuItem(category.id);
				},
			})),
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
