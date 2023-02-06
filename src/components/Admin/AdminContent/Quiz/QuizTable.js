import { useEffect, useState } from 'react';
import { getAllQuizForAdmin } from '~/services/apiServices';
import ModalDeleteQuiz from './Modal/ModalDeleteQuiz';
import ModalUpdateQuiz from './Modal/ModalUpdateQuiz';


function QuizTable(props) {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
    const [quiz, setQuiz] = useState(null);

    const hanldeShowHideModal = (type, quiz) => {
        if(type === 'DELETE') {
            setShowDeleteConfirm(true);
            setQuiz(quiz)
        }
        if(type === 'EDIT') {
            setShowUpdateConfirm(true);
            setQuiz(quiz);
        }
    }

    
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
                                    <button 
                                        className='btn btn-warning'
                                        onClick={() => hanldeShowHideModal('EDIT', item)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className='btn btn-danger ml-3'
                                        onClick={() => hanldeShowHideModal('DELETE', item)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
            <ModalDeleteQuiz
                showDeleteConfirm={showDeleteConfirm}
                setShowDeleteConfirm={setShowDeleteConfirm}
                quiz={quiz}
                fetchQuiz={fetchQuiz}
            />
            <ModalUpdateQuiz
                showUpdateConfirm={showUpdateConfirm}
                setShowUpdateConfirm={setShowUpdateConfirm}
                quiz={quiz}
                fetchQuiz={fetchQuiz}
            />
        </table>
    );
}

export default QuizTable;
