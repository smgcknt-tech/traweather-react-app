import React from 'react'
import { useForm } from 'react-hook-form'
import '../styles/pages/PlanEditPage.scss'

export default function PlanEditPage() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="plan_edit_page">
            <form className="story_table_edit_form" onSubmit={handleSubmit(onSubmit)}>
                <div>編集フォーム</div>
                <fieldset>
                    <legend>証券コード</legend>
                    <label><input type="text" placeholder="" ref={register("tciker",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>市場</legend>
                    <label><input type="text" placeholder="" ref={register("market",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>銘柄名</legend>
                    <label><input type="text" placeholder="" ref={register("name",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>始値</legend>
                    <label><input type="text" placeholder="" ref={register("opening",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>支持線</legend>
                    <label><input type="text" placeholder="" ref={register("support",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>損切</legend>
                    <label><input type="text" placeholder="" ref={register("loss_cut",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>目標値</legend>
                    <label><input type="text" placeholder="" ref={register("goal",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>理由</legend>
                    <label><input type="text" placeholder="" ref={register("reason",)} /></label>
                </fieldset>
                <fieldset>
                    <legend>戦略</legend>
                    <label><input type="text" placeholder="" ref={register("strategy",)} /></label>
                </fieldset>
                <div className="button"><button type="submit">送信</button></div>
            </form>

        </div>
    )
}
