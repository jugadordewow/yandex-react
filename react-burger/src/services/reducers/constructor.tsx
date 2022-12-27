import {ADD_INGRIDIENT_CONSTRUCTOR,
        ADD_BUN_CONSTRUCTOR,
        REMOVE_INGRIDIENT_CONSTRUCTOR,
        MOVE_INGRIDIENT_CONSTRUCTOR,
        RESET_CONSTRUCTOR,
        IItem, IConstructor, TConstructorActions} from "../actions/constructor";

export const initialState: IConstructor = {
        items: [],
        bun: null
}

export const constructorReducer = (state = initialState, action:TConstructorActions) => {
        switch(action.type){
                case ADD_BUN_CONSTRUCTOR: {
                        return {
                                ...state,
                                bun: action.payload
                        }
                } case ADD_INGRIDIENT_CONSTRUCTOR: {
                        return {
                                ...state,
                                items: [...state.items, action.payload]
                        }
                } case MOVE_INGRIDIENT_CONSTRUCTOR: {
                        const firstIndex = action.payload.dragIndex;
                        const secondIndex = action.payload.hoverIndex;
                        state.items.splice(secondIndex, 0, state.items.splice(firstIndex, 1)[0]);
                        return {
                                ...state
                        };
                } case REMOVE_INGRIDIENT_CONSTRUCTOR: {
                        const index = action.payload;
                        return {
                                ...state,
                                items: [...state.items.slice(0,index), ...state.items.slice(index + 1)]
                        }
                }
                default: {
                        return initialState
                }
        }
}