import axios from "axios";
import { useEffect, useState } from "react";

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
    }
};