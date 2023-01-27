import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuestion } from '~/services/apiServices';

function DetailQuiz() {
    const params = useParams();
    const quizId = params.id;
    console.log('check param: ', params);

    useEffect(() => {
        fetchQuestion()
    }, [quizId])

    const fetchQuestion = async() => {
        const res = await getDataQuestion(quizId);
        console.log(res);
    }

    return <div className="detail-quiz-container">DetailQuiz</div>;
}

export default DetailQuiz;
