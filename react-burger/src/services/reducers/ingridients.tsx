import {GET_INGRIDIENTS_SUCCESS,
        GET_INGRIDIENTS_ERROR,
        GET_INGRIDIENTS_REQUEST,
        GET_INGRIDIENT_ITEM,
        RESET_INGRIDIENT_ITEM, TIngridientsActions, IIngridientsState, IIngridient } from "../actions/ingridients";

export const initialState: IIngridientsState = {
    items: [],
    itemsRequest:false,
    itemsFailed: false,
    item: null
}

export const ingredientsReducer = (state = initialState, action: TIngridientsActions):IIngridientsState => {
    switch(action.type) {
        case GET_INGRIDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case GET_INGRIDIENTS_ERROR: {
            return {
                ...state,
                itemsFailed: true,
            }
        }
        case GET_INGRIDIENT_ITEM: {
            return {
                ...state,
                item: action.payload
            }
        }
        case RESET_INGRIDIENT_ITEM: {
            return {
                ...state,
                item:null
            }
        }
        case GET_INGRIDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            }
        }
        default: {
            return state
        }
    }
}