import {orderReducer} from "./order";
import * as types from '../actions/order'

const initialState = {
    orders:[],
    order: null,
    orderRequest: false,
    orderError: false
}

describe('orderReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined,{})).toEqual(
            initialState
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(orderReducer(initialState,{
            type: types.GET_ORDER_REQUEST
        })).toEqual(
            {
                orderRequest:true
            }
        )
    })
    it('should handle GET_ORDER_ERROR', () => {
        expect(orderReducer(initialState,{
            type: types.GET_ORDER_ERROR
        })).toEqual(
            {
                orderError: true
            }
        )
    })
    it('should handle ORDER_RESET', () => {
        expect(orderReducer(initialState,{
            type:types.ORDER_RESET
        })).toEqual(
            {
                order: null
            }
        )
    })
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(orderReducer(initialState,{
            type: types.GET_ORDER_SUCCESS,
            order:[{name:'Name', number:'45456'}]
        })).toEqual(
            {
                order:[{name:'Name', number:'45456'}],
                orders: [{}, {}]
            }
        )
    })

})
