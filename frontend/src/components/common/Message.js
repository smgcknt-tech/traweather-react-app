import React, { memo } from 'react';
import "../../styles/components/Message.scss";

export default memo(function Message(props) {
    return (
        <div className="message">
            <div className={`alert alert-${props.variant || 'info'}`}>
                {props.children}
            </div>
        </div>
    );
});
