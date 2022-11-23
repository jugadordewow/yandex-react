import { ConstructorElement, DragIcon, CurrencyIcon,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import {useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {REMOVE_INGRIDIENT_CONSTRUCTOR} from "../../services/actions/constructor";
import PropTypes from "prop-types";
import { ICard } from "./types";


export const Ingridient = ({item, index, moveListItem}) => {
    const {_id, name, price, image} = {...item}

    const dispatch = useDispatch()

    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingridient',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [spec, dropItemRef] = useDrop({
        accept: 'ingridient',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/2
            const hoverActualY : (number | null) = monitor.getClientOffset().y - hoverBoundingRect.top

            if(!ref.current) {
                return
            }
            if(dragIndex === hoverIndex) {
                return
            }

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex

        },
    })

    const ref = useRef();
    const dragDropRef = dragRef(dropItemRef(ref))

    const deleteItem = () => {
        dispatch({type: REMOVE_INGRIDIENT_CONSTRUCTOR, payload: index})
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

export const Bun = ({bun, pos}) => {
    const {name, _id, price, image, type} = {...bun}
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

Ingridient.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveListItem: PropTypes.func.isRequired
}

Bun.propTypes = {
    bun: PropTypes.object.isRequired,
    pos: PropTypes.string.isRequired
}

