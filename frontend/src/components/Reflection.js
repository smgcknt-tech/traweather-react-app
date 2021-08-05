import React from 'react'
import "../styles/components/Reflection.scss"

export default function Reflection() {
    return (
        <div className="row reflection">
            <h1 className="titile">反省</h1>
            <h3 className="titile">初動をしっかり取れた</h3>
            <p>売り気配が強かったので指値待ちに変更。前日Vwapあたりまで下落して売りご慣れした後に上昇する銘柄が多かった。</p>
            <img src={"/sample.jpg"} alt="sample"/>

        </div>
    )
}
