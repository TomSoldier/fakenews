import { userSlice } from '../slices/userSlice';
import { AppDispatch } from '../store';
import { TokenDto } from '../../models/DTO/TokenDto';
import jwt_decode from 'jwt-decode';
import { TokenDetails } from '../../models/TokenDetails';
import httpClient from '../../services/http/http';

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
					tokenDetails: jwt_decode<TokenDetails>(tokenDto.token),
				})
			);
			httpClient.defaults.headers.common.Authorization = `Bearer ${tokenDto.token}`;
		};
	},
	logout: () => {
		return async (dispatch: AppDispatch) => {
			dispatch(actions.clearUserInfos());
			httpClient.defaults.headers.common.Authorization = '';
		};
	},
};
