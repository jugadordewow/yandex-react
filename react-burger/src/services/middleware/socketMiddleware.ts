import {getCookie} from "../../utils/cookie";
import { AnyAction, MiddlewareAPI } from 'redux';
import { TWsActions} from "../actions/wsActions";
import {TWsUserActions} from "../actions/wsUserActions";

export const socketMiddleware = (wsUrl : string, Actions:TWsActions | TWsUserActions, user : boolean) => {
    return (store : MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next : (item: AnyAction) => void) => (action : AnyAction ) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, SendMessage, onOpen, onClosed, onError, GetMessage } = Actions;
            const token = user ? getCookie('token') : null;
            if (type === wsInit.type) {
                socket = token ? new WebSocket(wsUrl + '?token=' + token) : new WebSocket(wsUrl);
            }
            if (socket) {
                socket.onopen = ( event : AnyAction ) => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = ( event : AnyAction ) => {
                    dispatch({ type: onError, payload:event});
                };

                socket.onmessage = ( event : AnyAction ) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({type: GetMessage, payload: restParsedData});
                };

                socket.onclose = ( event : AnyAction ) => {
                    dispatch({type: onClosed, payload: event});
                };

                if (type === SendMessage) {
                    const message = {...payload};
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    };
};
