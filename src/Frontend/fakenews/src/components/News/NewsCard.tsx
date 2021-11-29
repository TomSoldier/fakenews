import {
	EuiBadge,
	EuiButton,
	EuiCard,
	EuiFlexGroup,
	EuiFlexItem,
	EuiHorizontalRule,
} from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router';
import { CategoryDto } from '../../models/DTO/CategoryDto';

interface IProps {
	articleId: number;
	content: string;
	title: string;
	categories: CategoryDto[];
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
		const categoriesOfCard = props.categories.map((x) => (
			<EuiBadge
				key={x.name}
				color={x.colorCode}
				style={{ minWidth: 75, textAlign: 'center' }}
			>
				{x.name}
			</EuiBadge>
		));

		const strippedContent = stripHtml(props.content);

		return (
			<div>
				<EuiHorizontalRule />
				{categoriesOfCard}
				<EuiHorizontalRule />
				<div>
					{strippedContent.length < 75
						? `${strippedContent}....`
						: `${strippedContent.substr(0, 57)}....`}
				</div>
			</div>
		);
	};

	return (
		<EuiCard
			key={props.articleId}
			textAlign='left'
			image={
				<div>
					<img
						key={props.articleId}
						src={`https://source.unsplash.com/400x200/?${props.categories[0]?.name}`}
					/>
				</div>
			}
			title={props.title}
			description={makeDescription()}
			footer={cardFooterContent}
		/>
	);
};

export default NewsCard;
