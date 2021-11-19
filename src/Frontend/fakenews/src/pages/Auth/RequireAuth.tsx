import React from 'react';
import { useAuth } from '../../services/auth/useAuth';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const auth = useAuth();
	const location = useLocation();

	if (!auth.isLoggedIn) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return children;
};

export default RequireAuth;
