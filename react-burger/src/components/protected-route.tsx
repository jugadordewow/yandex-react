import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {
    Redirect,
    Route,
    useLocation,
    RouteProps
} from 'react-router-dom';
import {getCookie} from "../utils/cookie";

import {getAccessToken} from "../services/actions/auth";
import {useAppDispatch} from "../services/hook";


export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }:any) => {
    const dispatch = useAppDispatch();
    const location = useLocation<any>();
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


