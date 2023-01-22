import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiUpload } from 'react-icons/bi';
import { toast } from 'react-toastify';
import _ from 'lodash'

import { postCreateNewUser } from '~/services/apiServices';

function ModalUpdateUser(props) {

    const { 
        showUpdate, 
        setShowUpdate,
        updateUser 
    } = props;

    console.log('update user: ', updateUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('USER');
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        if(!_.isEmpty(updateUser)) {
            setEmail(updateUser.email);
            // setPassword('');
            setUserName(updateUser.username);
            setRole(updateUser.role);
            if(updateUser.image) {
                setAvatar(updateUser.image);    
            }
        }
    }, [updateUser])

    const handleClose = () => {
        setShowUpdate(false);
        setEmail('');
        setPassword('');
        setUserName('');
        setRole('');
        setAvatar('');
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleSubmitCreateUser = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid password');
            return;
        }

        // if you don't have field file to send, just use object to send to the server
        // if have file must use form data support send file to server

        let res = await postCreateNewUser(email, password, userName, role, avatar);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fetchListUsers();
        }

        if (res && res.EC === 1) {
            toast.error(res.EM);
        }
    };

    const handlePreviewImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        } else {
            // setPreviewImage("");
        }
    };

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button> */}
            
            <Modal show={showUpdate} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled={true}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                value={password}
                                disabled={true}
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
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="uploadInput">
                                <span>Upload Image</span>
                                <BiUpload />
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    handlePreviewImage(e);
                                }}
                                id="uploadInput"
                                hidden
                            />
                        </div>

                        <div className="modal-image-review">
                            {avatar ? (
                                <img src={`data:image/jpeg;base64,${avatar}`} alt="avatar" />
                            ) : (
                                <span className="preview-title">Preview Image</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Update User
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;
