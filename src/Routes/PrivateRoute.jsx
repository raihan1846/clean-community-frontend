import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Navigate } from 'react-router';
import { TailSpin } from 'react-loader-spinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    if (loading) {
        return <TailSpin
            height="20"
            width="20"
            color="#2563eb"
            ariaLabel="loading"
        />
    }
    if (user) {
        return children;
    }

    return (
        <Navigate to="/login"></Navigate>
    );
};

export default PrivateRoute;