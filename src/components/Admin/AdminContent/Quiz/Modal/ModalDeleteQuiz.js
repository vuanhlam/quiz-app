import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { deleteQuiz } from '~/services/apiServices/'

function ModalDeleteQuiz(props) {

    const {
        showDeleteConfirm, 
        setShowDeleteConfirm,
        quiz,
        fetchQuiz
    } = props;

    const handleClose = () => setShowDeleteConfirm(false);

    const handleDeleteUser = async () => {
        let res = await deleteQuiz(quiz.id);

        if(res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            await fetchQuiz();
        }

        if(res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal show={showDeleteConfirm} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete the Quiz 
                    <b> {quiz && quiz.name ? quiz.name : ''}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Confirm
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
