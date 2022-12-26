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
            payload: {
                name: 'Space флюоресцентный бургер',
                order: {
                    ingredients: [
                        {
                            _id: "60d3b41abdacab0026a733c7",
                            name: "Флюоресцентная булка R2-D3",
                            type: "bun",
                            proteins: 44,
                            fat: 26,
                            carbohydrates: 85,
                            calories: 643,
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            __v: 0
                        },
                        {
                            _id: "60d3b41abdacab0026a733cd",
                            name: "Соус фирменный Space Sauce",
                            type: "sauce",
                            proteins: 50,
                            fat: 22,
                            carbohydrates: 11,
                            calories: 14,
                            price: 80,
                            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                            __v: 0
                        },
                        {
                            _id: "60d3b41abdacab0026a733c7",
                            name: "Флюоресцентная булка R2-D3",
                            type: "bun",
                            proteins: 44,
                            fat: 26,
                            carbohydrates: 85,
                            calories: 643,
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            __v: 0
                        }
                    ],
                    _id: "63a9d1cb99a25c001cd6debf",
                    owner: {
                        name: "TESTER",
                        email: "malich.dest@citilink.ru",
                        createdAt: "2022-12-16T15:54:24.285Z",
                        updatedAt: "2022-12-16T19:29:09.392Z"
                    },
                    status: "done",
                    name: "Space флюоресцентный бургер",
                    createdAt: "2022-12-26T16:54:35.256Z",
                    updatedAt: "2022-12-26T16:54:35.693Z",
                    number: 35795,
                    price: 2056
                },
                success: true
            }

        })).toEqual({
            ...initialState,
            order: {
                name: 'Space флюоресцентный бургер',
                order: {
                    ingredients: [
                        {
                            _id: "60d3b41abdacab0026a733c7",
                            name: "Флюоресцентная булка R2-D3",
                            type: "bun",
                            proteins: 44,
                            fat: 26,
                            carbohydrates: 85,
                            calories: 643,
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            __v: 0
                        },
                        {
                            _id: "60d3b41abdacab0026a733cd",
                            name: "Соус фирменный Space Sauce",
                            type: "sauce",
                            proteins: 50,
                            fat: 22,
                            carbohydrates: 11,
                            calories: 14,
                            price: 80,
                            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                            __v: 0
                        },
                        {
                            _id: "60d3b41abdacab0026a733c7",
                            name: "Флюоресцентная булка R2-D3",
                            type: "bun",
                            proteins: 44,
                            fat: 26,
                            carbohydrates: 85,
                            calories: 643,
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            __v: 0
                        }
                    ],
                    _id: "63a9d1cb99a25c001cd6debf",
                    owner: {
                        name: "TESTER",
                        email: "malich.dest@citilink.ru",
                        createdAt: "2022-12-16T15:54:24.285Z",
                        updatedAt: "2022-12-16T19:29:09.392Z"
                    },
                    status: "done",
                    name: "Space флюоресцентный бургер",
                    createdAt: "2022-12-26T16:54:35.256Z",
                    updatedAt: "2022-12-26T16:54:35.693Z",
                    number: 35795,
                    price: 2056
                },
                success: true
            },
            orders: [{
                name: 'Space флюоресцентный бургер',
                order: {
                    ingredients: [
                        {
                            _id: "60d3b41abdacab0026a733c7",
                            name: "Флюоресцентная булка R2-D3",
                            type: "bun",
                            proteins: 44,
                            fat: 26,
                            carbohydrates: 85,
                            calories: 643,
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            __v: 0
                        },
                        {
                            _id: "60d3b41abdacab0026a733cd",
                            name: "Соус фирменный Space Sauce",
                            type: "sauce",
                            proteins: 50,
                            fat: 22,
                            carbohydrates: 11,
                            calories: 14,
                            price: 80,
                            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                            __v: 0
                        },
                        {
                            _id: "60d3b41abdacab0026a733c7",
                            name: "Флюоресцентная булка R2-D3",
                            type: "bun",
                            proteins: 44,
                            fat: 26,
                            carbohydrates: 85,
                            calories: 643,
                            price: 988,
                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            __v: 0
                        }
                    ],
                    _id: "63a9d1cb99a25c001cd6debf",
                    owner: {
                        name: "TESTER",
                        email: "malich.dest@citilink.ru",
                        createdAt: "2022-12-16T15:54:24.285Z",
                        updatedAt: "2022-12-16T19:29:09.392Z"
                    },
                    status: "done",
                    name: "Space флюоресцентный бургер",
                    createdAt: "2022-12-26T16:54:35.256Z",
                    updatedAt: "2022-12-26T16:54:35.693Z",
                    number: 35795,
                    price: 2056
                },
                success: true
            }],
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

