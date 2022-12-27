import {constructorReducer, initialState} from "./constructor";
import * as types from '../actions/constructor';
import {
    ADD_BUN_CONSTRUCTOR,
    ADD_INGRIDIENT_CONSTRUCTOR,
    MOVE_INGRIDIENT_CONSTRUCTOR,
    REMOVE_INGRIDIENT_CONSTRUCTOR
} from "../actions/constructor";




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
    let state = constructorReducer(undefined, {});
    const testIngredient = (actualIngredient, expectedIngredient) => {
        for (let x in actualIngredient) {
            if (x !== "uid")
                expect(actualIngredient[x]).toEqual(expectedIngredient[x]);
        }
        expect(actualIngredient).toBeDefined();
    }

    it('should handle MOVE_INGRIDIENT_CONSTRUCTOR', () => {
        state = constructorReducer({items: [ingr2,  ingr3]}, { type: MOVE_INGRIDIENT_CONSTRUCTOR, payload: {dragIndex: 0, hoverIndex: 1 }});
        expect(state.items.length).toBe(2);
        testIngredient(state.items[0], ingr3);
        testIngredient(state.items[1], ingr2);
    })
    it('should handle REMOVE_INGRIDIENT_CONSTRUCTOR', () => {
        state = constructorReducer({items: [ingr2,  ingr3]}, { type: REMOVE_INGRIDIENT_CONSTRUCTOR, payload: 0});
        expect(state.items.length).toBe(1);
        testIngredient(state.items[0], ingr3);
    })
})