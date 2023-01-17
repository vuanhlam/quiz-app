import Button from 'react-bootstrap/Button';

import ModalCreateUser from "./ModalCreateUser";

function ManageUser() {
    return (
        <div className="manage-users-container">
            <h1 className="title">Manage User</h1>
            <div className="users-content">
                <div>
                    <Button variant="primary">Add New User</Button>
                </div>
                <div>
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    );
}

export default ManageUser;
