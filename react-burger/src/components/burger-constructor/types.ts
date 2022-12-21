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
    item?: object,
    index?: number,
    moveListItem?: () => void
}

export interface ICardProps {
    item?: ICard,
    index?: number,
    moveListItem?: (arg0?: number, arg1?: number) => void
}

export interface IItem {
    item: ICard,
    uid: string,
    type: string,
    index: number,
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
    moveListItem: () => void | undefined
}

export interface IConstructorState {
    burger: {
        items: Array<ICard> | null,
        bun: ICard | null
    }
}

export interface ICardBunProps {
    bun: ICard,
    pos: 'top' | 'bottom'
}