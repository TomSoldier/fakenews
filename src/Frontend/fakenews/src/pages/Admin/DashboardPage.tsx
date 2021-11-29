import {
	EuiKeyPadMenuItem,
	EuiIcon,
	EuiFlexItem,
	EuiShowFor,
	EuiFlexGrid,
	EuiPageTemplate,
	IconType,
} from '@elastic/eui';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';

const renderOption = (
	label: string,
	iconType: IconType,
	linkTo: string,
	isDisabled?: boolean
) => (
	<EuiFlexItem>
		<Link to={isDisabled ? '#' : linkTo}>
			<EuiShowFor sizes={['xs', 's']}>
				<EuiKeyPadMenuItem
					betaBadgeIconType='1'
					isSelected
					label={label}
					style={{ width: '100%', padding: 10 }}
					onClick={(e) => e.preventDefault()}
					disabled={isDisabled}
				>
					<EuiIcon type={iconType} size='xxl' />
				</EuiKeyPadMenuItem>
			</EuiShowFor>
			<EuiShowFor sizes={['m', 'l', 'xl']}>
				<EuiKeyPadMenuItem
					isSelected
					label={label}
					style={{ width: 200, height: 200, padding: 10 }}
					disabled={isDisabled}
				>
					<EuiIcon type={iconType} size='xxl' />
				</EuiKeyPadMenuItem>
			</EuiShowFor>
		</Link>
	</EuiFlexItem>
);

const DashboardPage = () => {
	const categoryCount = useAppSelector(categorySelectors.count);
	const isDisabled = categoryCount === 0;
	return (
		<EuiPageTemplate
			template='centeredBody'
			pageHeader={{ pageTitle: 'Admin dashboard' }}
		>
			<EuiFlexGrid columns={4}>
				{renderOption(
					'New/Edit article',
					'documents',
					'/admin/articles',
					isDisabled
				)}
				{renderOption('Manage categories', 'submodule', '/admin/categories')}
			</EuiFlexGrid>
		</EuiPageTemplate>
	);
};

export default DashboardPage;
