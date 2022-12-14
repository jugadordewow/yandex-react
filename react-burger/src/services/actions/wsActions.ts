import {createAction} from "@reduxjs/toolkit";

export const wsActions = {
    wsInit: createAction("WS_CONNECTION_START"),
    onOpen: createAction("WS_CONNECTION_SUCCESS"),
    onError: createAction('WS_CONNECTION_ERROR'),
    onClosed: createAction("WS_CONNECTION_CLOSED"),
    GetMessage: createAction<{orders: [], common: number, commonToday: number}>("WS_GET_MESSAGE"),
    SendMessage: createAction('WS_SEND_MESSAGE'),
}

export type TWsActions = typeof wsActions;

