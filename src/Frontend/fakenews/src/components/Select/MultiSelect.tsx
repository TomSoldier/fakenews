import {
	useGeneratedHtmlId,
	EuiFilterButton,
	EuiFilterGroup,
	EuiPopover,
	EuiPopoverTitle,
	EuiFieldSearch,
	EuiFilterSelectItem,
	FilterChecked,
	EuiBadge,
} from '@elastic/eui';
import React, { useState } from 'react';

interface Item {
	name: string;
	colorCode: string;
	checked?: FilterChecked;
}

interface IMultiSelectProps {
	items: Item[];
}

const MultiSelect = (props: IMultiSelectProps) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const onButtonClick = () => {
		setIsPopoverOpen(!isPopoverOpen);
	};

	const closePopover = () => {
		setIsPopoverOpen(false);
	};

	const filterGroupPopoverId = useGeneratedHtmlId({
		prefix: 'filterGroupPopover',
	});

	const [items, setItems] = useState<Item[]>(props.items);

	function updateItem(index: number) {
		if (!items[index]) {
			return;
		}

		const newItems = [...items];

		switch (newItems[index].checked) {
			case 'on':
			case 'off':
				newItems[index].checked = undefined;
				break;
			default:
				newItems[index].checked = 'on';
		}

		setItems(newItems);
	}

	const button = (
		<EuiFilterButton
			iconType='arrowDown'
			onClick={onButtonClick}
			isSelected={isPopoverOpen}
		>
			Categories:{' '}
			{items
				.filter((item) => item.checked === 'on')
				.map((category) => {
					return (
						<EuiBadge
							key={category.name}
							color={category.colorCode}
							style={{ minWidth: 75, textAlign: 'center' }}
						>
							{category.name}
						</EuiBadge>
					);
				})}
		</EuiFilterButton>
	);

	return (
		<EuiFilterGroup fullWidth>
			<EuiPopover
				id={filterGroupPopoverId}
				button={button}
				isOpen={isPopoverOpen}
				closePopover={closePopover}
				panelPaddingSize='none'
			>
				<EuiPopoverTitle paddingSize='s'>
					<EuiFieldSearch compressed />
				</EuiPopoverTitle>
				<div className='euiFilterSelect__items'>
					{items.map((item, index) => (
						<EuiFilterSelectItem
							checked={item.checked}
							key={index}
							onClick={() => updateItem(index)}
						>
							{item.name}
						</EuiFilterSelectItem>
					))}
				</div>
			</EuiPopover>
		</EuiFilterGroup>
	);
};

export default MultiSelect;
