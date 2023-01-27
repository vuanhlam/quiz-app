import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';

import { getDataQuestion } from '~/services/apiServices';
import './DetailQuiz.scss'

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;

    const location = useLocation();

    console.log(location);

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
            console.log(data);
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="test-side">
                <h1 className="title">
                   <center><span>Quiz {quizId}: </span>{location?.state?.quizTitle}</center>
                </h1>
                <hr/>
                <div className="question-body">
                    <figure>
                        <img />
                    </figure>
                </div>
                <div className="question-content">
                    <h2 className='question-title'>
                        <span>Question 1: </span>How old are you ?
                    </h2>
                    <div className='answer'>
                         <div>A. asdfasdf</div>
                         <div>B. asdfasdf</div>
                         <div>C. asdfasdf</div>
                         <div>D. asdfasdf</div>
                    </div>
                </div>
                <div className='footer'>
                    <button className='btn btn-primary'>Back</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className="order-question-side">
                <h1>Count Down</h1>
            </div>
        </div>
    );
}

export default DetailQuiz;
