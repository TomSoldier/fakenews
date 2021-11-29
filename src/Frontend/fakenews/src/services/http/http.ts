import axios from 'axios';
import { userActions } from '../../redux/actions/userActions';
import { store } from '../../redux/store';
const httpClient = axios.create();

httpClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			store.dispatch(userActions.logout());
		}
		return error;
	}
);

export default httpClient;
