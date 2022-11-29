export interface IIngridientsList {
    name: string,
    type: string
}

export interface IIngridient {
    _id:string,
    calories?:number,
    carbohydrates?:number,
    fat?:number,
    image:string,
    image_large?:string,
    image_mobile?:string,
    name:string,
    price:number,
    proteins?:number,
    type:string,
    item: object
}

export interface IIngridientsState {
    ingridients: {
        items: Array<IIngridient>,
        itemsRequest:boolean,
        itemsFailed: boolean,
    }
    burger: {
        bun: Array<IIngridient>,
        items: Array<IIngridient>,
    }
    items: Array<IIngridient>,
    bun: Array<IIngridient>
}


