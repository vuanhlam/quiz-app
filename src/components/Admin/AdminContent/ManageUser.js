import { IoMdPersonAdd } from 'react-icons/io';
import { useEffect, useState } from "react";

import * as MyAPI from '~/services/apiServices'
import '~/components/Admin/AdminContent/ManageUser.scss';
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser'
import TableUser from './TableUser';
import ModalDeleteUser from './ModalDeleteUser';

function ManageUser() {

    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showViewUser, setShowViewUser] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [listUsers, setListUser] = useState([]);
    const [updateUser, setUpdateUser] = useState({});
    const [user, setUser] = useState({});
    const [userDelete, setUserDelete] = useState({});

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
        setShowUpdate(true)
        setUpdateUser(user)
    }

    const handleViewUser = (user) => {
        setShowViewUser(true)
        setUser(user)
    }

    const handleDelete = (user) => {
        setShowDeleteConfirm(true)
        setUserDelete(user);
        console.log(user);
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
                        // handleUpdateUser={handleUpdateUser}
                        // handleViewUser={handleViewUser}
                        // handleDelete={handleDelete}
                    />
                </div>
                <ModalCreateUser 
                    show={show}
                    setShow={setShow}
                    fetchListUsers={fetchListUsers}
                />
                {/* <ModalUpdateUser
                    showUpdate={showUpdate}
                    setShowUpdate={setShowUpdate}
                    updateUser={updateUser}
                    fetchListUsers={fetchListUsers}
                    resetUpdateUser={setUpdateUser}
                /> */}
                {/* <ModalViewUser
                    user={user}
                    setShowViewUser={setShowViewUser}
                    showViewUser={showViewUser}
                    setUser={setUser}
                /> */}
                {/* <ModalDeleteUser
                    showDeleteConfirm={showDeleteConfirm}
                    setShowDeleteConfirm={setShowDeleteConfirm}
                    userDelete={userDelete}
                    fetchListUsers={fetchListUsers}
                />   */}
            </div>
        </div>
    );
}

export default ManageUser;
