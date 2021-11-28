import { EuiFlexGrid, EuiFlexItem } from '@elastic/eui';
import React, { useEffect } from 'react';
import NewsCard from '../../components/News/NewsCard';
import { articleActions } from '../../redux/actions/articleActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';

const Home = () => {
	const homePageArticles = useAppSelector(articleSelectors.homePageArticles);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(articleActions.fetchHomePageArticles());
	}, [dispatch]);

	return (
		<>
			<EuiFlexGrid columns={4}>
				{homePageArticles &&
					homePageArticles.map((x) => (
						<EuiFlexItem key={x.id}>
							<NewsCard
								articleId={x.id}
								title={x.title}
								content={x.content}
								category={x.categories[0]}
							/>
						</EuiFlexItem>
					))}
			</EuiFlexGrid>
		</>
	);
};

export default Home;
