import {
	EuiButton,
	EuiEmptyPrompt,
	EuiPageTemplate,
	EuiText,
} from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<EuiPageTemplate
			template='centeredBody'
			pageContentProps={{ paddingSize: 'none' }}
		>
			<EuiEmptyPrompt
				title={
					<EuiText>
						<h1>Forbidden</h1>
					</EuiText>
				}
				body={
					<p>
						You do not have permission to view the requested page. If you feel
						we have been redirected to this page, please contact the
						administrator.
					</p>
				}
				actions={
					<EuiButton onClick={handleClick}>Return to home page</EuiButton>
				}
			/>
		</EuiPageTemplate>
	);
};

export default Forbidden;
