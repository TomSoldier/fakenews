import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	isLoggedIn: boolean;
	jwtToken?: string;
	expiration?: Date;
}

const initialState: UserState = {
	isLoggedIn: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<UserState>) => {
			state.isLoggedIn = payload.isLoggedIn;
			state.jwtToken = payload.jwtToken;
			state.expiration = payload.expiration;
		},
		clearUserInfos: (state) => {
			state.isLoggedIn = false;
			state.jwtToken = undefined;
			state.expiration = undefined;
		},
	},
});

export default userSlice.reducer;
