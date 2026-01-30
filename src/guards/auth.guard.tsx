import React, { useMemo } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface AuthGuardProps extends RouteProps {
    component: React.ComponentType<any>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return useMemo(() => {
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
                }
            />
        );
    }, [isAuthenticated, rest, Component]);
};

export default AuthGuard;