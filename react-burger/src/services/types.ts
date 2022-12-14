import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TIngridientsActions} from "./actions/ingridients";
import { TConstructorActions } from "./actions/constructor";
import {TAuthActions} from "./actions/auth";
import {TOrdersActions} from "./actions/order";
import {TWsActions} from "./actions/wsActions";
import {TWsUserActions} from "./actions/wsUserActions";
import {rootReducer} from "./reducers";



export type RootState = ReturnType<typeof rootReducer>;

export type TwsState = {
    wsConnected: boolean,
    wsError: object,
    data: {
        orders: [],
        common: number,
        commonToday: number
    }
}

export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    name: string;
    status: string;
    number: string;
    createdAt: string;
    updatedAt: string;
    price:number;
};

export type TAppActions =
    | TIngridientsActions
    | TConstructorActions
    | TAuthActions
    | TOrdersActions
    | TWsActions
    | TWsUserActions


export type AppThunk<TReturn = void> = ThunkAction<
    ReturnType<any>,
    RootState,
    TAppActions,
    any
    >


export type AppDispatch = ThunkDispatch<RootState, TAppActions, any>;