import Button from 'react-bootstrap/Button';

import ModalCreateUser from "./ModalCreateUser";
import '~/components/Admin/AdminContent/ManageUser.scss'

function ManageUser() {
    return (
        <div className="manage-users-container">
            <h1 className="title">Manage User</h1>
            <div className="users-content">
                <div>
                    {/* <Button variant="primary">Add New User</Button> */}
                </div>
                <div>
                </div>
                <ModalCreateUser />
            </div>
        </div>
    );
}

export default ManageUser;
