import { useParams } from 'react-router-dom';
import IngridientDetails   from "../../components/ingridient-details/ingridient-details";
import styles from './ingridient.module.css';
import React from "react";


const IngridientPage: React.FC = () => {

    const { id } = useParams<{id:string}>();

    return (
        <div className={styles.ingridientPageWrapper}>
            <IngridientDetails itemId = {id} />
        </div>
    )
};

export default IngridientPage;