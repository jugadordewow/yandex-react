import { DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import React, {useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {MOVE_INGRIDIENT_CONSTRUCTOR, REMOVE_INGRIDIENT_CONSTRUCTOR} from "../../services/actions/constructor";
import { ICard, ICardProps, ICardBunProps } from "./types";
import {useAppDispatch} from "../../services/hook";
import {ConstructorElement} from "../../services/uiTypes";


export const Ingridient:React.FC<ICardProps> = ({item, index}) => {
    const {_id, name, price, image}:ICard | any = {...item}

    const dispatch = useAppDispatch()

    const moveListItem = (dragIndex:number, hoverIndex:number) => {
        dispatch({type: MOVE_INGRIDIENT_CONSTRUCTOR, payload:{dragIndex, hoverIndex}})
    }

    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingridient',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [spec, dropItemRef] = useDrop({
        accept: 'ingridient',
        hover: (item:ICard, monitor:any) => {
            const dragIndex:(number | undefined) = item.index
            const hoverIndex:(number | undefined) = index
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/2
            const hoverActualY : (number | undefined) = monitor.getClientOffset().y - hoverBoundingRect.top

            if(!ref.current) {
                return
            }
            if(dragIndex === hoverIndex) {
                return
            }
            if(typeof dragIndex !== 'undefined' && typeof hoverIndex !=='undefined') {
                if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

                if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
                if (moveListItem) {
                    moveListItem(dragIndex, hoverIndex)
                }

            }

            item.index = hoverIndex

        },
    })

    const ref:any = useRef<HTMLElement | null>();
    const dragDropRef:any = dragRef(dropItemRef(ref))

    const deleteItem = () => {
        dispatch({type: REMOVE_INGRIDIENT_CONSTRUCTOR, payload:index})
    }


    return (
        <div className={styles.ingridientWrapper}
         ref={dragDropRef}
        >
         <DragIcon type="primary" />
          <ConstructorElement
              text={name}
              price={price}
              thumbnail={image}
              id = {_id}
              handleClose={deleteItem}
            />
        </div>
    )
}

export const Bun: React.FC<ICardBunProps> = ({bun, pos}) => {
    const {name, _id, price, image}:ICard = {...bun}
    let typeText = pos === 'top' ? '(верх)' : '(низ)'

    return (
        <ConstructorElement
            type={pos}
            isLocked={true}
            text={name + typeText}
            price={price}
            thumbnail={image}
            id = {_id}
        />
    )
}



