export interface ICard {
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
}

export interface IConstructor {

}

export interface IItem {
    item: ICard,
    uid: string,
    type: string,
    index: number,
}

export interface IConstructorState {
    burger: {
        items: Array<ICard>,
        bun: ICard
    }
}