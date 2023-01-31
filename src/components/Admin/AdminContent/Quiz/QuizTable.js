import { useEffect, useState } from 'react';
import { getAllQuizForAdmin } from '~/services/apiServices';


function QuizTable() {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
            console.log(res);
        }
    };

    return (
        <table className="table table-hover table-bordered mt-3">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listQuiz &&
                    listQuiz.length > 0 &&
                    listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td scope="row">{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{display: 'flex', gap: '15px'}}>
                                    <button className='btn btn-warning'>Edit</button>
                                    <button className='btn btn-danger ml-3'>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}

export default QuizTable;
