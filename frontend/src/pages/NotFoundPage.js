import React from 'react';
import Message from '../components/common/Message';
import "../styles/components/Message.scss";
export default function NotFoundPage() {
    return (
        <Message variant="error">該当のページは見つかりませんでした。</Message>
    );
};
