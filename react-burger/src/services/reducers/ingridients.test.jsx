import {ingredientsReducer} from "./ingridients";
import * as types from '../actions/ingridients'

const initialState = {
    items: [],
    itemsRequest:false,
    itemsFailed: false,
    item: null
}

describe('ingredientsReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined,{})).toEqual(
            initialState
        )
    })
    it('should handle GET_INGRIDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(initialState,{
            type: types.GET_INGRIDIENTS_SUCCESS
        })).toEqual(
            {
                ...initialState,
                items: [{},{}]
            }
        )
    })
    it('should handle GET_INGRIDIENTS_ERROR', () => {
        expect(ingredientsReducer(initialState,{
            type: types.GET_INGRIDIENTS_ERROR
        })).toEqual(
            {
                ...initialState,
                itemsFailed: true,
            }
        )
    })
    it('should handle GET_INGRIDIENT_ITEM', () => {
        expect(ingredientsReducer(initialState,{
            type: types.GET_INGRIDIENT_ITEM
        })).toEqual(
            {
                item: {}
            }
        )
    })
    it('should handle RESET_INGRIDIENT_ITEM', () => {
        expect(ingredientsReducer(initialState,{
            type: types.RESET_INGRIDIENT_ITEM
        })).toEqual(
            {
                item: null
            }
        )
    })

    it('should handle GET_INGRIDIENTS_REQUEST', () => {
        expect(ingredientsReducer(initialState,{
            type: types.GET_INGRIDIENTS_REQUEST
        })).toEqual(
            {
                itemsRequest: true
            }
        )
    })

})