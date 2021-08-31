
import Loading from '../components/Loading';
import Message from '../components/Message';
import Ticker from '../components/widgets/Ticker';

export default function TopPage() {
/*
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message> */
    return (
        <div>
            <Ticker/>
        </div>
    )
}
