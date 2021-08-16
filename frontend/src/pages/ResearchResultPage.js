import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Indicators from '../components/Indicators';
import { hooks } from '../utils/custom_hooks'


export default function ResearchResult() {
    const { code } = useParams();
    const url = `/api/fetch_latest_stock/${code}`
    const { data, loading, error } = hooks.useFetchData(url)
    return (
        <div>
            {loading ? (<Loading />) : error ? (<Message variant="error">{error}</Message>)
                : (
                    <div>
                        <Indicators {...data} />
                    </div>
                )}
        </div>
    )
}
