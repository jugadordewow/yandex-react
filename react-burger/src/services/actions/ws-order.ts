import {createAction} from "@reduxjs/toolkit";

export const wsOrderActions = {
    wsOrderConnectionStart: createAction("WS_ORDER_CONNECTION_START"),
    wsOrderConnectionSuccess: createAction<object>("WS_ORDER_CONNECTION_SUCCESS"),
    wsOrderConnectionError: createAction<{error: object}>('WS_ORDER_CONNECTION_ERROR'),
    wsOrderConnectionClosed: createAction("WS_ORDER_CONNECTION_CLOSED"),
    wsOrderGetMessage: createAction("WS_ORDER_GET_MESSAGE"),
    wsOrderSendMessage: createAction('WS_ORDER_SEND_MESSAGE'),
}

class ActionType<T> {
}

export type TWsOrdersActions =  ActionType<typeof wsOrderActions>