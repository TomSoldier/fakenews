import { baseURL, endpoints } from '../../configuration/api';
import { CategoryDto } from '../../models/DTO/CategoryDto';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';
import httpClient from '../../services/http/http';
import { categorySlice } from '../slices/categorySlice';
import { eventSlice } from '../slices/eventSlice';
import { AppDispatch } from '../store';

const { actions } = categorySlice;
const { actions: eventActions } = eventSlice;

export const categoryActions = {
	...actions,
	fetchCategories: () => {
		return async (dispatch: AppDispatch) => {
			try {
				const response = await httpClient.get<CategoryDto[]>(
					baseURL + endpoints.Categories.categories
				);
				dispatch(actions.fetchCategories(response.data));
			} catch (error) {
				eventActions.addEvent(
					createEvent(
						FakeNewsEventType.RequestFailed,
						'Categories Fetch failed'
					)
				);
			}
		};
	},
	createCategory: (categoryName: string, colorCode: string) => {
		return async (dispatch: AppDispatch) => {
			try {
				await httpClient.post(baseURL + endpoints.Categories.categories, {
					name: categoryName,
					colorCode,
				});
				dispatch(categoryActions.fetchCategories());
			} catch (error) {
				dispatch(
					eventActions.addEvent(
						createEvent(
							FakeNewsEventType.RequestFailed,
							'Categories Fetch failed'
						)
					)
				);
			}
		};
	},
	removeCategory: (id: number, name: string) => {
		return async (dispatch: AppDispatch) => {
			try {
				await httpClient.delete(
					baseURL + `${endpoints.Categories.categories}/${id}`
				);
				dispatch(actions.removeCategory(id));
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.DeleteCategorySuccess, name)
					)
				);
			} catch (error) {
				dispatch(
					eventActions.addEvent(
						createEvent(
							FakeNewsEventType.RequestFailed,
							'There was an error deleting the category.'
						)
					)
				);
			}
		};
	},
};
