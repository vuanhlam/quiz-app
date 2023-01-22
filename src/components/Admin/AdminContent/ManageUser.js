import { IoMdPersonAdd } from 'react-icons/io';
import { useEffect, useState } from "react";

import * as MyAPI from '~/services/apiServices'
import '~/components/Admin/AdminContent/ManageUser.scss';
import ModalCreateUser from "./ModalCreateUser";
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';

function ManageUser() {

    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [listUsers, setListUser] = useState([]);
    const [updateUser, setUpdateUser] = useState({});

    useEffect(() => {
        fetchListUsers();
    }, [])

    const fetchListUsers = async () => {
        const res = await MyAPI.getAllUsers()
        if(res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const handleUpdateUser = (user) => {
        console.log('>>> check user: ', user);
        setShowUpdate(true)
        setUpdateUser(user)
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
                        handleUpdateUser={handleUpdateUser}
                    />
                </div>
                <ModalCreateUser 
                    show={show}
                    setShow={setShow}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    showUpdate={showUpdate}
                    setShowUpdate={setShowUpdate}
                    updateUser={updateUser}
                    fetchListUsers={fetchListUsers}
                    resetUpdateUser={setUpdateUser}
                />
            </div>
           
        </div>
    );
}

export default ManageUser;
