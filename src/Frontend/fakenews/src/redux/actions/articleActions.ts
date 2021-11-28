import { baseURL, endpoints } from '../../configuration/api';
import { ArticleDto } from '../../models/DTO/ArticleDto';
import { CommentDto } from '../../models/DTO/CommentDto';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';
import httpClient from '../../services/http/http';
import { articleSlice } from '../slices/articleSlice';
import { eventSlice } from '../slices/eventSlice';
import { AppDispatch } from '../store';

const { actions } = articleSlice;
const { actions: eventActions } = eventSlice;

export const articleActions = {
	...actions,
	uploadArticle: (article: ArticleDto) => {
		return async (dispatch: AppDispatch) => {
			try {
				httpClient.post(baseURL + `${endpoints.Articles.postArticle}`, article);
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.ArticleUploadSuccess)
					)
				);
				dispatch(actions.setBackDefault());
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Article POST failed')
					)
				);
			}
		};
	},
	fetchArticles: () => {
		return async (dispatch: AppDispatch) => {
			try {
				const response = await httpClient.post<ArticleDto[]>(
					baseURL + `${endpoints.Articles.articles}`,
					{ categoryId: null, fromDate: null, toDate: null }
				);
				dispatch(actions.storeArticles(response.data));
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Articles GET failed')
					)
				);
			}
		};
	},
	fetchArticlesInCategory: (categoryId?: string) => {
		return async (dispatch: AppDispatch) => {
			try {
				const response = await httpClient.post<ArticleDto[]>(
					baseURL + `${endpoints.Articles.articles}`,
					{ categoryId, fromDate: null, toDate: null }
				);
				dispatch(actions.storeArticlesByCategory(response.data));
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Articles GET failed')
					)
				);
			}
		};
	},
	fetchActualArticle: (articleId?: string) => {
		return async (dispatch: AppDispatch) => {
			if (!articleId) {
				return;
			}
			try {
				const response = await httpClient.get<ArticleDto>(
					baseURL + `${endpoints.Articles.getArticle}/${articleId}`
				);
				dispatch(actions.setActualArticle(response.data));
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Article GET failed')
					)
				);
			}
		};
	},
	postComment: (
		content: string,
		createdAt: Date,
		userId: string,
		articleId: number,
		byUsername: string
	) => {
		return async (dispatch: AppDispatch) => {
			try {
				await httpClient.post(baseURL + `${endpoints.Comments.comments}/`, {
					content,
					createdAt,
					userId,
					articleId,
					byUsername,
				});
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Comment POST failed')
					)
				);
			}
		};
	},
	fetchArticleComments: (id?: string) => {
		return async (dispatch: AppDispatch) => {
			if (!id) {
				return;
			}
			try {
				const reponse = await httpClient.get<CommentDto[]>(
					baseURL + `${endpoints.Comments.comments}/${id}`
				);
				dispatch(actions.setActualArticleComments(reponse.data));
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Comments GET failed')
					)
				);
			}
		};
	},
	fetchHomePageArticles: () => {
		return async (dispatch: AppDispatch) => {
			try {
				const reponse = await httpClient.get<ArticleDto[]>(
					baseURL + `${endpoints.HomePage.homepage}`
				);
				dispatch(actions.setHomePageArticles(reponse.data));
			} catch (_) {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RequestFailed, 'Articles GET failed')
					)
				);
			}
		};
	},
};
