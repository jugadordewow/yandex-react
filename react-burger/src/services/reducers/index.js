import {combineReducers} from "redux";
import {ingridientsReducer} from "./ingridients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    burger: constructorReducer,
    orders: orderReducer
});


