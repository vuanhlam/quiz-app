import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getQuizByUser } from '~/services/apiServices';
import './ListQuiz.scss';

function ListQuiz() {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };

    return (
        <div className="Wrapper-List-Quiz">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                            <img
                                className="card-img-top"
                                src={`data:image/png;base64,${quiz.image}`}
                                alt="Card cap"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                >
                                    Start Now
                                </button>
                            </div>
                        </div>
                    );
                })}

            {arrQuiz && arrQuiz.length === 0 && <h2>No quiz available</h2>}
        </div>
    );
}

export default ListQuiz;
