import {GET_ORDER_REQUEST,
        GET_ORDER_ERROR,
        ORDER_RESET,
        GET_ORDER_SUCCESS, TOrder, TOrdersActions} from "../actions/order";

const initialState: TOrder = {
    order: null,
    orderRequest: false,
    orderError: false
}

export const orderReducer = (state = initialState, action:TOrdersActions) => {

    switch(action.type){
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.payload
            }
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        } case GET_ORDER_ERROR: {
            return {
                ...state,
                orderError: true
            }
        } case ORDER_RESET: {
            return {
                ...state,
                order: null
            }
        }
        default: {
            return state
        }
    }
}