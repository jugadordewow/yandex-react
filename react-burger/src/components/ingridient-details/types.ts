import {ICard} from "../burger-constructor/types";


export interface IIngridientId {
    itemId?: string;
}

export interface IIngridientDetail {
    _id:string,
    calories:number,
    carbohydrates:number,
    fat:number,
    image:string,
    image_large:string,
    image_mobile:string,
    name:string,
    price:number,
    proteins:number,
    type:string,
}

export interface IIngridientState {
    ingridients: {
        items: Array<IIngridientDetail>
    }
}