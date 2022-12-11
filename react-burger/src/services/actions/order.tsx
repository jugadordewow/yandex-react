import {GET_INGRIDIENTS_SUCCESS, IIngridients} from "./ingridients";

export const GET_ORDER_REQUEST:'GET_ORDER_REQUEST' = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS:'GET_ORDER_SUCCESS' = "GET_ORDER_SUCCESS"
export const GET_ORDER_ERROR:'GET_ORDER_ERROR' = "GET_ORDER_ERROR"
export const ORDER_RESET:'GET_ORDER_RESET' = "GET_ORDER_RESET"

export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    name: string;
    status: string;
    number: string;
    createdAt: string;
    updatedAt: string;
    price:number;
};

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    payload: TOrder | null
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

const getOrder = (orderItem: TOrder) => ({
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

export const loadOrder = (order) => (dispatch, _, burgerConstructor) => {
    dispatch(setLoading())
    burgerConstructor.getOrderData(order)
        .then(res => dispatch(getOrder(res)))
        .catch(err => dispatch(setError(err)))
}