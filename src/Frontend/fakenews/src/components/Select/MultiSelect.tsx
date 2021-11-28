import {
	useGeneratedHtmlId,
	EuiFilterButton,
	EuiFilterGroup,
	EuiPopover,
	EuiPopoverTitle,
	EuiFilterSelectItem,
	FilterChecked,
	EuiBadge,
} from '@elastic/eui';
import React, { useState } from 'react';
import { CategoryDto } from '../../models/DTO/CategoryDto';

interface Item {
	category: CategoryDto;
	checked?: FilterChecked;
}

interface IMultiSelectProps {
	items: Item[];
	onChange: (categories: CategoryDto[]) => void;
}

const MultiSelect = (props: IMultiSelectProps) => {
	const [items, setItems] = useState<Item[]>(props.items);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const filteredItems = items.filter((item) => item.checked === 'on');

	const onButtonClick = () => {
		setIsPopoverOpen(!isPopoverOpen);
	};

	const closePopover = () => {
		setIsPopoverOpen(false);
		props.onChange(filteredItems.map((x) => x.category));
	};

	const filterGroupPopoverId = useGeneratedHtmlId({
		prefix: 'filterGroupPopover',
	});

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
			{filteredItems.length === 0 && 'Empty'}
			{filteredItems.map((item) => {
				return (
					<EuiBadge
						key={item.category.name}
						color={item.category.colorCode}
						style={{ minWidth: 75, textAlign: 'center' }}
					>
						{item.category.name}
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
				<EuiPopoverTitle paddingSize='s'>Select categories</EuiPopoverTitle>
				<div className='euiFilterSelect__items'>
					{items.map((item, index) => (
						<EuiFilterSelectItem
							checked={item.checked}
							key={index}
							onClick={() => updateItem(index)}
						>
							{item.category.name}
						</EuiFilterSelectItem>
					))}
				</div>
			</EuiPopover>
		</EuiFilterGroup>
	);
};

export default MultiSelect;
