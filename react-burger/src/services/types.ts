import {ThunkAction, ThunkActionDispatch, ThunkDispatch} from 'redux-thunk';
import { TIngridientsActions} from "./actions/ingridients";
import { TConstructorActions } from "./actions/constructor";
import {TAuthActions} from "./actions/auth";
import {TOrdersActions} from "./actions/order";
import {TWsActions} from "./actions/wsActions";
import {TWsUserActions} from "./actions/wsUserActions";
import {rootReducer} from "./reducers";
import {Action, ActionCreator, AnyAction, Dispatch, Middleware} from "redux";


export type RootState = ReturnType<typeof rootReducer>;

export interface ILocation {
    from?: Location,
    background?: Location,
    pathname?: string,
    reset?: boolean
}

export type TwsState = {
    wsConnected: boolean,
    wsError: boolean,
    data: {
        orders: Array<TOrder>,
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


export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, TAppActions, RootState, Action>
    >;

export type AppDispatch = ThunkActionDispatch<AppThunk<any>>

