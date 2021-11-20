import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText } from '@elastic/eui';
import React from 'react';
import { RegistrationForm } from '../../components/Forms/RegistrationForm';

export const RegistrationPage = React.memo(() => (
	<EuiFlexGroup direction='column' alignItems='center' responsive={false}>
		<EuiFlexItem>
			<EuiSpacer size='xxl' />
		</EuiFlexItem>
		<EuiFlexItem>
			<EuiText>
				<h1>Registration</h1>
			</EuiText>
		</EuiFlexItem>
		<EuiFlexItem>
			<RegistrationForm />
		</EuiFlexItem>
	</EuiFlexGroup>
));
