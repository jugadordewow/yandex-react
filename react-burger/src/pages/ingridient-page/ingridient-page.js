import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Ingridient} from "../../components/burger-constructor/ingridient-item";
import {loadIngridients} from "../../services/actions/ingridients";


const IngridientPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadIngridients())
    }, [dispatch])

    return (
        <div>
            <Ingridient item={id} />
        </div>
    )
};

export default IngridientPage;