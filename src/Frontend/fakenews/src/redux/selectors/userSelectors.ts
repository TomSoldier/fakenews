import { RootState } from '../store';

const isLoggedIn = (state: RootState) => state.user.isLoggedIn;
const jwtToken = (state: RootState) => state.user.jwtToken;
const userDetails = (state: RootState) => state.user.tokenDetails;
export const userSelectors = {
	isLoggedIn,
	jwtToken,
	userDetails,
};
