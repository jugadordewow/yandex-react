import {ingredientsReducer, initialState} from "./ingridients";
import * as types from '../actions/ingridients'
import {
    GET_INGRIDIENT_ITEM,
    GET_INGRIDIENTS_ERROR,
    GET_INGRIDIENTS_REQUEST,
    GET_INGRIDIENTS_SUCCESS
} from "../actions/ingridients";

describe("burger ingredients reducer", () => {
    it("should return the burger ingredients reducer inital state", () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    })


    it("should handle GET_INGRIDIENTS_REQUEST", () => {
        expect(ingredientsReducer(initialState,{
            type: GET_INGRIDIENTS_REQUEST
        })).toEqual(expect.objectContaining({
            itemsRequest: true
        }));
    })

    it("should handle GET_INGRIDIENTS_ERROR", () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGRIDIENTS_ERROR
        })).toEqual({
            ...initialState,
            items: [],
            itemsFailed: true
        });
    })

    it("should handle GET_INGRIDIENTS_SUCCESS", () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGRIDIENTS_SUCCESS,
            payload: [{
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0,
            },
                {
                    _id: '60d3b41abdacab0026a733c7',
                    name: 'Флюоресцентная булка R2-D3',
                    type: 'bun',
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 643,
                    price: 988,
                    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                    image_mobile:
                        'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    image_large:
                        'https://code.s3.yandex.net/react/code/bun-01-large.png',
                    __v: 0,
                }]
        })).toEqual(expect.objectContaining({
            ...initialState,
            items: [{
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0,
            },
                {
                    _id: '60d3b41abdacab0026a733c7',
                    name: 'Флюоресцентная булка R2-D3',
                    type: 'bun',
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 643,
                    price: 988,
                    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                    image_mobile:
                        'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    image_large:
                        'https://code.s3.yandex.net/react/code/bun-01-large.png',
                    __v: 0,
                }],
            itemsFailed: false,
            itemsRequest:false,
            item:null,
        }));
    })
    it("should handle GET_INGRIDIENT_ITEM", () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGRIDIENT_ITEM,
            payload: {
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0,
            }
        })).toEqual(expect.objectContaining({
            ...initialState,
            item: {
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0,
            },
            itemsFailed: false,
            itemsRequest:false,
        }));
    })

});
