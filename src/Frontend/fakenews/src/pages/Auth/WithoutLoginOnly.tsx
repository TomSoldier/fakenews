import React from 'react';
import { useAuth } from '../../services/auth/useAuth';
import { Navigate } from 'react-router-dom';

const WithoutLoginOnly = ({ children }: { children: JSX.Element }) => {
	const auth = useAuth();

	if (auth.isLoggedIn) {
		return <Navigate to='/' />;
	}

	return children;
};

export default WithoutLoginOnly;
