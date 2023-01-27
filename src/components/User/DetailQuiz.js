import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getDataQuestion } from '~/services/apiServices';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;

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
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        if(index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        answers.push(item.answers)
                    })
                    console.log('value: ', value ,'key: ', key);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value();
            console.log(data);
        }
    };

    return <div className="detail-quiz-container">DetailQuiz</div>;
}

export default DetailQuiz;
