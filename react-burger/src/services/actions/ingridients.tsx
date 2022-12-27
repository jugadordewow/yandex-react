import {AppThunk, AppDispatch} from "../types";
import {createAction} from "@reduxjs/toolkit";
import {getAllData} from "../../utils/api";


// export const ingridientActions = {
//     getIngridientsSuccess: createAction<{data: Array<IIngridient>}>("GET_INGRIDIENTS_SUCCESS"),
//     getIngridientItem: createAction<{item: IIngridient}>("GET_INGRIDIENT_ITEM"),
//     resetIngridientItem: createAction("RESET_INGRIDIENT_ITEM"),
//     getIngridientsRequest: createAction("GET_INGRIDIENTS_REQUEST"),
//     getIngridientsError: createAction("GET_INGRIDIENTS_ERROR")
// }


export const GET_INGRIDIENTS_SUCCESS : 'GET_INGRIDIENTS_SUCCESS' = "GET_INGRIDIENTS_SUCCESS"
export const GET_INGRIDIENT_ITEM : 'GET_INGRIDIENT_ITEM' = "GET_INGRIDIENT_ITEM"
export const RESET_INGRIDIENT_ITEM : 'RESET_INGRIDIENT_ITEM' = "RESET_INGRIDIENT_ITEM"
export const GET_INGRIDIENTS_ERROR : 'GET_INGRIDIENTS_ERROR' = "GET_INGRIDIENTS_ERROR"
export const GET_INGRIDIENTS_REQUEST : 'GET_INGRIDIENTS_REQUEST' = "GET_INGRIDIENTS_REQUEST"

export interface IIngridient {
    __v:number;
    _id:string;
    calories:number;
    carbohydrates:number;
    fat:number;
    image:string;
    image_large:string;
    image_mobile:string;
    name:string;
    price:number;
    proteins:number;
    type:string;
}

export interface IIngridientsState {
    items: Array<IIngridient>,
    itemsRequest: boolean,
    itemsFailed: boolean,
    item: IIngridient | null
}

export interface IIngridientsSuccess {
    readonly type: typeof GET_INGRIDIENTS_SUCCESS;
    payload: Array<IIngridient>
}

export interface IIngridientsRequest {
    readonly type: typeof GET_INGRIDIENTS_REQUEST;
}

export interface IIngridientsError {
    readonly type: typeof GET_INGRIDIENTS_ERROR;
    payload: object | null
}

export interface IGetIngridientItem {
    readonly type: typeof GET_INGRIDIENT_ITEM;
    payload: IIngridient | null
}

export interface IResetIngridientItem {
    readonly type: typeof RESET_INGRIDIENT_ITEM;
    payload: object | null
}

export type TIngridientsActions =
    | IIngridientsSuccess
    | IIngridientsRequest
    | IIngridientsError
    | IGetIngridientItem
    | IResetIngridientItem


const getIngridients = (ingridients:IIngridientsState) => ({
    type: GET_INGRIDIENTS_SUCCESS,
    payload: ingridients,
})

const setLoading = () => ({
    type: GET_INGRIDIENTS_REQUEST,
})

const setError = (err: object | null) => ({
    type: GET_INGRIDIENTS_ERROR,
    payload: err
})


export const loadIngridients:AppThunk = () => {
    return function(dispatch:AppDispatch) {
            dispatch(setLoading())
            getAllData()
                .then((res) => res.data)
                .then((res: IIngridientsState) => dispatch(getIngridients(res)))
                .catch((err:object | null) => {
                    dispatch(setError(err))
                })
    }
}




