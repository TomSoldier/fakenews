import {
	EuiButton,
	EuiTextArea,
	EuiFlexGroup,
	EuiFlexItem,
	EuiPageTemplate,
	EuiSpacer,
	EuiText,
	EuiHorizontalRule,
	EuiBadge,
	useGeneratedHtmlId,
	EuiContextMenuItem,
	EuiButtonIcon,
	EuiContextMenuPanel,
	EuiPopover,
} from '@elastic/eui';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import CommentList from '../../components/Comments/CommentList';
import { Role } from '../../models/Role';
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

	const [isPopoverOpen, setPopover] = useState(false);
	const splitButtonPopoverId = useGeneratedHtmlId({
		prefix: 'splitButtonPopover',
	});

	const onButtonClick = () => {
		setPopover(!isPopoverOpen);
	};

	const closePopover = () => {
		setPopover(false);
	};

	const handleDelete = () => {
		setPopover(false);
		dispatch(articleActions.deleteArticle(actualArticle.id));
		navigate('/');
	};

	const handleSetShow = () => {
		setPopover(false);
		dispatch(
			articleActions.setShow(actualArticle.id, actualArticle.shownOnHomepage)
		);
		dispatch(
			articleActions.setActualArticleShownStatus(!actualArticle.shownOnHomepage)
		);
	};

	const handleEdit = () => {
		setPopover(false);
		dispatch(articleActions.setActualToEdit());
		navigate('/admin/articles');
	};

	const items = [
		<EuiContextMenuItem
			key='Show on home'
			icon={actualArticle.shownOnHomepage ? 'eyeClosed' : 'eye'}
			onClick={handleSetShow}
		>
			{actualArticle.shownOnHomepage ? 'Remove from home' : 'Show on home'}
		</EuiContextMenuItem>,
		<EuiContextMenuItem key='edit' icon='pencil' onClick={handleEdit}>
			Edit
		</EuiContextMenuItem>,
		<EuiContextMenuItem
			key='delete'
			icon='trash'
			style={{ color: 'red' }}
			onClick={handleDelete}
		>
			Delete
		</EuiContextMenuItem>,
	];

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
		if (actualArticle.id === 0) {
			navigate('/');
		}
	}, [actualArticle.id, dispatch, navigate, params.id]);

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
				<EuiFlexGroup justifyContent='spaceBetween'>
					<EuiFlexItem>
						<div>
							{actualArticle.categories.map((x) => (
								<EuiBadge
									key={x.name}
									color={x.colorCode}
									style={{ minWidth: 75, textAlign: 'center' }}
								>
									{x.name}
								</EuiBadge>
							))}
						</div>
					</EuiFlexItem>
					<EuiFlexItem style={{ alignItems: 'end' }}>
						{moment(actualArticle.createdDate).format('YYYY-MM-DD')}
					</EuiFlexItem>
				</EuiFlexGroup>

				<EuiHorizontalRule />
				<div dangerouslySetInnerHTML={{ __html: actualArticle.content }} />
				<EuiSpacer />
				{user?.role === Role.Admin && (
					<div style={{ textAlign: 'right' }}>
						<EuiPopover
							id={splitButtonPopoverId}
							button={
								<EuiButtonIcon
									display='base'
									size='s'
									iconType='boxesVertical'
									aria-label='More'
									onClick={onButtonClick}
								/>
							}
							isOpen={isPopoverOpen}
							closePopover={closePopover}
							panelPaddingSize='none'
							anchorPosition='downLeft'
						>
							<EuiContextMenuPanel size='s' items={items} />
						</EuiPopover>
					</div>
				)}
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
