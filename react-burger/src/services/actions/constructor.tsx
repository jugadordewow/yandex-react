export const ADD_INGRIDIENT_CONSTRUCTOR:"GET_INGRIDIENT_CONSTRUCTOR" = "GET_INGRIDIENT_CONSTRUCTOR";
export const REMOVE_INGRIDIENT_CONSTRUCTOR:"REMOVE_INGRIDIENT_CONSTRUCTOR" = "REMOVE_INGRIDIENT_CONSTRUCTOR";
export const ADD_BUN_CONSTRUCTOR:"ADD_BUN_CONSTRUCTOR" = "ADD_BUN_CONSTRUCTOR";
export const MOVE_INGRIDIENT_CONSTRUCTOR:"MOVE_INGRIDIENT_CONSTRUCTOR" = "MOVE_INGRIDIENT_CONSTRUCTOR";
export const RESET_CONSTRUCTOR:"RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";

export interface IItem {
    _id : string,
    name: string,
    price: number,
    image: string,
    calories:number,
    carbohydrates:number,
    fat:number,
    image_large:string,
    image_mobile:string,
    proteins:number,
    type:string,
    index?: number,
}

export interface IConstructor {
    items: IItem[] | [],
    bun?: IItem | null | undefined
}

export interface IAddIngredientConstructor {
    readonly type: typeof ADD_INGRIDIENT_CONSTRUCTOR,
    payload: IItem;
}

export interface IAddBunConstructor {
    readonly type: typeof ADD_BUN_CONSTRUCTOR,
    payload: IItem;
}

export interface IMoveIngridientConstructor {
    readonly type: typeof MOVE_INGRIDIENT_CONSTRUCTOR,
    payload: {
        dragIndex: number,
        hoverIndex: number
    }
}

export interface IRemoveIngridientConstructor {
    readonly type: typeof REMOVE_INGRIDIENT_CONSTRUCTOR;
    payload: number;
}

export interface IResetConstructor {
    readonly type: typeof REMOVE_INGRIDIENT_CONSTRUCTOR;
    payload: number;
}

export type TConstructorActions =
    | IAddIngredientConstructor
    | IAddBunConstructor
    | IMoveIngridientConstructor
    | IRemoveIngridientConstructor
    | IResetConstructor

