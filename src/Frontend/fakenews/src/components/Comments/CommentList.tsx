import { EuiAvatar, EuiText } from '@elastic/eui';
import React, { useEffect } from 'react';
import { EuiCommentList } from '@elastic/eui';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';
import { articleActions } from '../../redux/actions/articleActions';
import moment from 'moment';

interface ICommentListProps {
	id: string;
}

const CommentList = (props: ICommentListProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(articleActions.clearComments());
		dispatch(articleActions.fetchArticleComments(props.id));
	}, [dispatch, props.id]);

	const actualComments = useAppSelector(articleSelectors.actualComments);

	const comments = actualComments.map((x) => ({
		event: 'added a comment',
		username: x.byUsername,
		timestamp: moment(x.createdAt).format('YYYY-MM-DD HH:mm:ss'),
		timelineIcon: <EuiAvatar size='l' name={x.byUsername} iconType='user' />,
		children: (
			<EuiText size='s'>
				<p>{x.content}</p>
			</EuiText>
		),
	}));

	return <EuiCommentList comments={comments} />;
};

export default CommentList;
