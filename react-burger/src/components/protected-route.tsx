import React, {useEffect} from "react";
import {
    Redirect,
    Route,
    useLocation,
    RouteProps
} from 'react-router-dom';
import {getCookie} from "../utils/cookie";

import {getAccessToken} from "../services/actions/auth";
import {useAppDispatch} from "../services/hook";
import {ILocation} from "../services/types";


export const ProtectedRoute = ({ children, ...rest }:RouteProps & {children?: React.ReactNode}) => {
    const dispatch = useAppDispatch();
    const location = useLocation<ILocation>();
    const refreshToken = localStorage.refreshToken;
    const isAuthorized = getCookie('token')


    useEffect(() => {
        if (refreshToken) {
            dispatch(getAccessToken());
        }
    }, [dispatch, refreshToken]);

    return (
        <Route
            {...rest}
            render={() =>
                isAuthorized ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};


