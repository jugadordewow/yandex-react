import {createAction} from "@reduxjs/toolkit";
import {wsActions} from "./wsActions";

export const wsUserActions = {
    wsInit: createAction("WS_USER_CONNECTION_START"),
    onOpen: createAction("WS_USER_CONNECTION_SUCCESS"),
    onError: createAction('WS_USER_CONNECTION_ERROR'),
    onClosed: createAction("WS_USER_CONNECTION_CLOSED"),
    GetMessage: createAction<{orders: [], common: number, commonToday: number}>("WS_USER_GET_MESSAGE"),
    SendMessage: createAction('WS_USER_SEND_MESSAGE'),
}

export type TWsUserActions = typeof wsUserActions;