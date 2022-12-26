import {wsUserReducer, initialState} from "./wsUserReducer";
import {wsUserActions} from "../actions/wsUserActions";


describe('wsUserReducer', () => {
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
            wsError: true
        })
    })
    it('should handle wsClosed', ()=>{
        expect(wsUserReducer(initialState, {
            type: wsUserActions.onClosed
        })).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    it('should handle wsGetMessage', ()=>{
        expect(wsUserReducer(initialState, {
            type: wsUserActions.GetMessage,
            payload: {
                orders: [{},{}],
                total: 234,
                totalToday: 12,
            }
        })).toEqual(expect.objectContaining({
            ...initialState,
            wsError: false,
            data: {
                ...initialState.data,
                orders: [{},{}],
                common: 234,
                commonToday: 12,
            }
        }))
    })
})