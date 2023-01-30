import Select from 'react-select';
import { useState } from 'react'

import './ManageQuiz.scss';

function ManageQuiz() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleImage = (e) => {

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
                            // defaultValue={selectedOption}
                            value={type}
                            // onChange={setSelectedOption}
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
                </fieldset>
                <div>
                    table
                </div>
            </div>
        </div>
    );
}

export default ManageQuiz;
