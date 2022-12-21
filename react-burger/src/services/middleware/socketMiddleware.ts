import {getCookie} from "../../utils/cookie";
import {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import { TWsActions} from "../actions/wsActions";
import {TWsUserActions} from "../actions/wsUserActions";
import {AppDispatch, RootState} from "../types";

export const socketMiddleware = (wsUrl : string, Actions:TWsActions | TWsUserActions, user : boolean):Middleware => {
    return (store : MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, SendMessage, onOpen, onClosed, onError, GetMessage } = Actions;
            let token;
            if(user) {
                token = getCookie('token')
            }
            if (type === wsInit.type) {
                socket = token ? new WebSocket(wsUrl + '?token=' + token) : new WebSocket(wsUrl);
            }
            if (socket) {
                socket.onopen = ( event : Event ) => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = ( event : Event ) => {
                    dispatch({ type: onError, payload:event});
                };

                socket.onmessage = ( event : MessageEvent ) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({type: GetMessage, payload: parsedData});
                };

                socket.onclose = ( event : CloseEvent ) => {
                    dispatch({type: onClosed, payload: event});
                };

                if (type === SendMessage.type) {
                    const message = {...payload};
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    };
};
