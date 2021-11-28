import { EuiEmptyPrompt, EuiPageTemplate } from '@elastic/eui';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleActions } from '../../redux/actions/articleActions';
import { categoryActions } from '../../redux/actions/categoryActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';

const NewsByCategoryPage = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const category = useAppSelector(categorySelectors.actualCategory);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(categoryActions.getActualCategory(params.id));
		dispatch(articleActions.fetchArticlesInCategory(params.id));
	}, [dispatch, params.id]);

	if (!category) {
		navigate('/notfound');
	}

	return (
		<EuiPageTemplate
			template='empty'
			pageContentProps={{ paddingSize: 'none' }}
			pageHeader={{
				pageTitle: category?.name,
				style: { textAlign: 'center' },
			}}
		>
			<EuiEmptyPrompt
				title={
					<span>
						There are currently no news in this category. Check back later.
					</span>
				}
			/>
		</EuiPageTemplate>
	);
};

export default NewsByCategoryPage;
