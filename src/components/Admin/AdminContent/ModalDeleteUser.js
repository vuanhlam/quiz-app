import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { deleteUser } from '~/services/apiServices/'

function ModalDeleteUser(props) {

    const {
        showDeleteConfirm, 
        setShowDeleteConfirm,
        userDelete,
        fetchListUsers,
        fetchListUsersWithPaginate,
        setCurrentPage
    } = props;

    const handleClose = () => setShowDeleteConfirm(false);

    const handleDeleteUser = async () => {
        let res = await deleteUser(userDelete.id);

        if(res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            // await fetchListUsers();
            setCurrentPage(1)
            await fetchListUsersWithPaginate(1)
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
