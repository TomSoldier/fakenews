import { userSlice } from '../slices/userSlice';
import axios from 'axios';
import { AppDispatch } from '../store';

const { actions } = userSlice;

export const userActions = {
	...actions,
	loginUser: (tokenDto: TokenDto) => {
		return async (dispatch: AppDispatch) => {
			dispatch(
				actions.login({
					jwtToken: tokenDto.token,
					expiration: tokenDto.expiration,
					isLoggedIn: true,
				})
			);
			axios.defaults.headers.common.Authorization = `Bearer ${tokenDto.token}`;
		};
	},
	logout: () => {
		return async (dispatch: AppDispatch) => {
			dispatch(actions.clearUserInfos());
			axios.defaults.headers.common.Authorization = '';
		};
	},
};
