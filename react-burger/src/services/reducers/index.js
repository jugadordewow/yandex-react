import {combineReducers} from "redux";
import {ingridientsReducer} from "./ingridients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./order";
import {authReducer} from "./auth";

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    burger: constructorReducer,
    orders: orderReducer,
    auth: authReducer,
});


