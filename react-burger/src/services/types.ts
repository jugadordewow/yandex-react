import {ThunkAction, ThunkActionDispatch, ThunkDispatch} from 'redux-thunk';
import { TIngridientsActions} from "./actions/ingridients";
import { TConstructorActions } from "./actions/constructor";
import {TAuthActions} from "./actions/auth";
import {TOrdersActions} from "./actions/order";
import {TWsActions} from "./actions/wsActions";
import {TWsUserActions} from "./actions/wsUserActions";
import {rootReducer} from "./reducers";
import BurgerService from "../utils/api";
import {Action, ActionCreator, AnyAction, Dispatch, Middleware} from "redux";




const burgerService = new BurgerService()



export type RootState = ReturnType<typeof rootReducer>;

export type TBurgerService = {
    remindPswd: (form: {email:string}) => void;


}

export type TBurgerService2 = typeof burgerService

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

//
// export type AppThunk<TReturn extends (...args: any[]) => ThunkAction<TReturn, RootState, TAppActions, any>> = ThunkActionDispatch<TReturn>;

//export type AppThunk<TReturn extends (...args: any[]) => void => ThunkAction<TAppActions, any, any, any> = ;

export type ThunkMiddleware = Middleware<TBurgerService2>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, TAppActions, RootState, Action>
    >;

export type AppDispatch = ThunkActionDispatch<AppThunk<any>>

