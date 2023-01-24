import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'


function ModalViewUser(props) {

    const { 
        user,
        setShowViewUser,
        showViewUser,
        setUser,
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('USER');
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        if(!_.isEmpty(user)) {
            setEmail(user.email);
            setUserName(user.username);
            setRole(user.role);
            if(user.image) {
                setAvatar(user.image);    
            }
        }
    }, [user])

    const handleClose = () => {
        setShowViewUser(false);
        setEmail('');
        setPassword('');
        setUserName('');
        setRole('');
        setAvatar('');
        setUser({});
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
            <Modal show={showViewUser} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>User Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="form-control"
                                />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                disabled
                                value={password}
                                className="form-control"
                                />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                value={userName}
                                readOnly
                                className="form-control"
                                />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                id="inputState"
                                className="form-select"
                                value={role}
                                // readOnly
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label label-upload">
                                <span>Avatar</span>
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
                            {
                                avatar ? (
                                    <img src={`data:image/jpeg;base64,${avatar}`} alt="avatar" />
                                ) : (
                                    <span className="preview-title">Preview Image</span>
                                )
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;
