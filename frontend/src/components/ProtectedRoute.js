import { Navigate } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute({ children, loggedIn }) {
	if (loggedIn) {
		return (
		<>
			{children}
		</>
		);
	}
	return <Navigate to="/sign-in" />;
}
