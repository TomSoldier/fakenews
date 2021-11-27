import axios from 'axios';
import { baseURL, endpoints } from '../../configuration/api';
import { CategoryDto } from '../../models/DTO/CategoryDto';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';
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
				const response = await axios.get<CategoryDto[]>(
					baseURL + endpoints.Categories.categories
				);
				dispatch(actions.fetchCategories(response.data ?? []));
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
};
