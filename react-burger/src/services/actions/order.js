export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"
export const GET_ORDER_ERROR = "GET_ORDER_ERROR"
export const ORDER_RESET = "GET_ORDER_RESET"

const getOrder = (orderItem) => ({
    type: GET_ORDER_SUCCESS,
    payload: orderItem,
})

const setLoading = () => ({
    type: GET_ORDER_REQUEST,
})

const setError = (err) => ({
    type: GET_ORDER_ERROR,
    payload: err
})

export const loadOrder = (order) => (dispatch, _, burgerConstructor) => {
    dispatch(setLoading())
    burgerConstructor.getOrderData(order)
        .then(res => dispatch(getOrder(res)))
        .catch(err => dispatch(setError(err)))
}