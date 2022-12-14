import {wsUserActions} from "../actions/wsUserActions";
import {createReducer} from "@reduxjs/toolkit";


const initialState = {
    wsConnected: false,
    wsError: false,
    data: {
        orders: [],
        common: 0,
        commonToday: 0,
    }
}

export const wsUserReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsUserActions.wsInit, state => {
            state.wsConnected = true;
        })
        .addCase(wsUserActions.onError, state => {
            state.wsError = true;
        })
        .addCase(wsUserActions.onClosed, state => {
            state.wsConnected = false;
        })
        .addCase(wsUserActions.GetMessage, (state, action) => {
            state.data.orders = action.payload.orders;
            state.data.common = action.payload.common;
            state.data.commonToday = action.payload.commonToday;
        })
})