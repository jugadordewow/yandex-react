import {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loadIngridients} from "../../services/actions/ingridients";
import IngridientDetails   from "../../components/ingridient-details/ingridient-details";


const IngridientPage = () => {

    const { id } = useParams();

    return (
        <>
            <IngridientDetails itemId = {id} />
        </>
    )
};

export default IngridientPage;