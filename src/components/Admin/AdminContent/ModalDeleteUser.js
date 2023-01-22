import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteUser(props) {

    const {
        showDeleteConfirm, 
        setShowDeleteConfirm,
        userDelete
    } = props;

    const handleClose = () => setShowDeleteConfirm(false);

    const handleDeleteUser = () => {
        alert('haha')
    }

    return (
        <>
            <Modal show={showDeleteConfirm} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this user. email = 
                    <b>{userDelete && userDelete.email ? userDelete.email : ""}</b></Modal.Body>
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

export default ModalDeleteUser;
