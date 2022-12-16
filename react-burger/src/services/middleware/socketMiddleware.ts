import {getCookie} from "../../utils/cookie";
import {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import { TWsActions} from "../actions/wsActions";
import {TWsUserActions} from "../actions/wsUserActions";

export const socketMiddleware = (wsUrl : string, Actions:TWsActions | TWsUserActions, user : boolean):Middleware => {
    return (store : MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next : (item: AnyAction) => void) => (action : AnyAction ) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, SendMessage, onOpen, onClosed, onError, GetMessage } = Actions;
            console.log(getCookie('token'))
            let token;
            console.log('This is USER ' + user)
            if(user) {
                token = getCookie('token')
            }
            //const token = user ? getCookie('token') : null;
            console.log('This token ' + token)

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
                    console.log(parsedData)
                    dispatch({type: GetMessage, payload: parsedData});
                };

                socket.onclose = ( event : AnyAction ) => {
                    dispatch({type: onClosed, payload: event});
                };

                if (type === SendMessage.type) {
                    const message = {...payload};
                    console.log(message)
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    };
};
