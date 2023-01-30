import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';

import { getDataQuestion, postSubmitQuiz } from '~/services/apiServices';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [questionList, setQuestionList] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    const handleBack = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (questionList.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handleSubmit = async () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        const payLoad = {
            quizId: +quizId

        };
        if(questionList && questionList.length > 0) {
            let results = questionList.map((question) => {
                let data = {};
                data.questionId = +question.questionId;
                data.userAnswerId = []
                question.answers.forEach((answer) => {
                    if(answer.isSelected) {
                        data.userAnswerId.push(answer.id);
                    }
                })
                return data;
            })
            payLoad.answers = results;
        }
        //submit api
        let res = await postSubmitQuiz(payLoad);
        console.log('check res: ', res);
        if(res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setShowModalResult(true)
        }else {
            console.log('something go wrong!!');
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        // dùng hàm cloneDeep để sao chép tất cả các object kể cả các object lồng nhau (nested)
        // sao chép data của questionList, phải clone vì không thể trực tiếp chỉnh sửa state của React 
        // tránh phá vỡ cấu trúc của React, dẫn đến dật lag giao diện, bug ...
        let questionListClone = _.cloneDeep(questionList);
        let question = questionListClone.find(item => +item.questionId === +questionId) 
        if(question && question.answers) {
            let newAnwsers = question.answers.map((item) => {
                if(item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = newAnwsers;
        }
        let index = questionListClone.findIndex(item => +item.questionId === +questionId);
        if(index > -1) {
            questionListClone[index] = question;
            setQuestionList(questionListClone);
        }

    }

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const res = await getDataQuestion(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setQuestionList(data);
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="test-side">
                <h1 className="title">
                    <center>
                        <span>Quiz {quizId}: </span>
                        {location?.state?.quizTitle}
                    </center>
                </h1>
                <div className="line"></div>
                <div className="question-content">
                    <Question 
                        question={questionList && questionList.length > 0 ? questionList[index] : []} index={index} 
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-primary" onClick={() => handleBack()}>
                        Back
                    </button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>
                        Next
                    </button>
                    <button className="btn btn-warning" onClick={() => handleSubmit()}>
                        Finish
                    </button>
                </div>
            </div>
            <div className="order-question-side">
                <center>
                    <h1>Count Down</h1>
                </center>
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setShowModalResult}
                data={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;
