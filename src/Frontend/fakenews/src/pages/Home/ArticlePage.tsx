import {
	EuiButton,
	EuiTextArea,
	EuiFlexGroup,
	EuiFlexItem,
	EuiPageTemplate,
	EuiSpacer,
	EuiText,
} from '@elastic/eui';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import CommentList from '../../components/Comments/CommentList';
import { articleActions } from '../../redux/actions/articleActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';
import { userSelectors } from '../../redux/selectors/userSelectors';

const ArticlePage = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const actualArticle = useAppSelector(articleSelectors.actualArticle);
	const user = useAppSelector(userSelectors.userDetails);
	const isLoggedIn = useAppSelector(userSelectors.isLoggedIn);

	const [commentValue, setCommentValue] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentValue(e.target.value);
	};

	const handleClick = () => {
		if (user && params.id) {
			dispatch(
				articleActions.postComment(
					commentValue,
					moment().toDate(),
					user.userid,
					parseInt(params.id),
					user.name
				)
			);
			setCommentValue('');
			dispatch(
				articleActions.addArticleComment({
					id: 0,
					content: commentValue,
					createdAt: moment().toDate(),
					userId: user.userid,
					articleId: parseInt(params.id),
					byUsername: user.name,
				})
			);
		}
	};

	useEffect(() => {
		dispatch(articleActions.fetchActualArticle(params.id));
	}, [dispatch, params.id]);

	if (actualArticle) {
		return (
			<EuiPageTemplate
				template='empty'
				pageContentProps={{ paddingSize: 'none' }}
				pageHeader={{
					pageTitle: actualArticle.title,
					style: { textAlign: 'center' },
				}}
			>
				<div dangerouslySetInnerHTML={{ __html: actualArticle.content }} />
				<EuiSpacer size='xxl' />
				{isLoggedIn && (
					<div>
						<EuiText>
							<h2>Comments</h2>{' '}
							<EuiButton
								iconType='editorComment'
								disabled={!commentValue}
								onClick={handleClick}
							>
								Send comment
							</EuiButton>
							<EuiSpacer />
						</EuiText>
					</div>
				)}

				{isLoggedIn && (
					<EuiFlexGroup>
						<EuiFlexItem>
							<EuiTextArea
								fullWidth
								resize='none'
								placeholder='Write comment...'
								aria-label='Use aria labels when no actual label is in use'
								value={commentValue}
								onChange={(e) => onChange(e)}
							/>
						</EuiFlexItem>
					</EuiFlexGroup>
				)}
				<EuiSpacer size='xxl' />
				{params.id && <CommentList key={params.id} id={params.id} />}
			</EuiPageTemplate>
		);
	} else {
		navigate('/notfound');
		return null;
	}
};

export default ArticlePage;
