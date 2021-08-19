import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Indicators from '../components/Indicators';
import { hook } from '../utils/custom_hooks'

export default function ResearchResult() {
    const { code } = useParams();
    const url = `/api/fetch_latest_stock/${code}`
    const { data, loading, error } = hook.useFetchData(url)
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div>
            <Indicators {...data} />
        </div>
    )
}
