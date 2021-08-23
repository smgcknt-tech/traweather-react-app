import React from 'react'
import { useForm } from 'react-hook-form'
import '../styles/pages/PlanEditPage.scss'
import axios from 'axios'

export default function PlanEditPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const results = await axios.post('/api/plan', data)
            console.log(results);
        } catch(err){
            console.error(err.message)
        }
    }
    return (
        <div className="plan_edit_page">
            <form className="story_table_edit_form" onSubmit={handleSubmit(onSubmit)}>
                <div>編集フォーム</div>
                <fieldset>
                    <legend>証券コード</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("ticker", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.ticker && (<span className="error">{errors.ticker.message}</span>)}
                <fieldset>
                    <legend>市場</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("market", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.market && (<span className="error">{errors.market.message}</span>)}
                <fieldset>
                    <legend>銘柄名</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("stockname", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.stockname && (<span className="error">{errors.stockname.message}</span>)}
                <fieldset>
                    <legend>始値</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("opening", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.opening && (<span className="error">{errors.opening.message}</span>)}
                <fieldset>
                    <legend>支持線</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("support", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.support && (<span className="error">{errors.support.message}</span>)}
                <fieldset>
                    <legend>損切</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("losscut", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.losscut && (<span className="error">{errors.losscut.message}</span>)}
                <fieldset>
                    <legend>目標値</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("goal", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.goal && (<span className="error">{errors.goal.message}</span>)}
                <fieldset>
                    <legend>理由</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("reason", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.reason && (<span className="error">{errors.reason.message}</span>)}
                <fieldset>
                    <legend>戦略</legend>
                    <label>
                        <input type="text" autocomplete="off"
                            {...register("strategy", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                {errors.strategy && (<span className="error">{errors.strategy.message}</span>)}
                <div className="button"><input type="submit" value="送信" /></div>
            </form>

        </div>
    )
}
