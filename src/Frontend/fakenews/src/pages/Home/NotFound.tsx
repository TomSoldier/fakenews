import {
	EuiButton,
	EuiEmptyPrompt,
	EuiPageTemplate,
	EuiText,
} from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
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
						<h1>Not found</h1>
					</EuiText>
				}
				body={<p>The page you were looking for could not be found..</p>}
				actions={
					<EuiButton onClick={handleClick}>Return to home page</EuiButton>
				}
			/>
		</EuiPageTemplate>
	);
};

export default NotFound;
