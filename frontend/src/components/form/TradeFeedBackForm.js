import '../../styles/components/TradeFeedBackForm.scss'
import { AppContext } from '../../stores/App'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'

import axios from 'axios';
import { useState } from 'react';



export default function TradeFeedBackForm(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state: AppState } = useContext(AppContext);
    const [image, setImage] = useState('');

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const objectURL = URL.createObjectURL(file)
        setImage(objectURL);
    };
    const onSubmit = async (data) => {

        const file = data.image[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        const response = await axios.post('/api/uploads/s3', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        data.image_url = response.data
        data.user_id = AppState.user.id
        await axios.post(`/api/create_feed_back`, data)
            .then((response) => {
                if (response.data.error) alert(response.data.error)
                if (!response.data.error) alert("振り返りを投稿しました")
            })
        props.setOpen(null)
    }

    return (
        <div className="trade_feed_back_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div><span onClick={() => { props.setOpen(null) }}><i className="fas fa-times"></i></span></div>
                <div className="each_input" >
                    <fieldset>
                        <legend>タイトル</legend>
                        <label>
                            <input type="text" autoComplete="off" defaultValue=""
                                {...register('title', { required: `タイトルが入力されていません` })}
                            ></input>
                        </label>
                    </fieldset>
                    {(errors['title']) ? (<span className="error">{errors['title'].message}</span>) : null}
                </div>
                <div className="each_input" >
                    <fieldset>
                        <legend>反省文</legend>
                        <label>
                            <textarea type="text" autoComplete="off" defaultValue=""
                                {...register('content', { required: `反省文が入力されていません` })}
                            ></textarea>
                        </label>
                    </fieldset>
                    {(errors['content']) ? (<span className="error">{errors['content'].message}</span>) : null}
                </div>
                {image && (
                    <div className="each_input" >
                        <fieldset>
                            <legend>添付画像</legend>
                            <label>
                                <img src={image} alt="uploaded_image"></img>
                            </label>
                        </fieldset>
                        {(errors['image_url']) ? (<span className="error">{errors['image_url'].message}</span>) : null}
                    </div>)}
                <div className="each_input" >
                    <fieldset>
                        <legend>画像</legend>
                        <label>
                            <input type="file"
                                {...register('image', { required: `画像がアップロードされていません` })}
                                onChange={(e) => uploadFileHandler(e)}
                            />
                        </label>
                    </fieldset>
                    {(errors['image']) ? (<span className="error">{errors['image'].message}</span>) : null}
                </div>
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    )
}
