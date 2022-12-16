import FeedDetails from "../../components/feed/FeedDetails";
import {useAppDispatch} from "../../services/hook";
import {FC, useEffect} from "react";
import {wsActions} from "../../services/actions/wsActions";

export const OrderFeedPage:FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsActions.wsInit);
        return() => {
            dispatch(wsActions.onClosed)
        }
    }, [])

    return(
        <main>
            <FeedDetails isAuthorized={false} />
        </main>
    )
}

export default OrderFeedPage;