import {
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
				<EuiFlexItem style={{ textAlign: 'center' }}>
					<EuiText>
						<h3>Available categories</h3>
					</EuiText>
				</EuiFlexItem>
				<EuiFlexItem style={{ textAlign: 'center' }}>
					<EuiText>
						<h3>New category</h3>
					</EuiText>
				</EuiFlexItem>
			</EuiFlexGroup>
			<EuiFlexGroup>
				<EuiFlexItem>
					<EuiPanel>
						<EuiPinnableListGroup
							onPinClick={handlePinClick}
							listItems={categories.map((category) => ({
								id: category.id.toString(),
								label: category.name,
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
						<CategoryForm />
					</EuiPanel>
				</EuiFlexItem>
			</EuiFlexGroup>
		</EuiPageTemplate>
	);
};

export default CategoriesPage;
