import { RootState } from '../store';

const isLoggedIn = (state: RootState) => state.user.isLoggedIn;
const jwtToken = (state: RootState) => state.user.jwtToken;
export const userSelectors = {
	isLoggedIn,
	jwtToken,
};
