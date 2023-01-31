import { useState } from 'react';
import Select from 'react-select';
import { MdAddCircle } from 'react-icons/md';
import { FaRegTimesCircle } from 'react-icons/fa';

import './Questions.scss';

function Questions() {
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
        <div className="question-wrapper">
            <h1 className="title">Manage Questions</h1>
            <hr/>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz: </label>
                    <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={options} />
                </div>
                Add questions:
                <div className="add-question">
                    <div className="form-floating col-6">
                        <input type="text" class="form-control" placeholder="Password" />
                        <label for="floatingPassword">Description</label>
                    </div>
                    <div className="action">
                        <div className="group-upload">
                            <span className="label-upload">Upload Image</span>
                            <input type="file" hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className="job">
                            <span className="add-btn">
                                <MdAddCircle />
                            </span>
                            <span className="minus-btn">
                                <FaRegTimesCircle />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="add-answer col-6 mt-3">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <div className="form-floating form-answer">
                        <input type="text" class="form-control" placeholder=''/>
                        <label>Answer 1</label>
                    </div>
                    <div className="job">
                        <span className="add-btn">
                            <MdAddCircle />
                        </span>
                        <span className="minus-btn">
                            <FaRegTimesCircle />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questions;
