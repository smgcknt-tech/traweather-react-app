import React, {useEffect, useRef } from 'react'
import "../../styles/components/Twitter.scss"

export default function Twitter() {
    const ref = useRef();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://platform.twitter.com/widgets.js`
        script.async = true;
        ref.current.appendChild(script);
    }, []);
    return (
        <div className="twitter" ref={ref}>
            <a class="twitter-timeline" data-lang="ja" data-height="400" data-width="100%" href="https://twitter.com/traders_web?ref_src=twsrc%5Etfw"></a>
        </div>
    )
}
