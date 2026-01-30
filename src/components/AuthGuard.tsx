import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface AuthGuardProps {
    component: React.FC;
    path: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component, path }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <Route
            path={path}
            render={() =>
                isAuthenticated ? <Component /> : <Redirect to="/login" />
            }
        />
    );
};

export default AuthGuard;
