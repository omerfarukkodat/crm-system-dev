// components/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PrivateRoute = ({ element, ...rest }) => {
    const location = useLocation();

    return isAuthenticated() ? element : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
