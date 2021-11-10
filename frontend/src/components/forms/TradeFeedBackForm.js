import { AppContext } from '../../AppStore';
import { memo, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { env } from '../../config';
import axios from 'axios';
import '../../styles/components/TradeFeedBackForm.scss';

export default memo(function TradeFeedBackForm(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state } = useContext(AppContext);
    const { user } = state;
    const [image, setImage] = useState('');

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const objectURL = URL.createObjectURL(file);
        setImage(objectURL);
    };

    const onSubmit = async (data) => {
        if (data.image[0]) {
            if (data.image[0].name.match(/[^\x01-\x7E]/)) alert("ファイル名に日本語含めないでください")
            const file = data.image[0];
            const bodyFormData = new FormData();
            bodyFormData.append('image', file);
            const response = await axios.post(env.uploadUrl, bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            data.image_url = response.data;
        }
        data.user_id = user.id;
        const res = await axios.post(`/api/reflection/create`, data);
        if (res.data.message) alert(res.data.message);
        props.setOpen(null);
    };

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
                    </div>)}
                <div className="each_input" >
                    <fieldset>
                        <legend>画像</legend>
                        <label>
                            <input type="file" accept="image/*" {...register('image')} onChange={(e) => uploadFileHandler(e)} />
                        </label>
                    </fieldset>
                </div>
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    );
});
