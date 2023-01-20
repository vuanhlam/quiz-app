import '~/components/Admin/AdminContent/ManageUser.scss'
import ModalCreateUser from "./ModalCreateUser";

import { useState } from 'react';
import { IoMdPersonAdd } from 'react-icons/io'
import TableUser from './TableUser';


function ManageUser() {

    const [show, setShow] = useState(false);

    return (
        <div className="manage-users-container">
            <h1 className="title">Manage User</h1>
            <div className="users-content">
                <div className='btn-add-new-user'>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShow(true)}
                    >
                        <IoMdPersonAdd className='iconMarginLeft'/>
                        <span>Add New User</span>
                    </button>
                </div>
                <div className='table-user'>
                    <TableUser/>
                </div>
                <ModalCreateUser 
                    show={show}
                    setShow={setShow}
                />
            </div>
           
        </div>
    );
}

export default ManageUser;
