import {wsUserReducer} from "./wsUserReducer";
import {wsUserActions} from "../actions/wsUserActions";

const initialState = {
    wsConnected: false,
    wsError: false,
    data: {
        orders: [],
        common: 0,
        commonToday: 0
    }
}


describe('wsReducer', () => {
    it('should return the initial state', ()=>{
        expect(wsUserReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle wsConnected', ()=>{
        expect(wsUserReducer(initialState, {
            type: wsUserActions.wsInit
        })).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    it('should handle wsError', ()=>{
        expect(wsUserReducer(initialState, {
            type: wsUserActions.onError
        })).toEqual({
            ...initialState,
            wsError: false
        })
    })
    it('should handle wsConnected', ()=>{
        expect(wsUserReducer(initialState, {
            type: wsUserActions.onClosed
        })).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('should handle GetMessage', ()=>{
        expect(wsUserReducer(initialState, {
            type: wsUserActions.GetMessage
        })).toEqual({
            ...initialState,
            orders: [],
            common: 234,
            commonToday: 12
        })
    })
})