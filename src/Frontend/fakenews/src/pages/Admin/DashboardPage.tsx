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

const renderOption = (label: string, iconType: IconType) => (
	<>
		<EuiFlexItem>
			<EuiShowFor sizes={['xs', 's']}>
				<EuiKeyPadMenuItem
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
		</EuiFlexItem>
	</>
);

const DashboardPage = () => {
	return (
		<EuiPageTemplate
			template='centeredBody'
			pageHeader={{ pageTitle: 'Admin dashboard' }}
		>
			<EuiFlexGrid columns={4}>
				{renderOption('Users', 'users')}
				{renderOption('Articles', 'documents')}
				{renderOption('Categories', 'submodule')}
				{renderOption('NotImplemented', 'alert')}
			</EuiFlexGrid>
		</EuiPageTemplate>
	);
};

export default DashboardPage;
