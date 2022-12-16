import {AppDispatch, AppThunk} from "../types";

export const GET_ORDER_REQUEST:'GET_ORDER_REQUEST' = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS:'GET_ORDER_SUCCESS' = "GET_ORDER_SUCCESS"
export const GET_ORDER_ERROR:'GET_ORDER_ERROR' = "GET_ORDER_ERROR"
export const ORDER_RESET:'GET_ORDER_RESET' = "GET_ORDER_RESET"

export type TOrderItem = {
    name:string,
    number:number
}


export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    payload: TOrderItem
}

export interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderReset {
    readonly type: typeof ORDER_RESET;
}

export interface IGetOrderError {
    readonly type: typeof GET_ORDER_ERROR;
    payload: object | null
}

export type TOrdersActions =
    | IGetOrderRequest
    | IGetOrderSuccess
    | IGetOrderReset
    | IGetOrderError;

const getOrder = (orderItem: TOrderItem) => ({
    type: GET_ORDER_SUCCESS,
    payload: orderItem,
})

const setLoading = () => ({
    type: GET_ORDER_REQUEST,
})

const setError = (err: object) => ({
    type: GET_ORDER_ERROR,
    payload: err
})

export const loadOrder: AppThunk = (order) => (dispatch:AppDispatch, _: any, burgerConstructor:any) => {
    dispatch(setLoading())
    burgerConstructor.getOrderData(order)
        .then((res: TOrderItem) => dispatch(getOrder(res)))
        .catch((err: object) => dispatch(setError(err)))
}