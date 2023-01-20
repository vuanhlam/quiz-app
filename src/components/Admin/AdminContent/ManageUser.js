import { IoMdPersonAdd } from 'react-icons/io';
import { useEffect, useState } from "react";

import * as MyAPI from '~/services/apiServices'
import '~/components/Admin/AdminContent/ManageUser.scss';
import ModalCreateUser from "./ModalCreateUser";
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';

function ManageUser() {

    const [show, setShow] = useState(false);
    const [listUsers, setListUser] = useState([])

    useEffect(() => {
        fetchListUsers();
    }, [])

    const fetchListUsers = async () => {
        const res = await MyAPI.getAllUsers()
        if(res.EC === 0) {
            setListUser(res.DT)
        }
    }

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
                    <TableUser
                        listUsers={listUsers}
                    />
                </div>
                <ModalCreateUser 
                    show={show}
                    setShow={setShow}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser

                
                />
            </div>
           
        </div>
    );
}

export default ManageUser;
