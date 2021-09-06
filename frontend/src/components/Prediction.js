import React, { useContext, useRef, useState } from 'react'
import { context, actions } from '../stores/PlanPage';
import '../styles/components/Prediction.scss'
import { helper } from '../utils/helper';

export default function Prediction() {
    const { state, dispatch } = useContext(context);
    const { prediction } = state;
    const [open, setOpen] = useState(false)
    const predictionText = useRef(null)
    const strategyText = useRef(null)
    const featuredSetorText = useRef(null)

    const handleSubmit = (target) => {
        setOpen(false)
        let payload = null;
        target === "prediction" && (payload = { prediction: predictionText.current.value })
        target === "strategy" && (payload = { strategy: strategyText.current.value })
        target === "featuredsector" && (payload = { featuredsector: featuredSetorText.current.value })
        helper.postData(`/api/update_prediction/${helper.get_today()}`, dispatch, actions, payload)
            .then((data) => {
                dispatch({ type: actions.SET_PREDICTION, payload: data });
            })
    }

    return (
        <div className="prediction" onBlur={() => { setOpen(false) }}>
            <div className="prediction_container">
                <section>
                    <h2 className="title">相場予想</h2>
                    <div className="content">
                        {prediction ? (
                            <textarea
                                key={prediction.prediction}
                                defaultValue={prediction.prediction}
                                onFocus={() => { setOpen("prediction") }}
                                ref={predictionText}
                            >
                            </textarea>) : "データがありません"}
                    </div>
                    {open === "prediction" && <div className="button"><span onMouseDown={() => { handleSubmit("prediction") }}>保存</span></div>}
                </section>
                <section>
                    <h2 className="title">戦略</h2>
                    <div className="content">
                        {prediction ? (
                            <textarea
                                key={prediction.strategy}
                                defaultValue={prediction.strategy}
                                onFocus={() => { setOpen("strategy") }}
                                ref={strategyText}
                            >
                            </textarea>) : "データがありません"}
                    </div>
                    {open === "strategy" && <div className="button"><span onMouseDown={() => { handleSubmit("strategy") }}>保存</span></div>}
                </section>
                <section>
                    <h2 className="title">注目セクター</h2>
                    <div className="content">
                        {prediction ? (
                            <textarea
                                key={prediction.featuredsector}
                                defaultValue={prediction.featuredsector}
                                onFocus={() => { setOpen("featuredsector") }}
                                ref={featuredSetorText}
                            >
                            </textarea>) : "データがありません"}
                    </div>
                    {open === "featuredsector" && <div className="button"><span onMouseDown={() => { handleSubmit("featuredsector") }}>保存</span></div>}
                </section>
            </div>
        </div>
    )
}
