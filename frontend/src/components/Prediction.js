import React, { useContext, useRef, useState } from 'react'
import { AppContext,AppActions } from '../stores/App';
import '../styles/components/Prediction.scss'
import { helper } from '../utils/helper';

export default function Prediction() {
    const { state: AppState, dispatch : AppDispatch } = useContext(AppContext);
    const { user, prediction } = AppState;
    const [open, setOpen] = useState(false)
    const predictionText = useRef(null)
    const strategyText = useRef(null)
    const featuredSetorText = useRef(null)

    const handleSubmit = async(target) => {
        setOpen(false)
        let payload = null;
        //target name should be same as market_prediction table column.
        target === "prediction" && (payload = { prediction: predictionText.current.value })
        target === "strategy" && (payload = { strategy: strategyText.current.value })
        target === "featured_sector" && (payload = { featured_sector: featuredSetorText.current.value })
        payload.user_id = user.id
        payload.created_at = helper.get_today()
        const response = await helper.postData(`/api/update_prediction`,AppDispatch, AppActions, payload)
        if(response){
            AppDispatch({ type: AppActions.SET_PREDICTION, payload: response });
        }
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
                            </textarea>
                        ) : "データがありません"}
                    </div>
                    {open === "prediction" && (
                        <div className="button">
                            <span onMouseDown={() => { handleSubmit("prediction") }}>保存</span>
                        </div>
                    )}
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
                            </textarea>
                        ) : "データがありません"}
                    </div>
                    {open === "strategy" && (
                        <div className="button">
                            <span onMouseDown={() => { handleSubmit("strategy") }}>保存</span>
                        </div>
                    )}
                </section>
                <section>
                    <h2 className="title">注目セクター</h2>
                    <div className="content">
                        {prediction ? (
                            <textarea
                                key={prediction.featured_sector}
                                defaultValue={prediction.featured_sector}
                                onFocus={() => { setOpen("featured_sector") }}
                                ref={featuredSetorText}
                            >
                            </textarea>
                        ) : "データがありません"}
                    </div>
                    {open === "featured_sector" && (
                        <div className="button"><span onMouseDown={() => { handleSubmit("featured_sector") }}>保存</span></div>
                    )}
                </section>
            </div>
        </div>
    )
}
