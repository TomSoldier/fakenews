import {
	EuiEmptyPrompt,
	EuiFlexGrid,
	EuiFlexItem,
	EuiPageTemplate,
} from '@elastic/eui';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewsCard from '../../components/News/NewsCard';
import { articleActions } from '../../redux/actions/articleActions';
import { categoryActions } from '../../redux/actions/categoryActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';
import { categorySelectors } from '../../redux/selectors/categorySelectors';

const NewsByCategoryPage = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const category = useAppSelector(categorySelectors.actualCategory);
	const navigate = useNavigate();

	const articlesByCategoryId = useAppSelector(
		articleSelectors.articlesByCategoryId
	);

	useEffect(() => {
		dispatch(categoryActions.getActualCategory(params.id));
		dispatch(articleActions.fetchArticlesInCategory(params.id));
	}, [dispatch, params.id]);

	if (!category) {
		navigate('/notfound');
	}

	const empty = (
		<EuiEmptyPrompt
			title={
				<span>
					There are currently no news in this category. Check back later.
				</span>
			}
		/>
	);

	return (
		<EuiPageTemplate
			template='empty'
			pageContentProps={{ paddingSize: 'none' }}
			pageHeader={{
				pageTitle: category?.name,
				style: { textAlign: 'center' },
			}}
		>
			{(!articlesByCategoryId || articlesByCategoryId.length === 0) && empty}
			<EuiFlexGrid columns={2}>
				{articlesByCategoryId &&
					articlesByCategoryId.map((x) => (
						<EuiFlexItem key={x.id}>
							<NewsCard
								articleId={x.id}
								title={x.title}
								content={x.content}
								categories={x.categories}
							/>
						</EuiFlexItem>
					))}
			</EuiFlexGrid>
		</EuiPageTemplate>
	);
};

export default NewsByCategoryPage;
