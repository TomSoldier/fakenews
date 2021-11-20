import { useCallback } from 'react';
import { eventActions } from '../../../redux/actions/eventActions';
import { useAppDispatch } from '../../../redux/hooks';
import {
	createEvent,
	FakeNewsEventType,
} from '../../../services/events/fakeNewsEvent';

export const useErrorHandling = () => {
	const dispatch = useAppDispatch();
	return useCallback(
		(errorMessage: string) => {
			dispatch(
				eventActions.addEvent(
					createEvent(
						FakeNewsEventType.RequestFailed,
						errorMessage ?? 'Something went wrong'
					)
				)
			);
		},
		[dispatch]
	);
};
