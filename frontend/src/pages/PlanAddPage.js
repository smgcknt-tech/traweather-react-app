import '../styles/pages/PlanAddPage.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { hook } from '../utils/custom_hooks';

export default function PlanEditPage(props) {
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();
    const obj = { code: "", market: "", name: "", opening: "", support: "", losscut: "", goal: "", reason: "", strategy: "" }
    const onSubmit = async (data) => {
        try {
            await axios.post('/api/plan', data)
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className="plan_edit_page">
            {isSubmitted && !errors ? hook.useSetRedirect("データを更新しました", "/plan") : null}
            <form className="story_table_edit_form" onSubmit={handleSubmit(onSubmit)}>
                <div>追加フォーム</div>
                {(Object.keys(obj).map((key, index) => {
                    return (
                        <>
                            <fieldset key={index}>
                                <legend>{key}</legend>
                                <label>
                                    <input type="text" autocomplete="off"
                                        {...register(key, { required: `${key}が入力されていません` })} />
                                </label>
                            </fieldset>
                            {(errors[key]) ? (<span className="error">{errors[key].message}</span>) : null}
                        </>
                    )
                }))}
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    )
}
