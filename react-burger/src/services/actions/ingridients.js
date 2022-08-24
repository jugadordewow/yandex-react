export const GET_INGRIDIENTS_SUCCESS = "GET_INGRIDIENTS_SUCCESS"
export const GET_INGRIDIENT_ITEM = "GET_INGRIDIENT_ITEM"
export const RESET_INGRIDIENT_ITEM = "RESET_INGRIDIENT_ITEM"
export const GET_INGRIDIENTS_ERROR = "GET_INGRIDIENTS_ERROR"
export const GET_INGRIDIENTS_REQUEST = "GET_INGRIDIENTS_REQUEST"

const getIngridients = (ingridients) => ({
    type: GET_INGRIDIENTS_SUCCESS,
    payload: ingridients,
})

const setLoading = () => ({
    type: GET_INGRIDIENTS_REQUEST,
})

const setError = (err) => ({
    type: GET_INGRIDIENTS_ERROR,
    payload: err
})

export const loadIngridients = () => (dispatch, _, burgerConstructor) => {
    dispatch(setLoading())
    burgerConstructor.getAllData()
        .then(res => dispatch(getIngridients(res)))
        .catch(err => dispatch(setError(err)))
}




