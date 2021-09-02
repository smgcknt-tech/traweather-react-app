import React, { memo, useEffect, useRef } from 'react'
import "../../styles/components/Ticker.scss"

export default memo(function Profile(props) {
    const ref = useRef();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    "description": "マザーズ先物",
                    "proName": "OSE:MOTHE1!"
                },
                {
                    "description": "日経先物",
                    "proName": "OSE:NK2251!"
                },
                {
                    "description": "USD/JPY",
                    "proName": "FX:USDJPY"
                },
                {
                    "description": "BTC",
                    "proName": "COINBASE:BTCUSD"
                }

            ],
            "colorTheme": "light",
            "isTransparent": false,
            "showSymbolLogo": false,
            "locale": "ja"
        })
        ref.current.appendChild(script);
    }, []);
    return (
        <div className="ticker">
            <div className="tradingview-widget-container" ref={ref}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    )
})
