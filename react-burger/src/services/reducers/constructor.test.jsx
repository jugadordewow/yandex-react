import {constructorReducer} from "./constructor";
import * as types from '../actions/constructor';
import {ADD_BUN_CONSTRUCTOR, ADD_INGRIDIENT_CONSTRUCTOR, MOVE_INGRIDIENT_CONSTRUCTOR} from "../actions/constructor";


const initialState = {
    items: [],
    bun: null
}

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle ADD_BUN_CONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState, {
                type: types.ADD_BUN_CONSTRUCTOR,
                bun:{name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg', pos:'top'},
            })
        ).toEqual(
            {
                ...initialState,
                bun: {name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg', pos:'top'}
            }
        )
    })
    it('should handle ADD_INGRIDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState, {
                type: types.ADD_INGRIDIENT_CONSTRUCTOR,
                item:{name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg'},
            })
        ).toEqual(
            {
                ...initialState,
                items: [{name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg'}]
            }
        )
    })
    it('should handle MOVE_INGRIDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer([
                {name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg'},
                {name:'name2', _id:'2324fgrg2', price:'2343', image:'/some2.jpeg'},
                {name:'name3', _id:'2324fgrg3', price:'2344', image:'/some3.jpeg'}
            ], {
                type: types.MOVE_INGRIDIENT_CONSTRUCTOR,
                payload:{dragIndex:1,hoverIndex:2}
            })
        ).toEqual(
            {
                bun: null,
                items: [
                    {name:'name3', _id:'2324fgrg3', price:'2344', image:'/some3.jpeg'},
                    {name:'name2', _id:'2324fgrg2', price:'2343', image:'/some2.jpeg'},
                    {name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg'},
                ]
            }
        )
    })
    it('should handle REMOVE_INGRIDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer([
                {name:'name', _id:'2324fgrg', price:'234', image:'/some.jpeg'},
                {name:'name2', _id:'2324fgrg2', price:'2343', image:'/some2.jpeg'},
                {name:'name3', _id:'2324fgrg3', price:'2344', image:'/some3.jpeg'}
            ], {
                type: types.MOVE_INGRIDIENT_CONSTRUCTOR,
                payload:{index:2}
            })
        ).toEqual(
            {
                bun: null,
                items: [
                    {name:'name3', _id:'2324fgrg3', price:'2344', image:'/some3.jpeg'},
                    {name:'name2', _id:'2324fgrg2', price:'2343', image:'/some2.jpeg'},
                ]
            }
        )
    })
})