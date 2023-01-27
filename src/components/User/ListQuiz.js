import { useEffect, useState } from 'react';
import { getQuizByUser } from '~/services/apiServices';
import './ListQuiz.scss'

function ListQuiz() {
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getQuizByUser();
        console.log(res);
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };

    return (
        <div className="Wrapper-List-Quiz">
            {   arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                            <img className="card-img-top" src={`data:image/png;base64,${quiz.image}`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">
                                    {quiz.description}
                                </p>
                                <button href="#" className="btn btn-primary">
                                    Start Now
                                </button>
                            </div>
                        </div>
                    )
                })
            }

            {
                arrQuiz && arrQuiz.length === 0 &&
                <h2>
                    No quiz available
                </h2>
            }
        </div>
    );
}

export default ListQuiz;
