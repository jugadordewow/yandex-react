import {AppThunk, AppDispatch} from "../types";

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

export interface IIngridients {
    items: Array<IIngridient>,
    itemsRequest: boolean,
    itemsFailed: boolean,
    item: IIngridient | null
}

export interface IIngridientsSuccess {
    readonly type: typeof GET_INGRIDIENTS_SUCCESS;
    payload: IIngridients | null
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
    payload: object | null
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


const getIngridients = (ingridients:IIngridients) => ({
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

export const loadIngridients:AppThunk = () => (dispatch:AppDispatch, _: any, burgerConstructor: { getAllData: () => Promise<{ data: any; }>; }) => {
    dispatch(setLoading())
    burgerConstructor.getAllData()
        .then((res: { data: any }) => res.data)
        .then((res: IIngridients) => dispatch(getIngridients(res)))
        .catch((err:object | null) => {
            dispatch(setError(err))
        })
}




