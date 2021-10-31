import axios from "axios";
import { useEffect } from "react";

export const hooks = {
    useAuthentification: (user, dispatch, AppActions) => {
        useEffect(() => {
            if (user.status === true) {
                const access_token = localStorage.getItem('access_token')
                axios.get('/api/user/auth', { headers: { access_token: access_token } }).then((res) => {
                    dispatch({
                        type: AppActions.SET_USER, payload: {
                            id: res.data.id,
                            name: res.data.username,
                            status: true,
                        }
                    });
                }).catch((err) => {
                    localStorage.removeItem('access_token')
                    dispatch({ type: AppActions.SET_USER, payload: { ...user, status: false } })
                })
            }
        }, [user.status])// eslint-disable-line
        return { dispatch: dispatch }
    },
};
