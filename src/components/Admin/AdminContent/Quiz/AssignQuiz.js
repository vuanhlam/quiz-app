import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers } from '~/services/apiServices';

function AssignQuiz() {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ });

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUsers = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                };
            });
            setListUser(newUsers);
        }
    };

    return (
        <div className="assign-quiz-wrapper row">
            <div className="col-6 form-group">
                <label>Select Quiz: </label>
                <Select 
                  defaultValue={selectedQuiz} 
                  onChange={setSelectedQuiz} 
                  options={listQuiz} 
                />
            </div>
            <div className="col-6 form-group">
                <label>Select User: </label>
                <Select 
                  defaultValue={selectedUser} 
                  onChange={setSelectedUser} 
                  options={listUser} 
                />
            </div>
            <div>
              <button className='btn btn-warning mt-3'>Assign</button>
            </div>
        </div>
    );
}

export default AssignQuiz;
