import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiUpload } from 'react-icons/bi'


function ModalCreateUser() {
    const [show, setShow] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [avatar, setAvatar] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        const user = {
            email: email,
            password: password,
            userName: userName,
            role: role,
            image: image
        }
        // return alert(JSON.parse(user))
    }

    const handlePreviewImage = (e) => {
        if(e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file);
            setAvatar(file)
        }else {
            // setPreviewImage("");
        }
    }

    useEffect(() => {

        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button>

            <Modal 
                show={show} 
                onHide={handleClose} 
                size="xl"
                backdrop="static"
                className='modal-add-user' 
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                             />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="form-control" 
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select 
                                id="inputState" 
                                className="form-select"
                                onChange={(e) => setRole(e.target.value)}
                            >   
                                <option value={role}>
                                    USER
                                </option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='uploadInput'>
                                <span>Upload Image</span>
                                <BiUpload/>
                            </label>
                            <input 
                                type="file" 
                                onChange={(e) => {
                                    handlePreviewImage(e)
                                }}
                                id='uploadInput'
                                hidden
                            />
                        </div>

                        <div className='modal-image-review'>
                            {
                                avatar ? <img src={avatar.preview}  alt='avatar'/> : <span className='preview-title'>Preview Image</span>
                            }
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;
