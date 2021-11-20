import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenDetails } from '../../models/TokenDetails';

export interface UserState {
	isLoggedIn: boolean;
	jwtToken?: string;
	expiration?: Date;
	tokenDetails?: TokenDetails;
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
			state.tokenDetails = payload.tokenDetails;
		},
		clearUserInfos: (state) => {
			state.isLoggedIn = false;
			state.jwtToken = undefined;
			state.expiration = undefined;
			state.tokenDetails = undefined;
		},
	},
});

export default userSlice.reducer;
