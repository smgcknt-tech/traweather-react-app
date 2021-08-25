import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
export const CurrentStock = createContext({ stock: "", setStock: () => { } });

export const hook = {
    useFetchData: (url) => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);
        const [data, setData] = useState(null);
        useEffect(() => {
            (async () => {
                try {
                    setLoading(true);
                    const { data } = await axios.get(url);
                    setLoading(false);
                    setData(data);
                } catch (err) {
                    setError(err.message)
                    setLoading(false);
                }
            })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return { data, loading, error };
    },
    useRedirect: () => {
        const location = useLocation();
        const [flash, setFlash] = useState(false);
        useEffect(() => {
            if (location.state) {
                setFlash(location.state)
            }
        }, [location])
        window.history.replaceState({}, document.title)
        return {flash}
    },
    useCurrentStock:()=>{
        const [stock, setStock] = useState(null)
        const value = { stock, setStock }
        return {CurrentStock,value}
    },
    useSetRedirect:(message,path)=>{
        const hisotry = useHistory()
        hisotry.push({
            pathname: path,
            state: message
        })

    }
};