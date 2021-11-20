import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FakeNewsEvent } from '../../services/events/fakeNewsEvent';

export interface EventState {
	events: FakeNewsEvent[];
}

const initialState: EventState = {
	events: [],
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		addEvent: (state, { payload }: PayloadAction<FakeNewsEvent>) => {
			state.events.push(payload);
		},
		removeEvent: (state, { payload }: PayloadAction<string>) => {
			state.events = state.events.filter((e) => e.id !== payload);
		},
	},
});

export default eventSlice.reducer;
