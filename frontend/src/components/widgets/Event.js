import React, {memo, useEffect, useRef } from 'react';

export default memo(function Event(props) {
    const ref = useRef();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "width": "100%",
            "height": "400",
            "colorTheme": "light",
            "isTransparent": false,
            "locale": "ja",
            "importanceFilter": "-1,0,1",
            "currencyFilter": "JPY"
        });
        ref.current.appendChild(script);
    }, []);

    return (
        <div className="event">
            <div className="tradingview-widget-container" ref={ref}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
});
