import Select from 'react-select';
import { useState } from 'react'
import { toast } from 'react-toastify';

import './ManageQuiz.scss';
import { postCreateNewQuiz } from '~/services/apiServices';

function ManageQuiz() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // file.preview = URL.createObjectURL(file);
            setImage(file);
        }else {
            e.target.value = null;
        }
    }

    const handleSubmitQuiz = async () => {
        //validate  
        if(!name) {
            toast.error('Name is required')
            return;
        }
        if(!description) {
            toast.error('Description is required')
            return;
        }

        //submit api
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        console.log('check res: ', res);
        if(res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
        }else {
            toast.error(res.EM)
        }
    }

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    return (
        <div className="quiz-wrapper">
            <h1 className="quiz-title">Manage Quizes</h1>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add New Quiz</legend>
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Your Quiz Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="desc" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            defaultValue={type}
                            onChange={setType}
                            options={options}
                            placeholder={"Quiz type .."}
                        />
                    </div>
                    <div className="more-action">
                        <label>Upload Image</label>
                        <input 
                            type="file" 
                            className='form-control'
                            onChange={(e) => handleImage(e)}
                        />
                    </div>
                    <div className='mt-3'>
                        <button
                            className='btn btn-warning'
                            onClick={() => handleSubmitQuiz()} 
                        >
                            Save
                        </button>
                    </div>
                </fieldset>
                <div>
                    table
                </div>
            </div>
        </div>
    );
}

export default ManageQuiz;
