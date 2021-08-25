
import Loading from '../components/Loading';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import { hook } from '../utils/custom_hooks';

export default function ResearchPage() {
    const url = '/api/fetch_latest_stock'
    const { data, loading, error } = hook.useFetchData(url)
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div>
            <SearchBar stockList={data} />
        </div>
    )
}
