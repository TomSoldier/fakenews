import { baseURL, endpoints } from '../../configuration/api';
import { ArticleDto } from '../../models/DTO/ArticleDto';
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
				httpClient.post(baseURL + `${endpoints.Articles.articles}`, article);
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
};
