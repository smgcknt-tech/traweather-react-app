import axios from "axios";
import moment from "moment"


export const helper = {
    fecthData: async (url, dispatch, actions, payload) => {
        dispatch({ type: actions.SET_LOADING, payload: true })
        let query = { params: payload || {} }
        const data = await axios.get(url, query)
            .then((res) => {
                dispatch({ type: actions.SET_LOADING, payload: false })
                return res.data
            })
            .catch((err) => {
                if (err.response.data.error) {
                    const { error } = err.response.data
                    dispatch({ type: actions.SET_ERROR, payload: error });
                    dispatch({ type: actions.SET_LOADING, payload: false })
                } else {
                    dispatch({ type: actions.SET_ERROR, payload: err.message });
                    dispatch({ type: actions.SET_LOADING, payload: false });
                }

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
        const dates = arr.map(x => moment(x).format("YYYY-MM-DD"));
        return dates;
    },
    get_today: () => {
        let today = new Date();
        let todays_date = today.getDate()

        if (todays_date < 10) {
            const date = today.getFullYear() + "0" + (today.getMonth() + 1) + "0" + todays_date
            return moment(date).format("YYYY-MM-DD");

        } else if (todays_date >= 10) {
            const date = today.getFullYear() + "0" + (today.getMonth() + 1) + todays_date
            console.log(todays_date,date)
            return moment(date).format("YYYY-MM-DD");
        }
    },
};