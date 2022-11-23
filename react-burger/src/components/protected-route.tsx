import {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {
    Redirect,
    Route,
    useLocation
} from 'react-router-dom';
import {getCookie} from "../utils/cookie";
import PropTypes from 'prop-types';

import {getAccessToken} from "../services/actions/auth";


export function ProtectedRoute({ children, ...rest }) {
    const dispatch = useDispatch();
    const location = useLocation();
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

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
