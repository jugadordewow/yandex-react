import {constructorReducer, initialState} from "./constructor";
import * as types from '../actions/constructor';
import {ADD_BUN_CONSTRUCTOR, ADD_INGRIDIENT_CONSTRUCTOR, MOVE_INGRIDIENT_CONSTRUCTOR} from "../actions/constructor";




describe('constructorReducer', () => {

    const ingr1 = {_id: "60d3b41abdacab0026a733c7",
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
            __v: 0,
            uid: "5c9176a3-d623-4d3d-b36e-4f78d6167444"},
          ingr2 = {
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
              __v: 0,
              uid: "d91b88fd-4836-4c02-bee4-eea0727b50e8"
          },
        ingr3 = [{
            __v: 0,
            _id: "60d3b41abdacab0026a733c9",
            calories: 420,
            carbohydrates: 33,
            fat: 244,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            name: "Мясо бессмертных моллюсков Protostomia",
            price: 133,
            proteins: 43,
            type: "main",
            uid: "49380f53-c14f-4073-b28b-13a861f2913d"
        }];

    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })
    it('should handle ADD_BUN_CONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState, {
                type: ADD_BUN_CONSTRUCTOR,
                payload: {...ingr1}
            })
        ).toEqual(
            {
                ...initialState,
                items: [],
                bun: {...ingr1}
            }
        )
    })
    it('should handle ADD_INGRIDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState, {
                type: types.ADD_INGRIDIENT_CONSTRUCTOR,
                payload: {ingr2}
            })
        ).toEqual(
            {
                ...initialState,
                items: [{ingr2}]
            }
        )
    })
    // it('should handle MOVE_INGRIDIENT_CONSTRUCTOR', () => {
    //     expect(constructorReducer(initialState, {
    //             type: types.MOVE_INGRIDIENT_CONSTRUCTOR,
    //             payload:{dragIndex:1,hoverIndex:2}
    //         })
    //     ).toEqual(
    //         {
    //             ...initialState,
    //             items: [
    //                 {name:'name3', _id:'2324fgrg3', price:'2344', image:'/some3.jpeg'},
    //                 {name:'name2', _id:'2324fgrg2', price:'2343', image:'/some2.jpeg'},
    //                 {name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg'},
    //             ]
    //         }
    //     )
    // })
    // it('should handle REMOVE_INGRIDIENT_CONSTRUCTOR', () => {
    //     expect(
    //         constructorReducer(initialState, {
    //             type: types.REMOVE_INGRIDIENT_CONSTRUCTOR,
    //             payload:{index:2}
    //         })
    //     ).toEqual(
    //         {
    //             bun: null,
    //             items: [
    //                 {name:'name3', _id:'2324fgrg3', price:'2344', image:'/some3.jpeg'},
    //                 {name:'name2', _id:'2324fgrg2', price:'2343', image:'/some2.jpeg'},
    //             ]
    //         }
    //     )
    // })
})