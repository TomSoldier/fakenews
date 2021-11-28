import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router';
import { CategoryDto } from '../../models/DTO/CategoryDto';

interface IProps {
	articleId: number;
	content: string;
	title: string;
	category: CategoryDto;
}

const NewsCard = (props: IProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/articles/${props.articleId}`);
	};

	const cardFooterContent = (
		<EuiFlexGroup justifyContent='flexEnd'>
			<EuiFlexItem grow={false}>
				<EuiButton onClick={handleClick}>Read more...</EuiButton>
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
			key={props.articleId}
			textAlign='left'
			image={
				<div>
					<img
						key={props.articleId}
						src={`https://source.unsplash.com/400x200/?${props.category.name}`}
					/>
				</div>
			}
			title={props.title}
			description={`${makeDescription()}.....`}
			footer={cardFooterContent}
		/>
	);
};

export default NewsCard;
