import { PayloadAction } from '@reduxjs/toolkit';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../index';
import { TIngridientsActions} from "./actions/ingridients";
import { TConstructorActions } from "./actions/constructor";
import {TAuthActions} from "./actions/auth";
import {TOrdersActions} from "./actions/order";
import {rootReducer} from "./reducers";


export type RootState = ReturnType<typeof rootReducer>;

export type TAppActions =
    | TIngridientsActions
    | TConstructorActions
    | TAuthActions
    | TOrdersActions

export type AppThunk<TReturn = void> = ThunkAction<
    ReturnType<any>,
    RootState,
    TAppActions,
    any
    >


export type AppDispatch = ThunkDispatch<RootState, TAppActions, any>;