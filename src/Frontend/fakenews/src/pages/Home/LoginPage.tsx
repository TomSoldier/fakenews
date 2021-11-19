import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText } from '@elastic/eui';
import React from 'react';
import { LoginForm } from '../../components/Forms/LoginForm';

export const LoginPage = React.memo(() => (
	<EuiFlexGroup direction='column' alignItems='center' responsive={false}>
		<EuiFlexItem>
			<EuiSpacer size='xxl' />
		</EuiFlexItem>
		<EuiFlexItem>
			<EuiText>
				<h1>Login</h1>
			</EuiText>
		</EuiFlexItem>
		<EuiFlexItem>
			<LoginForm />
		</EuiFlexItem>
	</EuiFlexGroup>
));
