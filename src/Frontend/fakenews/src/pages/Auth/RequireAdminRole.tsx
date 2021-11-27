import React from 'react';
import { useAuth } from '../../services/auth/useAuth';
import { useLocation, Navigate } from 'react-router-dom';
import { Role } from '../../models/Role';

const RequireAdminRole = ({ children }: { children: JSX.Element }) => {
	const auth = useAuth();
	const location = useLocation();

	if (auth.details?.role !== Role.Admin) {
		return <Navigate to='/forbidden' state={{ from: location }} />;
	}

	return children;
};

export default RequireAdminRole;
