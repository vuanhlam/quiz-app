import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';

import { getDataQuestion } from '~/services/apiServices';
import './DetailQuiz.scss';
import Question from './Question';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const handleBack = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handleCheckBox = (answerId, questionId) => {
        // dùng hàm cloneDeep để sao chép tất cả các object kể cả các object lồng nhau (nested)
        // sao chép data của dataQuiz, phải clone vì không thể trực tiếp chỉnh sửa state của React 
        // tránh phá vỡ cấu trúc của React, dẫn đến dật lag giao diện, bug ...
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId) 
        if(question && question.answers) {
            let newAnwsers = question.answers.map((item) => {
                if(item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = newAnwsers;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if(index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
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
            setDataQuiz(data);
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
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} index={index} 
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
                    <button className="btn btn-warning" onClick={() => handleNext()}>
                        Finish
                    </button>
                </div>
            </div>
            <div className="order-question-side">
                <center>
                    <h1>Count Down</h1>
                </center>
            </div>
        </div>
    );
}

export default DetailQuiz;
