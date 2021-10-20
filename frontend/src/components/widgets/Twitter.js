import React, {memo, useEffect, useRef } from 'react'

export default memo(function Twitter() {
    const ref = useRef();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://platform.twitter.com/widgets.js`
        script.async = true;
        ref.current.appendChild(script);
    }, []);
    return (
        <div className="twitter">
            <a className="twitter-timeline" data-height="400" data-width="100%" href="https://twitter.com/traders_web?ref_src=twsrc%5Etfw" ref={ref} >...</a>
        </div>
    )
})
