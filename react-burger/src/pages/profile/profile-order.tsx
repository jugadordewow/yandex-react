import {useAppDispatch} from "../../services/hook";
import {FC, useEffect} from "react";
import {wsUserActions} from "../../services/actions/wsUserActions";
import FeedDetails from "../../components/feed/FeedDetails";

export const ProfilePageOrder:FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(wsUserActions.wsInit());
        return () => {
            dispatch(wsUserActions.onClosed())
        }
    }, [dispatch])

    return (
        <main>
            <FeedDetails isAuthorized={true} />
        </main>
    )
}

export default ProfilePageOrder;
