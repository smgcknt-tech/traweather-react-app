import React from 'react'
import data from "../data"
import Indicator from "../components/Indicator";

export default function top_page() {
    return (
        <div>
          <div className="row center">
            {data.indicators.map((indicator)=>{
              return <Indicator indicator={indicator}></Indicator>
            })}
          </div>
        </div>
    )
}
