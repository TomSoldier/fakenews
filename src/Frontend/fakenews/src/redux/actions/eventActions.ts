import { eventSlice } from '../slices/eventSlice';
import { AppDispatch } from '../store';

const { actions } = eventSlice;

export const eventActions = {
	...actions,
	removeEvent: (id: string) => {
		return async (dispatch: AppDispatch) => {
			dispatch(actions.removeEvent(id));
		};
	},
};
