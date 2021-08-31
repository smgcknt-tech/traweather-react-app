import axios from "axios";
import moment from "moment"

export const helper = {
    fecthData: async (url, dispatch, actions) => {
        dispatch({ type: actions.SET_LOADING, payload: true })
        const data = await axios.get(url)
            .then((res) => {
                dispatch({ type: actions.SET_LOADING, payload: false })
                return res.data
            })
            .catch((err) => {
                dispatch({ type: actions.SET_ERROR, payload: err.message });
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
                dispatch({ type: actions.SET_ERROR, payload: err.message });
                dispatch({ type: actions.SET_LOADING, payload: false })
            })
        return data;
    },
    format_dates: (a, ...rest) => {
        const arr = [a, ...rest]
        const dates = arr.map(x => moment(x).format("YYYY/MM/DD"));
        return dates;
    },
};