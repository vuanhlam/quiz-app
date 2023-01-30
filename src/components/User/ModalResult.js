import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalResult(props) {

    const {
        show, setShow, data
    } = props;


    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question: <b>{data.countTotal}</b></div>
                    <div>Total Correct answer: <strong>{data.countCorrect}</strong></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Show Answer
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
