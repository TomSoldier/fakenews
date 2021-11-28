import {
	EuiBadge,
	EuiFlexGroup,
	EuiFlexItem,
	EuiPageTemplate,
	EuiPanel,
	EuiPinnableListGroup,
	EuiPinnableListGroupItemProps,
	EuiText,
} from '@elastic/eui';
import React from 'react';
import { CategoryForm } from '../../components/Forms/CategoryForm';
import { categoryActions } from '../../redux/actions/categoryActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';

const CategoriesPage = () => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector(categorySelectors.categories);

	const handlePinClick = (_: EuiPinnableListGroupItemProps) => {
		// NOOP
	};

	const handleDelete = (id: number, name: string) => {
		dispatch(categoryActions.removeCategory(id, name));
	};

	return (
		<EuiPageTemplate
			template='centeredBody'
			pageHeader={{ pageTitle: 'Categories' }}
			pageContentProps={{ style: { width: '100%' } }}
		>
			<EuiFlexGroup>
				<EuiFlexItem>
					<EuiPanel>
						<EuiFlexItem style={{ textAlign: 'center' }}>
							<EuiText>
								<h3>Available categories</h3>
							</EuiText>
						</EuiFlexItem>
						<EuiPinnableListGroup
							onPinClick={handlePinClick}
							listItems={categories.map((category) => ({
								id: category.id.toString(),
								label: (
									<EuiBadge
										color={category.colorCode}
										style={{ minWidth: 75, textAlign: 'center' }}
									>
										{category.name}
									</EuiBadge>
								),
								style: {
									color: category.colorCode,
								},
								extraAction: {
									color: 'danger',
									iconType: 'trash',
									alwaysShow: true,
									'aria-label': 'trash',
									onClick: () => handleDelete(category.id, category.name),
								},
							}))}
						/>
					</EuiPanel>
				</EuiFlexItem>
				<EuiFlexItem grow>
					<EuiPanel>
						<EuiFlexItem style={{ textAlign: 'center' }}>
							<EuiText>
								<h3>New category</h3>
							</EuiText>
						</EuiFlexItem>
						<CategoryForm />
					</EuiPanel>
				</EuiFlexItem>
			</EuiFlexGroup>
		</EuiPageTemplate>
	);
};

export default CategoriesPage;
