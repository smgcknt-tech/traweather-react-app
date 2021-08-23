import React from 'react'
import { useForm } from 'react-hook-form'
import '../styles/pages/PlanEditPage.scss'

export default function PlanEditPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="plan_edit_page">
            <form className="story_table_edit_form" onSubmit={handleSubmit(onSubmit)}>
                <div>編集フォーム</div>
                <fieldset>
                    <legend>証券コード</legend>
                    <label>
                        <input {...register("ticker", { required: "※入力必須" })} />
                    </label>
                </fieldset>
                <span className="error">{errors.ticker?.message}</span>
                <fieldset>
                    <legend>市場</legend>
                    <label><input type="text" placeholder="" /></label>
                </fieldset>
                <fieldset>
                    <legend>銘柄名</legend>
                    <label><input type="text" placeholder="" /></label>
                </fieldset>
                <fieldset>
                    <legend>始値</legend>
                    <label><input type="text" placeholder="" /></label>
                </fieldset>
                <fieldset>
                    <legend>支持線</legend>
                    <label><input type="text" placeholder="" /></label>
                </fieldset>
                <fieldset>
                    <legend>損切</legend>
                    <label><input type="text" placeholder="" /></label>
                </fieldset>
                <fieldset>
                    <legend>目標値</legend>
                    <label><input type="text" placeholder="" /></label>
                </fieldset>
                <fieldset>
                    <legend>理由</legend>
                    <label><textarea type="text" placeholder=""></textarea></label>
                </fieldset>
                <fieldset>
                    <legend>戦略</legend>
                    <label><textarea type="text" placeholder=""></textarea></label>
                </fieldset>
                <div className="button"><input type="submit" value="送信" /></div>
            </form>

        </div>
    )
}
