import {wsActions, TWsActions} from "../actions/wsActions";
import {createReducer} from "@reduxjs/toolkit";


const initialState = {
    wsConnected: false,
    wsError: {},
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
    .addCase(wsActions.onError, (state, action) =>{
        state.wsError = action.payload;
    })
    .addCase(wsActions.onClosed, state => {
        state.wsConnected = false;
    })
    .addCase(wsActions.GetMessage, (state, action) => {
        state.data.orders = action.payload.orders;
        state.data.common = action.payload.common;
        state.data.commonToday = action.payload.commonToday;
    })

} )