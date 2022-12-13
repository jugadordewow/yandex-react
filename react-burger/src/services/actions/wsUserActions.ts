import {createAction} from "@reduxjs/toolkit";

export const wsUserActions = {
    wsInit: createAction("WS_USER_CONNECTION_START"),
    onOpen: createAction("WS_USER_CONNECTION_SUCCESS"),
    onError: createAction<{error: object}>('WS_USER_CONNECTION_ERROR'),
    onClosed: createAction("WS_USER_CONNECTION_CLOSED"),
    GetMessage: createAction<{orders: [], common: number, commonToday: number}>("WS_USER_GET_MESSAGE"),
    SendMessage: createAction('WS_USER_SEND_MESSAGE'),
}

export type TWsUserActions = {
    wsInit: object,
    onOpen: object,
    onError: object,
    onClosed: object,
    GetMessage: object,
    SendMessage: object,
}