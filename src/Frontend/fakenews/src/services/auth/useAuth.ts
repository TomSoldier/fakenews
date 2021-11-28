import { useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userSelectors } from '../../redux/selectors/userSelectors';

export const useAuth = () => {
	const isLoggedIn = useAppSelector(userSelectors.isLoggedIn);
	const details = useAppSelector(userSelectors.userDetails);
	return useMemo(() => ({ isLoggedIn, details }), [isLoggedIn, details]);
};
