import {createAction} from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit';

export const wsActions = {
    wsInit: createAction("WS_CONNECTION_START"),
    onOpen: createAction("WS_CONNECTION_SUCCESS"),
    onError: createAction('WS_CONNECTION_ERROR'),
    onClosed: createAction("WS_CONNECTION_CLOSED"),
    GetMessage: createAction<{orders: [], total: number, totalToday: number}>("WS_GET_MESSAGE"),
    SendMessage: createAction<PayloadAction>('WS_SEND_MESSAGE'),
}

export type TWsActions = typeof wsActions;

