import '../styles/components/PlanAddForm.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function PlanAddForm(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const obj = { code: "", market: "", stockname: "", opening: "", support: "", losscut: "", goal: "", reason: "", strategy: "" }
    const onSubmit = (data) => {
        axios.post('/api/plan', data).then((res) => {
            console.log(res.status)
            props.setOpen(null)
        }).catch((err) => {
            console.error(err.message)
        })
    }
    return (
        <div className="plan_edit_page">
            <form className="story_table_edit_form" onSubmit={handleSubmit(onSubmit)}>
                <div>追加フォーム</div>
                {(Object.keys(obj).map((key, index) => {
                    return (
                        <>
                            <fieldset key={index}>
                                <legend>{key}</legend>
                                <label>
                                    <input type="text" autoComplete="off"
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
