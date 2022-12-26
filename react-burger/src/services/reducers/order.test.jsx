import {orderReducer, initialState} from "./order";
import * as types from '../actions/order'
import {GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, ORDER_RESET} from "../actions/order";

describe("order number reducer", () => {
    it("should return the order number reducer inital state", () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle GET_ORDER_REQUEST", () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            orderRequest: true
        });
    })

    it("should handle GET_ORDER_ERROR", () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_ERROR
        })).toEqual({
            ...initialState,
            orderError: true
        });
    })

    it("should handle GET_ORDER_SUCCESS", () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_SUCCESS,
            data: {name: 'some', number: '123'}
        })).toEqual({
            ...initialState,
            order: {name: 'some', number: '123'},
            orders: [{order:{name: 'some', number: '123'}}],
            orderRequest: false,
        });
    })

    it("should handle ORDER_RESET", () => {
        expect(orderReducer({
            ...initialState,
        }, {
            type: ORDER_RESET,
        })).toEqual(initialState);
    })
});

