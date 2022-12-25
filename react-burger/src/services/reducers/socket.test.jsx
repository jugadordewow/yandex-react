import {wsReducer} from "./wsReducer";
import {wsActions} from "../actions/wsActions";

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
        expect(wsReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle wsConnected', ()=>{
        expect(wsReducer(initialState, {
            type: wsActions.wsInit
        })).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    it('should handle wsError', ()=>{
        expect(wsReducer(initialState, {
            type: wsActions.onError
        })).toEqual({
            ...initialState,
            wsError: false
        })
    })
    it('should handle wsClosed', ()=>{
        expect(wsReducer(initialState, {
            type: wsActions.onClosed
        })).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('should handle wsGetMessage', ()=>{
        expect(wsReducer(initialState, {
            type: wsActions.GetMessage
        })).toEqual({
            ...initialState,
            orders: [],
            common: 234,
            commonToday: 12
        })
    })
})