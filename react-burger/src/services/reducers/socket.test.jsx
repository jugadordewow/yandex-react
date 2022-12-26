import {wsReducer, initialState} from "./wsReducer";
import {wsActions} from "../actions/wsActions";


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
            type: wsActions.GetMessage,
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