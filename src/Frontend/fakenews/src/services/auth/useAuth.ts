import { useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userSelectors } from '../../redux/selectors/userSelectors';

export const useAuth = () => {
	const isLoggedIn = useAppSelector(userSelectors.isLoggedIn);
	return useMemo(() => ({ isLoggedIn }), [isLoggedIn]);
};
