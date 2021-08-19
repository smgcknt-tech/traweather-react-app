
import Loading from '../components/Loading';
import Message from '../components/Message';
import Ticker from '../components/widgets/Ticker';
import { hook } from '../utils/custom_hooks';

export default function TopPage() {
    const url = ""
    const { data, loading, error } = hook.useFetchData(url)
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div>
            <Ticker />
        </div>
    )
}
