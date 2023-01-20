import { useEffect, useState } from "react";
import * as MyAPI from '~/services/apiServices'


function TableUser() {

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
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 ?
                        listUsers.map((user, index) => 
                            <tr key={`table-users-${index}`}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-secondary">View</button>
                                    <button className="btn btn-warning mx-3">Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                        : 
                        <tr>
                            <td colSpan="4">No Data Found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default TableUser;
