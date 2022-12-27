import {wsActions, TWsActions} from "../actions/wsActions";
import {createReducer} from "@reduxjs/toolkit";
import {TwsState} from "../types";


export const initialState: TwsState = {
    wsConnected: false,
    wsError: false,
    data: {
        orders: [],
        common: 0,
        commonToday: 0
    }
}

export const wsReducer = createReducer(initialState, builder => {
    builder
    .addCase(wsActions.wsInit, state =>{
        state.wsConnected = true;
    })
    .addCase(wsActions.onError, state =>{
        state.wsError = false;
    })
    .addCase(wsActions.onClosed, state => {
        state.wsConnected = false;
    })
    .addCase(wsActions.GetMessage, (state, action) => {
        state.data.orders = action.payload.orders;
        state.data.common = action.payload.total;
        state.data.commonToday = action.payload.totalToday;
    })

} )