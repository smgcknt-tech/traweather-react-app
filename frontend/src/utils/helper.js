import axios from "axios";
import moment from "moment"


export const helper = {
    fetchData: async (url, dispatch, actions, payload) => {
        dispatch({ type: actions.SET_LOADING, payload: true })
        const data = await axios.get(url, { params: payload || {} })
            .then((res) => {
                dispatch({ type: actions.SET_LOADING, payload: false })
                return res.data
            })
            .catch((err) => {
                if (err.response.data.error) {
                    const { error } = err.response.data
                    dispatch({ type: actions.SET_ERROR, payload: error })
                } else {
                    dispatch({ type: actions.SET_ERROR, payload: err.message })
                }
            }).finally(() => {
                dispatch({ type: actions.SET_LOADING, payload: false })
            })
        return data;
    },
    postData: async (url, dispatch, actions, postData) => {
        dispatch({ type: actions.SET_LOADING, payload: true })
        const data = await axios.post(url, postData)
            .then((res) => {
                dispatch({ type: actions.SET_LOADING, payload: false })
                return res.data
            })
            .catch((err) => {
                if (err.response.data.error) {
                    const { error } = err.response.data
                    dispatch({ type: actions.SET_ERROR, payload: error })
                } else {
                    dispatch({ type: actions.SET_ERROR, payload: err.message })
                }
            }).finally(()=> {
                dispatch({ type: actions.SET_LOADING, payload: false })
            })
        return data;
    },
    time: () => {
        return {
            today: moment().format("YYYY-MM-DD"),
            yesterday: moment().subtract(1, 'day').format("YYYY-MM-DD"),
        }
    },
    format_dates: (a, ...rest) => {
        const arr = [a, ...rest]
        const dates = arr.map(x => moment(x).format("YYYY-MM-DD"))
        return dates
    },
};