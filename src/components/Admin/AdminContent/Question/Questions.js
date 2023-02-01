import { useState, useEffect } from 'react';
import Select from 'react-select';
import { MdAddCircle } from 'react-icons/md';
import { FaRegTimesCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin } from '~/services/apiServices';
import { postCreateQuestionForQuiz, postCreateAnswerForQuestion } from '~/services/apiServices';


import './Questions.scss';

function Questions() {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setPreviewImage] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);
    const [questionPreviewImage, setQuestionPreviewIamge] = useState({
        url: '',
        title: ''
    })
    const [questions, setQuestions] = useState([
        {
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
        },
    ]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    };

    console.log(listQuiz);

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
                    description: '',
                    isCorrect: false,
                };
                question.answers.push(newAnswer);
            }
            setQuestions(questionClone);
        }

        if (type === 'REMOVE') {
            const questionClone = _.cloneDeep(questions);
            const question = questionClone.find((item) => item.id === qId);
            if (question) {
                const newAnswer = question.answers.filter((item) => item.id !== aId);
                question.answers = newAnswer;
            }
            setQuestions(questionClone);
        }
    };

    const hanldeOnChange = (type, qId, value) => {
        if (type === 'QUESTION') {
            const cloneQuestions = _.cloneDeep(questions);
            const question = cloneQuestions.find((item) => item.id === qId);
            if (question) {
                question.description = value;
            }
            setQuestions(cloneQuestions);
        }
    };

    const hanldeOnChangeFileQuestion = (qId, e) => {
        const cloneQuestions = _.cloneDeep(questions);
        const question = cloneQuestions.find((item) => item.id === qId);
        if (question && e.target && e.target.files && e.target.files[0]) {
            question.imageFile = e.target.files[0];
            question.imageName = e.target.files[0].name;
        }
        setQuestions(cloneQuestions);
    };

    const handleAnswerQuestion = (type, qId, aId, e) => {
        const cloneQuestions = _.cloneDeep(questions);
        const question = cloneQuestions.find((item) => item.id === qId);
        if (question) {
            const answer = question.answers.find((item) => item.id === aId);
            if (answer) {
                if (type === 'CHECKBOX') {
                    answer.isCorrect = e.target.checked;
                }
                if (type === 'INPUT') {
                    answer.description = e.target.value;    
                }
                setQuestions(cloneQuestions);
            }
        }
    };

    const hanldePreviewImage = (qId) => {
        const cloneQuestions = _.cloneDeep(questions);
        const question = cloneQuestions.find((item) => item.id === qId);
        if(question) {
            setQuestionPreviewIamge({
                url: URL.createObjectURL(question.imageFile),
                title: question.imageName
            })
            setPreviewImage(true)
        }
    }

    const hanldeSubmitQuestionForQuiz = async () => {
        console.log('questions: ', questions, selectedQuiz);

        // validate data  
        
        
        //submit question
        Promise.all(questions.map(async (question) => {
            const q = await postCreateQuestionForQuiz(selectedQuiz.value, question.description, question.imageFile);

            //submit answer
            Promise.all(question.answers.map(async(answer) => {
                await postCreateAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }))
            console.log('q', q);
        }));
    }

    return (
        <div className="question-wrapper">
            <h1 className="title">Manage Questions</h1>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz: </label>
                    <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
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
                                            onChange={(e) => hanldeOnChange('QUESTION', question.id, e.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Question {index + 1} 's Description</label>
                                    </div>
                                    <div className="action">
                                        <div className="group-upload">
                                            <label className="label-upload" htmlFor={question.id}>
                                                Upload Image
                                            </label>
                                            <input
                                                id={question.id}
                                                type="file"
                                                hidden
                                                onChange={(e) => hanldeOnChangeFileQuestion(question.id, e)}
                                            />
                                            <span>
                                                {
                                                    question.imageName 
                                                    ? 
                                                        <span
                                                            style={{cursor: 'pointer'}}
                                                            onClick={() => hanldePreviewImage(question.id)}
                                                        >
                                                            {question.imageName}
                                                        </span> 
                                                    : 
                                                    '0 file is uploaded'
                                                }
                                            </span>
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
                                {
                                    question.answers &&
                                    question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="add-answer col-6 mt-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                        handleAnswerQuestion('CHECKBOX', question.id, answer.id, e)
                                                    }
                                                />
                                                <div className="form-floating form-answer">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={answer.description}
                                                        onChange={(e) =>
                                                            handleAnswerQuestion('INPUT', question.id, answer.id, e)
                                                        }
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
                                                            onClick={() =>
                                                                hanldeAddRemoveAnswer('REMOVE', question.id, answer.id)
                                                            }
                                                        >
                                                            <FaRegTimesCircle />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <hr />
                            </div>
                        );
                    })
                }
                {
                    isPreviewImage &&
                    <Lightbox 
                        image={questionPreviewImage.url}
                        title={questionPreviewImage.title} 
                        onClose={() => setPreviewImage(false)}
                    ></Lightbox>
                }
                {
                    questions && questions.length > 0 &&
                    <button 
                        className='btn btn-warning'
                        onClick={() => hanldeSubmitQuestionForQuiz()}
                    >
                        Save Questions
                    </button>
                }
            </div>
            
        </div>
    );
}

export default Questions;
