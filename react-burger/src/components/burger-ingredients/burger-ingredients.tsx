import React, {useState, useRef} from "react";
import styles from './burger-ingridients.module.css';
import IngridientsList from "./ingridients-list";
import {Tab} from "../../services/uiTypes";


const BurgerIngredients: React.FC = () => {

    const [current, setCurrent] = useState<string>('bun');

    const ref:any = useRef<HTMLInputElement | null>(null)
    const bunRef:any = useRef<HTMLInputElement | null>(null)
    const sauseRef:any = useRef<HTMLInputElement | null>(null)
    const mainRef:any = useRef<HTMLInputElement | null>(null)

    const onScroll = () => {
        const distance: number = ref.current.getBoundingClientRect().y;
        const bunDistance: number = Math.abs(distance - bunRef.current.getBoundingClientRect().y);
        const sauseDistance: number = Math.abs(distance - sauseRef.current.getBoundingClientRect().y);
        const mainDistance: number = Math.abs(distance - mainRef.current.getBoundingClientRect().y);
        const minTabDistance: number = Math.min(bunDistance, sauseDistance, mainDistance);
        const activeTab: string = (minTabDistance === sauseDistance ? 'sause' : (minTabDistance === mainDistance ? 'main' : 'bun'));
        setCurrent(activeTab);
    }

    const handleClick = (current: string) => {
        if(current === 'bun') {
            bunRef.current.scrollIntoView(true);
        }
        if(current === 'sause') {
            sauseRef.current.scrollIntoView(true);
        }
        if(current === 'main') {
            mainRef.current.scrollIntoView(true);
        }
    }

  
    return(
        <div className={styles.burger_ingridients_wrapper}>
           <div className={styles.main_header}>
                <h1 className={styles.text_type_main_large}>Соберите бургер </h1>
           </div>
            <div className={styles.tabs_wrapper_dashed}>
                <Tab value="bun" active={current === 'bun'} onClick={handleClick} >
                    Булки
                </Tab>
                <Tab value="sause" active={current === 'sauce'} onClick={handleClick} >
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClick} >
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingridients_items_wrapper} ref={ref} onScroll={onScroll}>
                <IngridientsList name="Булки" type="bun" ref={bunRef}/>
                <IngridientsList name="Соусы" type="sauce" ref={sauseRef}/>
                <IngridientsList name="Начинки" type="main" ref={mainRef}/>
            </div>
            
            
        </div>
    );
}

export default BurgerIngredients;