import { useState } from 'react';
import Select from 'react-select';
import { MdAddCircle } from 'react-icons/md';
import { FaRegTimesCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import './Questions.scss';

function Questions() {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false,
                }
            ],
        },
    ]);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const hanldeAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter((item) => item.id !== id);
            setQuestions(questionClone);
        }
    };

    const hanldeAddRemoveAnswer = (type, qId, aId) => {
        if (type === 'ADD') {
            const questionClone = _.cloneDeep(questions);
            const question = questionClone.find((item) => item.id === qId);
            if (question) {
                const newAnswer = {
                    id: uuidv4(),
                    description: 'answer 2',
                    isCorrect: false,
                };
                question.answers.push(newAnswer);
            }
            setQuestions(questionClone)
        }

        if (type === 'REMOVE') {
          const questionClone = _.cloneDeep(questions);
          const question = questionClone.find((item) => item.id === qId)
          if(question) {
            const newAnswer = question.answers.filter(item => item.id !== aId);
            question.answers = newAnswer;
          }
          setQuestions(questionClone);
        }
    };

    console.log(questions);
    return (
        <div className="question-wrapper">
            <h1 className="title">Manage Questions</h1>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz: </label>
                    <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={options} />
                </div>
                <span>Add questions:</span>
                {questions &&
                    questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="q-main mb-5">
                                <div className="add-question">
                                    <div className="form-floating col-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Password"
                                            value={question.description}
                                        />
                                        <label htmlFor="floatingPassword">Question {index + 1} 's Description</label>
                                    </div>
                                    <div className="action">
                                        <div className="group-upload">
                                            <span className="label-upload">Upload Image</span>
                                            <input type="file" hidden />
                                            <span>0 file is uploaded</span>
                                        </div>
                                        <div className="job">
                                            <span
                                                className="add-btn"
                                                onClick={() => hanldeAddRemoveQuestion('ADD', '')}
                                            >
                                                <MdAddCircle />
                                            </span>
                                            {questions.length > 1 && (
                                                <span
                                                    className="minus-btn"
                                                    onClick={() => hanldeAddRemoveQuestion('REMOVE', question.id)}
                                                >
                                                    <FaRegTimesCircle />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {question.answers &&
                                    question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="add-answer col-6 mt-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckDefault"
                                                />
                                                <div className="form-floating form-answer">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder=""
                                                        value={answer.description}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="job">
                                                    <span
                                                        className="add-btn"
                                                        onClick={() => hanldeAddRemoveAnswer('ADD', question.id, '')}
                                                    >
                                                        <MdAddCircle />
                                                    </span>
                                                    {question.answers.length > 2 && (
                                                        <span
                                                            className="minus-btn"
                                                            onClick={() => hanldeAddRemoveAnswer('REMOVE', question.id, answer.id)}
                                                        >
                                                            <FaRegTimesCircle />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <hr />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Questions;
