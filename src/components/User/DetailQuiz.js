import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';

import { getDataQuestion } from '~/services/apiServices';
import './DetailQuiz.scss'
import Question from './Question';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const handleBack = () => {
        if(index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if(dataQuiz.length > index + 1) {
            setIndex(index + 1)
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
                   <center><span>Quiz {quizId}: </span>{location?.state?.quizTitle}</center>
                </h1>
                <hr/>
                <div className="question-content">
                   <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                   />
                </div>
                <div className='footer'>
                    <button 
                        className='btn btn-primary'
                        onClick={() => handleBack()}
                    >
                        Back
                    </button>
                    <button 
                        className='btn btn-primary'
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="order-question-side">
                <h1>Count Down</h1>
            </div>
        </div>
    );
}

export default DetailQuiz;
