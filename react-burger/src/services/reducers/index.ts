import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingridients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./order";
import {authReducer} from "./auth";
import {wsReducer} from "./wsReducer";
import {wsUserReducer} from "./wsUserReducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: constructorReducer,
    orders: orderReducer,
    auth: authReducer,
    wsData: wsReducer,
    wsUserData: wsUserReducer
});


