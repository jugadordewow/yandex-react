import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loadIngridients} from "../../services/actions/ingridients";
import IngridientDetails   from "../../components/ingridient-details/ingridient-details";


const IngridientPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadIngridients())
    }, [])

    return (
        <div>
            <IngridientDetails itemId = {id} />
        </div>
    )
};

export default IngridientPage;