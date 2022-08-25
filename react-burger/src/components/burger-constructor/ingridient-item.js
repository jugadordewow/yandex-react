import { ConstructorElement, DragIcon, CurrencyIcon,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {v4 as uidKey} from  'uuid'
import styles from './burger-constructor.module.css';
import {useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {REMOVE_INGRIDIENT_CONSTRUCTOR} from "../../services/actions/constructor";
import PropTypes from "prop-types";


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
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

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
              key={uidKey()}
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
            type={type}
            isLocked={true}
            text={name + typeText}
            key = {uidKey()}
            price={price}
            thumbnail={image}
            id = {_id}
        />
    )
}

Ingridient.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    moveListItem: PropTypes.func
}

Bun.propTypes = {
    bun: PropTypes.object,
    pos: PropTypes.string
}

