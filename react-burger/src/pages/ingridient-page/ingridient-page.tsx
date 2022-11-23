import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loadIngridients} from "../../services/actions/ingridients";
import IngridientDetails   from "../../components/ingridient-details/ingridient-details";
import styles from './ingridient.module.css';


const IngridientPage = () => {

    const { id } = useParams();

    return (
        <div className={styles.ingridientPageWrapper}>
            <IngridientDetails itemId = {id} />
        </div>
    )
};

export default IngridientPage;