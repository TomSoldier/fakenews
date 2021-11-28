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

const renderOption = (label: string, iconType: IconType, linkTo: string) => (
	<EuiFlexItem>
		<Link to={linkTo}>
			<EuiShowFor sizes={['xs', 's']}>
				<EuiKeyPadMenuItem
					betaBadgeIconType='1'
					isSelected
					label={label}
					style={{ width: '100%', padding: 10 }}
				>
					<EuiIcon type={iconType} size='xxl' />
				</EuiKeyPadMenuItem>
			</EuiShowFor>
			<EuiShowFor sizes={['m', 'l', 'xl']}>
				<EuiKeyPadMenuItem
					isSelected
					label={label}
					style={{ width: 200, height: 200, padding: 10 }}
				>
					<EuiIcon type={iconType} size='xxl' />
				</EuiKeyPadMenuItem>
			</EuiShowFor>
		</Link>
	</EuiFlexItem>
);

const DashboardPage = () => {
	return (
		<EuiPageTemplate
			template='centeredBody'
			pageHeader={{ pageTitle: 'Admin dashboard' }}
		>
			<EuiFlexGrid columns={4}>
				{renderOption('Users', 'users', '/admin/users')}
				{renderOption('Articles', 'documents', '/admin/articles')}
				{renderOption('Categories', 'submodule', '/admin/categories')}
				{renderOption('NotImplemented', 'alert', '/admin/notfound')}
			</EuiFlexGrid>
		</EuiPageTemplate>
	);
};

export default DashboardPage;
