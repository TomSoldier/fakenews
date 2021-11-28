import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React from 'react';

interface IProps {
	articleId: number;
	content: string;
	title: string;
}

const NewsCard = (props: IProps) => {
	const cardFooterContent = (
		<EuiFlexGroup justifyContent='flexEnd'>
			<EuiFlexItem grow={false}>
				<EuiButton>Go for it</EuiButton>
			</EuiFlexItem>
		</EuiFlexGroup>
	);

	function stripHtml(html: string) {
		const tmp = document.createElement('DIV');
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || '';
	}

	const makeDescription = () => {
		const strippedContent = stripHtml(props.content);
		if (strippedContent.length < 100) {
			return strippedContent;
		} else {
			return strippedContent.substr(0, 100);
		}
	};

	return (
		<EuiCard
			textAlign='left'
			image={
				<div>
					<img src='https://source.unsplash.com/400x200/?Nature' />
				</div>
			}
			title={props.title}
			description={makeDescription()}
			footer={cardFooterContent}
		/>
	);
};

export default NewsCard;
