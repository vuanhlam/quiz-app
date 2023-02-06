import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { updateQuiz } from '~/services/apiServices';

function ModalUpdateQuiz(props) {
    const { showUpdateConfirm, setShowUpdateConfirm, quiz, resetUpdateUser, fetchQuiz } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');

    useEffect(() => {
        if (!_.isEmpty(quiz)) {
            setName(quiz.name);
            setDescription(quiz.description);
            setType(quiz.type);
        }
    }, [quiz]);

    const handleClose = () => {
        setShowUpdateConfirm(false);
    };

    const handleUpdateQuiz = async () => {
        let res = await updateQuiz(quiz.id, description, name, type, quiz.Image);
        if(res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await fetchQuiz();
        }

        if(res && res.EC !== 0) {
            toast.error(res.EM)
        }

    };

    return (
        <>
            <Modal show={showUpdateConfirm} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="email"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select
                                id="inputState"
                                className="form-select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="USER">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateQuiz}>
                        Update Quiz
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;
